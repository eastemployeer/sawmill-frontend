<template>
  <div class="viewPadding">
    <div class="infoSegment">
      <div class='column'>
        <div>
          <div class="textInfoLabel">Klient</div>
          <div class="textInfoValue">{{ order.clientDetails.firstName+" "+order.clientDetails.lastName }}</div>
        </div>
        <div>
          <div class="textInfoLabel">Data złożenia zamówienia</div>
          <div class="textInfoValue">{{ order.creationDate }}</div>
        </div>
        <div>
          <div class="textInfoLabel">Koszt całości</div>
          <div class="textInfoValue">{{ order.price + ' zł' }}</div>
        </div>
        <Input v-model="amount" inputType="number" label="Ilość" placeholder="500" />
      </div>
      <div class='column'>
        <div>
          <div class="textInfoLabel">Numer zamówienia</div>
          <div class="textInfoValue">{{ order.number }}</div>
        </div>
        <div>
          <div class="textInfoLabel">Sata potwierdzenia zamówienia</div>
          <div class="textInfoValue">{{ order.acceptanceDate }}</div>
        </div>
        <div>
          <div class="textInfoLabel">Status</div>
          <div class="textInfoValue">{{ order.state }}</div>
        </div>
      </div>
      <div>
        <b-button v-on:click='editOrder' variant="primary">Przeznacz do wysyłki</b-button>
        <b-button v-on:click='cancelOrder' variant="danger" :style="{ marginLeft: '25px' }">Anuluj</b-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Order } from '@/models/Order';
import { AccountType } from '@/models/User';
import API from '@/services/API';
import EventBus from '@/services/EventBus';
import store from '@/store';
import { CartAction } from '@/store/modules/CartModule';
import Input from '@/components/Input.vue';

@Options({
  components: {
    Input,
  },
})
export default class OrderDetails extends Vue {
  order: Order = {
    name: '', price: 0, availibility: 0, id: 0, type: '',
  };

  fields = [
    { key: 'label', label: 'Nazwa cechy' },
    { key: 'value', label: 'Wartość' },
  ];

  amount = 0;

  mounted() {
    this.loadOrder(this.$route.params.id);
    this.setViewTitle();
  }

  editOrder() {
    this.$router.push({ name: 'OrderEdit', params: { id: String(this.order.id) } });
  }

  async cancelOrder() {
    try {
      const data = await new API('delete', `orders/${this.order.id}`, {}).call(true);

      if (data.status === 201) {
        this.$router.back();
      } else {
        alert('Anulowanie nie powiodło się');
      }
    } catch (error) {
      console.error('error', error);
    }
  }

  async loadOrder(id: any) {
    try {
      const data = await new API('get', `orders/${id}`, {}).call();
      this.order = { ...data };
    } catch (error) {
      console.error('error', error);
    }
  }

  async setViewTitle() {
    await EventBus.$emit('layout-view', { title: 'Szczegóły produktu' });
  }
}
</script>

<style lang="scss" scoped>
.infoSegment {
  display: flex;
  width: 100%;
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
