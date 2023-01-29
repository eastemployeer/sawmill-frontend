<template>
  <div ref="table">
    <b-table sticky-header hover :fields="fields" :items="items" :busy="isLoading">
      <template #table-busy>
        <div class="text-center text-danger">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Ładowanie...</strong>
        </div>
      </template>

      <template #cell(id)="data">
        <router-link :to="{ name: linkTo, params: { id: data.item.id } }">
          <b-icon-chevron-right class="chevronIcon" />
        </router-link>
      </template>
    </b-table>
  </div>
</template>

<script lang="ts">
import { Watch, Prop } from 'vue-property-decorator';
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class ProductList extends Vue {
  parentHeight = 0;

  currentPage = 1;

  totalRows = 4 // just for now;

  isLoading = true;

  @Prop({ default: [] })
  items!: any[];

  @Prop()
  loadItems!: (page: number) => void;

  @Prop({ default: [] })
  fields!: any[];

  @Prop({ default: '' })
  linkTo!: string;

  @Watch('currentPage')
  public onCurrentPageChange() {
    this.loadItems(this.currentPage);
  }

  mounted() {
    // this.parentHeight = (this.$refs.table as any).offsetHeight;
    this.loadItems(this.currentPage);
    this.isLoading = false;
  }
}
</script>

<style lang="scss">
.buttons {
  display: flex;
  flex-direction: row;
  height: 38px;
}

.paginationWrapper {
  margin-top: auto;
  padding: 20px;
}

.chevronIcon {
  font-size: 1.5em;
  color: black;
}
</style>
