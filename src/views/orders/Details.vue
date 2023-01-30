<template>
  <div class="viewPadding">
    <Table :items="order.orderDetails" :fields="fields" :loadItems="loadOrder" />
    <div class="infoSegment">
      <div class='column'>
        <div>
          <div class="textInfoLabel">Klient</div>
          <div class="textInfoValue">{{ order.clientDetails.firstName + ' ' + order.clientDetails.lastName }}</div>
        </div>
        <div>
          <div class="textInfoLabel">Data złożenia zamówienia</div>
          <div class="textInfoValue">{{ new Date(order.creationDate).toISOString().split('T')[0] }}</div>
        </div>
        <div>
          <div class="textInfoLabel">Koszt całości</div>
          <div class="textInfoValue">{{ order.orderPrice + ' zł' }}</div>
        </div>
      </div>
      <div class='column'>
        <div>
          <div class="textInfoLabel">Numer zamówienia</div>
          <div class="textInfoValue">{{ order.orderId }}</div>
        </div>
        <div>
          <div class="textInfoLabel">Data potwierdzenia zamówienia</div>
          <div class="textInfoValue">{{
            order.acceptanceDate ? new Date(order.acceptanceDate).toISOString().split('T')[0]
              : '-'
          }}</div>
        </div>
        <div>
          <div class="textInfoLabel">Status</div>
          <div class="textInfoValue">{{ order.orderState }}</div>
        </div>
      </div>
    </div>
    <div v-if="!isOrderCanceled()">
      <b-button v-on:click='showDeliveryDetails' variant="primary">Sprawdź szczegóły
        dostawy</b-button>
      <b-button v-if="isOrderCreated()" v-on:click='modyfyOrder(3)' variant="primary"
        :style="{ marginLeft: '25px' }">Potwierdź
      </b-button>
      <b-button v-if="isOrderAccepted()" v-on:click='modyfyOrder(5)' variant="primary"
        :style="{ marginLeft: '25px' }">Wyślij
      </b-button>
      <b-button v-if="isOrderSend()" v-on:click='modyfyOrder(6)' variant="primary"
        :style="{ marginLeft: '25px' }">Dostarczono
      </b-button>
      <b-button v-if="!isOrderSend() && !isOrderDelivered()" v-on:click='modyfyOrder(2)' variant="danger"
        :style="{ marginLeft: '25px' }">Anuluj</b-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Order } from '@/models/Order';
import API from '@/services/API';
import EventBus from '@/services/EventBus';
import Table from '@/components/SmallTable.vue';
import Input from '@/components/Input.vue';

@Options({
  components: {
    Input,
    Table,
  },
})
export default class OrderDetails extends Vue {
  order: Order = {
    orderId: 0,
    orderNumber: 0,
    clientDetails: {
      clientId: 0,
      firstName: '',
      lastName: '',
      address:
      {
        street: '',
        postalCode: '',
        city: '',
      },
      companyName: '',
      IsArchived: false,
      NIP: '',
    },
    creationDate: new Date(),
    orderState: '',
    orderDetails: [],
    orderPrice: 0,
  };

  fields = [
    { key: 'woodType', label: 'Rodzaj drewna' },
    { key: 'price', label: 'Cena za m3', formatter: (value: string) => `${value} zł` },
    { key: 'productType', label: 'Typ produktu' },
    { key: 'amount', label: 'Ilość' },
    { key: 'fullPrice', label: 'Łączna cena', formatter: (value: string) => `${value} zł` },
  ];

  amount = 0;

  ordersDetails: any[] = [];

  mounted() {
    this.loadOrder(this.$route.params.id);
    this.setViewTitle();
  }

  sendOrder() {
    this.$router.push({ name: 'OrderEdit', params: { id: String(this.order.orderId) } });
  }

  showDeliveryDetails() {
    this.$router.push({ name: 'DeliveryDetails', params: { id: String(this.order.orderId) } });
  }

  async modyfyOrder(stateId: number) {
    try {
      console.log('stateId', stateId);
      const data = await new API('put', `order/${this.order.orderId}`, {
        query: {
          orderStateId: stateId,
        },
      }).call(true);

      if (data.status === 200) {
        this.$router.back();
      } else {
        alert('Akcja nie powiodła się');
      }
    } catch (error) {
      console.error('error', error);
    }
  }

  async loadOrder(id: any) {
    try {
      const data = await new API('get', `order/${id}`, {}).call();
      this.order = { ...data };
      this.ordersDetails = { ...data.orderDetails };
    } catch (error) {
      console.error('error', error);
    }
  }

  isOrderCanceled() {
    return this.order.orderState === 'Anulowane';
  }

  isOrderDelivered() {
    return this.order.orderState === 'Dostarczone';
  }

  isOrderSend() {
    return this.order.orderState === 'Wyslane';
  }

  isOrderAccepted() {
    return this.order.orderState === 'Zaakceptowane';
  }

  isOrderCreated() {
    return this.order.orderState === 'Utworzone';
  }

  async setViewTitle() {
    await EventBus.$emit('layout-view', { title: 'Szczegóły zamówienie' });
  }
}
</script>

<style scoped lang="scss">
.infoSegment {
  display: flex;
  width: 100%;
  margin-top: 5%;
  margin-bottom: 5%;
}

.inputComponent {
  margin-top: auto;
  max-width: 185px;
}

.addBtn {
  max-width: 185px;
}

.column {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1.5em;
}

.button {
  display: flex;
  justify-content: space-between;
  flex: 2;
}

#table {
  width: 500px;
}
</style>
