<template>
  <div class="viewPadding">
    <div class="dataContainer" v-if="modelValue">
      <div class='column'>
        <div class="textInfoLabel">Rodzaj drewna</div>
        <b-form-select labelField="Rodzaj drewna" variant="outline-primary" :options="woodTypes"
          v-model="selectedWoodType" @change="(value) => selectWoodType(value)" />
        <Input v-model="modelValue.price" class="input" label="Cena za m3" inputType="number" placeholder="45" />
      </div>
      <div class='column'>
        <div class="textInfoLabel">Typ produktu</div>
        <b-form-select variant="outline-primary" :options="productTypes" v-model="selectedProductType"
          @change="(value) => selectProductType(value)" />
      </div>
      <div class="button">
        <b-button v-on:click='buttonOnClick' variant="primary">{{ buttonLabel }}</b-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Watch } from 'vue-property-decorator';

import Input from '@/components/Input.vue';

import { Product } from '@/models/Product';
import API from '@/services/API';
import { Options, Vue } from 'vue-class-component';
import { BDropdown, BDropdownItem, BButton } from 'bootstrap-vue-next';

interface ProductType {
  name: string;
  productTypeId: number;
}

interface WoodType {
  name: string;
  woodTypeId: number;
}

@Options({
  components: {
    Input,
  },
})
export default class ProductModify extends Vue {
  @Prop() modelValue!: Product;

  @Prop() buttonLabel!: string;

  selectedWoodType: WoodType = { name: '', woodTypeId: 1 }

  selectedProductType: ProductType = { name: '', productTypeId: 1 }

  @Prop() buttonOnClick!: () => void;

  @Watch('modelValue') onValueChange(newValue: Product) {
    this.selectedWoodType = { name: newValue.woodTypeName, woodTypeId: newValue.woodTypeId };
    this.selectedProductType = { name: newValue.productTypeName, productTypeId: newValue.productTypeId };
  }

  productTypes: any[] = []

  woodTypes: any[] = []

  get currentWoodTypeValue() {
    return this.modelValue.woodTypeName;
  }

  selectWoodType(type: any) {
    this.$emit('update:modelValue', { ...this.modelValue, woodTypeId: type.woodTypeId, woodTypeName: type.name });
  }

  selectProductType(type: any) {
    this.$emit('update:modelValue', { ...this.modelValue, productTypeId: type.productTypeId, productTypeName: type.name });
  }

  async loadProductTypes() {
    try {
      const data: ProductType[] = await new API('get', 'Product/ProductType').call();
      this.productTypes = data.map((el) => ({ value: el, text: el.name }));
    } catch (e) {
      console.log(e);
    }
  }

  async loadWoodTypes() {
    try {
      const data: WoodType[] = await new API('get', 'Product/WoodType').call();
      this.woodTypes = data.map((el) => ({ value: el, text: el.name }));
    } catch (e) {
      console.log(e);
    }
  }

  async load() {
    await this.loadProductTypes();
    await this.loadWoodTypes();
  }

  created() {
    this.load();
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
  margin-top: 15px;
}

.inputCecha {
  margin-right: 15px;
}

#table {
  width: 500px;
}
</style>
