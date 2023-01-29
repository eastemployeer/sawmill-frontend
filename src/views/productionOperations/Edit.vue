<template>
  <div>
    <OperationModify v-model="operation" buttonLabel="Zapisz zmiany" :buttonOnClick="updateOperation" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import { Product } from '@/models/Product';
import API from '@/services/API';
import EventBus from '@/services/EventBus';
import Axios from 'axios';
import { Operation } from '@/models/Operation';
import OperationModify from './_Modifi.vue';

@Options({
  components: {
    OperationModify,
  },
})
export default class OperationEdit extends Vue {
  //   export interface Operation {
  //     operationId: number;
  //     name: string;
  //     description: string;
  //     sourceProductTypeId: number;
  //     outputProductTypeId: number;
  //     sourceOutputRatio: number;
  //     duration: number;
  //     isArchived: boolean;
  // }
  operation: Operation = {
    operationId: 0, name: '', description: '', sourceProductTypeId: 0, outputProductTypeId: 0, sourceOutputRatio: 1, duration: 1, isArchived: false,
  };

  mounted() {
    this.loadOperation();
    this.setViewTitle();
  }

  async loadOperation() {
    try {
      const data = await new API('get', `Operation/${this.$route.params.id}`, {}).call();
      this.operation = { ...data };
      console.log(this.operation);
    } catch (error) {
      console.error('error', error);
    }
  }

  async updateOperation() {
    try {
      console.log(this.operation);
      const data = await new API('put', 'Operation', {
        body: this.operation,
      }).call(true);

      if (data.status === 400) {
        alert('Wystąpił błąd, sprawdz wprowadzone dane');
      } else if (data.status === 201) {
        this.$router.back();
        alert('Zaktualizowano produkt');
      } else {
        alert('Nieznany błąd');
      }
    } catch (error) {
      console.error('error', error);
    }
  }

  async setViewTitle() {
    await EventBus.$emit('layout-view', { title: 'Edycja produktu' });
  }
}
</script>

<style lang="scss" scoped>
.infoSegment {
  display: flex;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
}

.column {
  display: flex;
  flex-direction: column;
  width: 350px;
}

.button {
  display: flex;
  justify-content: center;
  width: 500px;
  margin: 51px 0;
}

#table {
  width: 500px;
}
</style>
