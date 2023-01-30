<template>
  <div class="viewPadding">
    <div class="infoSegment">
      <div class='column'>
        <div>
          <div class="textInfoLabel">Klient</div>
          <div class="textInfoValue">{{ delivery.client.firstName + ' ' + delivery.client.lastName }}
          </div>
        </div>
        <div>
          <div class="textInfoLabel">Data złożenia zamówienia</div>
          <div class="textInfoValue">{{ new Date(delivery.orderCreationDate).toISOString().split('T')[0] }}</div>
        </div>
        <!-- <div>
          <div class="textInfoLabel">Koszt całości</div>
          <div class="textInfoValue">{{ delivery.orderId + ' zł' }}</div>
        </div> -->
        <!-- <div>
          <div class="textInfoLabel">Klient</div>
          <div class="textInfoValue">
            <b-form-select labelField="Klient" variant="outline-primary" :options="clientsOptions"
              v-model="selectedClient" />
          </div>
        </div> -->
      </div>
      <div class='column'>
        <div>
          <div class="textInfoLabel">Numer zamówienia</div>
          <div class="textInfoValue">{{ delivery.orderId }}</div>
        </div>
        <div>
          <div class="textInfoLabel">Adres dostawy</div>
          <div class="textInfoValue">{{
            delivery.deliveryAddress ?
              (delivery.deliveryAddress.street + ' , ' + delivery.deliveryAddress.postalCode + ' ' +
                delivery.deliveryAddress.city)
              : '-'
          }}</div>
        </div>
        <div>
          <div class="textInfoLabel">Status</div>
          <div class="textInfoValue">{{ delivery.state }}</div>
        </div>
      </div>
    </div>
    <!-- <div v-if="!isDeliveryCanceled()">
      <b-button v-on:click='showDeliveryDetails' variant="primary">Sprawdź szczegóły
        dostawy</b-button>
      <b-button v-if="isDeliveryCreated()" v-on:click='modyfyDelivery(3)' variant="primary"
        :style="{ marginLeft: '25px' }">Potwierdź
      </b-button>
      <b-button v-if="isDeliveryAccepted()" v-on:click='modyfyDelivery(5)' variant="primary"
        :style="{ marginLeft: '25px' }">Wyślij
      </b-button>
      <b-button v-if="isDeliverySend()" v-on:click='modyfyDelivery(6)' variant="primary"
        :style="{ marginLeft: '25px' }">Dostarczono
      </b-button>
      <b-button v-if="!isDeliverySend() && !isDeliveryDelivered()" v-on:click='modyfyDelivery(2)' variant="danger"
        :style="{ marginLeft: '25px' }">Anuluj</b-button>
    </div> -->
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Delivery } from '@/models/Delivery';
import API from '@/services/API';
import EventBus from '@/services/EventBus';
import Input from '@/components/Input.vue';

@Options({
  components: {
    Input,
  },
})
export default class DeliveryDetails extends Vue {
  delivery: Delivery = {
    deliveryId: 0,
    orderId: 0,
    orderCreationDate: new Date(),
    sendDate: undefined,
    deliverer: undefined,
    client: {
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
      nip: '',
    },
    deliveryAddress: {
      street: '',
      postalCode: '',
      city: '',
    },
    state: '',
  };

  mounted() {
    this.loadDelivery(this.$route.params.id);
    this.setViewTitle();
  }

  sendDelivery() {
    this.$router.push({ name: 'DeliveryEdit', params: { id: String(this.delivery.deliveryId) } });
  }

  showDeliveryDetails() {
    this.$router.push({ name: 'DeliveryDetails', params: { id: String(this.delivery.deliveryId) } });
  }

  // async modyfyDelivery(stateId: number) {
  //   try {
  //     console.log('stateId', stateId);
  //     const data = await new API('put', `delivery/${this.delivery.deliveryId}`, {
  //       query: {
  //         stateId: stateId,
  //       },
  //     }).call(true);

  //     if (data.status === 200) {
  //       this.$router.back();
  //     } else {
  //       alert('Akcja nie powiodła się');
  //     }
  //   } catch (error) {
  //     console.error('error', error);
  //   }
  // }

  async loadDelivery(id: any) {
    try {
      const data = await new API('get', `delivery/${id}`, {}).call();
      this.delivery = { ...data };
    } catch (error) {
      console.error('error', error);
    }
  }

  isDeliveryCanceled() {
    return this.delivery.state === 'Anulowane';
  }

  isDeliveryDelivered() {
    return this.delivery.state === 'Dostarczone';
  }

  isDeliverySend() {
    return this.delivery.state === 'Wyslane';
  }

  isDeliveryAccepted() {
    return this.delivery.state === 'Zaakceptowane';
  }

  isDeliveryCreated() {
    return this.delivery.state === 'Utworzone';
  }

  async setViewTitle() {
    await EventBus.$emit('layout-view', { title: 'Szczegóły zamówienie' });
  }
}
</script>

<style lang="scss" scoped>
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
