<template>
  <div class="viewPadding">
    <div class="dataContainer">
      <div class='column'>
        <Input v-model="modelValue.name" class="input" label="Rodzaj drewna" placeholder="Sosna" />
        <Input v-model="modelValue.price" class="input" label="Cena za m3" inputType="number" placeholder="45" />
      </div>
      <div class='column'>
        <Input v-model="modelValue.type" class="input" label="Typ produktu" placeholder="Surowe" />
      </div>
      <div class="button">
        <b-button v-on:click='buttonOnClick' variant="primary">{{ buttonLabel }}</b-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop } from 'vue-property-decorator';

import Input from '@/components/Input.vue';

import { Product } from '@/models/Product';
import API from '@/services/API';
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {
    Input,
  },
})
export default class ProductModify extends Vue {
  @Prop() modelValue!: Product;

  @Prop() buttonLabel!: string;

  @Prop() buttonOnClick!: () => void;

  mounted() {
    console.log(this.modelValue);
  }
}
</script>

<style lang="scss" scoped>
.dataContainer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 4em;
}

.column {
  display: flex;
  flex-direction: column;
}

.cechaContainer {
  display: flex;
  flex: 1;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: 50px;
}

.row {
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  margin-left: 0;
}

.button {
  margin-left: auto;
}

.input {
  margin-bottom: 15px;
}

.inputCecha {
  margin-right: 15px;
}

#table {
  width: 500px;
}
</style>
