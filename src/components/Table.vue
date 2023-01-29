<template>
  <div class="view list" ref="table">
    <b-table sticky-header hover :style="{ maxHeight: parentHeight - 16 - 38 + 'px' }" :fields="fields" :items="items"
      :busy="isLoading">
      <template #table-busy>
        <div class="text-center text-danger">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Ładowanie...</strong>
        </div>
      </template>

      <template #cell(id)="data" v-if="linkTo">
        <router-link :to="{ name: linkTo, params: { id: data.item[pathName + 'Id'] } }">
          <b-icon-chevron-right class="chevronIcon" />
        </router-link>
      </template>
      <template #cell(id)="data" v-else-if="linkEdit">
        <b-icon-trash v-if="deleteAction" class="trashIcon" @click="deleteItem(data.item[pathName + 'Id'])" />
        <router-link :to="{ name: linkEdit, params: { id: data.item[pathName + 'Id'] } }">
          <b-icon-pencil class="pencilIcon" />
        </router-link>
      </template>
    </b-table>
    <div class="paginationWrapper">
      <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="limit" last-number />
    </div>
  </div>
</template>

<script lang="ts">
import { Watch, Prop } from 'vue-property-decorator';
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class Table extends Vue {
  parentHeight = 0;

  currentPage = 1;

  limit = 10;

  @Prop({ default: 1 })
  totalRows!: number;

  isLoading = true;

  @Prop({ default: [] })
  items!: any[];

  @Prop()
  loadItems!: (page: number, limit: number) => void;

  @Prop()
  deleteAction!: (id: number) => void;

  @Prop()
  linkEdit!: string;

  @Prop({ default: [] })
  fields!: any[];

  @Prop({ default: '' })
  linkTo!: string;

  @Watch('currentPage')
  public onCurrentPageChange() {
    this.loadItems(this.currentPage, this.limit);
  }

  async deleteItem(id: number) {
    await this.deleteAction(id);
    this.loadItems(this.currentPage, this.limit);
  }

  get pathName() {
    return this.$route.fullPath.split('/')[1];
  }

  mounted() {
    this.parentHeight = (this.$refs.table as any).offsetHeight;
    this.loadItems(this.currentPage, this.limit);
    this.isLoading = false;
    console.log(this.totalRows);
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

.chevronIcon,
.pencilIcon,
.trashIcon {
  font-size: 1.5em;
}

.chevronIcon,
.pencilIcon {
  color: black;
}

.trashIcon {
  margin-right: 20px;
  cursor: pointer;
  color: red;
}
</style>
