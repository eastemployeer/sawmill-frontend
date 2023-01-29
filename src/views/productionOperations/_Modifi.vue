<template>
  <div class="viewPadding">
    <div class="dataContainer" v-if="modelValue">
      <div class='column'>
        <Input v-model="modelValue.name" class="input" label="Nazwa usługi" placeholder="Przetwarzanie - Orzech" />
        <Input v-model="modelValue.sourceOutputRatio" class="input" label="Stosunek" placeholder="0.8" />
        <Input v-model="modelValue.duration" class="input" label="Czas trwania (godziny)" placeholder="1" />
      </div>
      <div class='column'>
        <div class="selectComponent">
          <div class="textInfoLabel">Wejściowy typ produktu</div>
          <b-form-select variant="outline-primary" :options="productTypes" v-model="selectedSourceProductType"
            @change="(value) => selectSourceProductType(value)" />
        </div>
        <div class="selectComponent">
          <div class="textInfoLabel">Wynikowy typ produktu</div>
          <b-form-select variant="outline-primary" :options="productTypes" v-model="selectedOutputProductType"
            @change="(value) => selectOutputProductType(value)" />
        </div>
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
import { BButton } from 'bootstrap-vue-next';
import { Operation } from '@/models/Operation';

interface ProductType {
  name: string;
  productTypeId: number;
}

@Options({
  components: {
    Input,
  },
})
export default class OperationModify extends Vue {
  @Prop() modelValue!: Operation;

  @Prop() buttonLabel!: string;

  selectedOutputProductType!: number;

  selectedSourceProductType!: number;

  @Prop() buttonOnClick!: () => void;

  @Watch('modelValue') onValueChange(newValue: Operation) {
    this.selectedOutputProductType = newValue.outputProductTypeId;
    this.selectedSourceProductType = newValue.sourceProductTypeId;
  }

  productTypes: any[] = []

  selectSourceProductType(typeId: number) {
    this.$emit('update:modelValue', { ...this.modelValue, sourceProductTypeId: typeId });
  }

  selectOutputProductType(typeId: number) {
    this.$emit('update:modelValue', { ...this.modelValue, outputProductTypeId: typeId });
  }

  async loadProductTypes() {
    try {
      const data: ProductType[] = await new API('get', 'Product/ProductType').call();
      this.productTypes = data.map((el) => ({ value: el.productTypeId, text: el.name }));
    } catch (e) {
      console.log(e);
    }
  }

  created() {
    this.loadProductTypes();
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

.input,
.selectComponent {
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
