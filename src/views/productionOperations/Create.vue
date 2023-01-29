<template>
  <div>
    <OperationModify v-model="operation" buttonLabel="Dodaj nową operację" :buttonOnClick="createOperation" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import API from '@/services/API';
import EventBus from '@/services/EventBus';
import { Operation } from '@/models/Operation';
import OperationModify from './_Modifi.vue';

@Options({
  components: {
    OperationModify,
  },
})
export default class ProductCreate extends Vue {
  operation: Operation = {
    operationId: 0, name: '', description: '', sourceProductTypeId: 0, outputProductTypeId: 0, sourceOutputRatio: 1, duration: 1, isArchived: false,
  };

  mounted() {
    this.setViewTitle();
  }

  async createOperation() {
    try {
      const data = await new API('post', 'Operation', {
        body: this.operation,
      }).call(true);

      if (data.status === 400) {
        alert('Wprowadzono błędne dane');
      } else if (data.status === 200) {
        alert('Stworzono nową operację');
        this.$router.back();
      } else {
        alert('Nieznany błąd');
      }
    } catch (error) {
      console.error('error', error);
    }
  }

  async setViewTitle() {
    await EventBus.$emit('layout-view', { title: 'Keator typu operacji' });
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
