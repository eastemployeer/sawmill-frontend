<template>
  <div id="defaultLayout">
    <SideBar />
    <div id="view">
      <div id="viewTitle">{{ viewData.title }}</div>
      <b-button v-if='viewData.buttonText' v-on:click='viewData.buttonOnPress' variant="primary" id="layoutButton">
        {{ viewData.buttonText }}
      </b-button>
      <div id="routerView" :style="{ marginTop: viewData.buttonText ? '18px' : '56px' }">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import SideBar from '@/components/SideBar.vue';

import EventBus from '@/services/EventBus';
import { Options, Vue } from 'vue-class-component';

interface ViewDataProps {
  title: string;
  buttonText: string;
  buttonOnPress: ({ ...args }: any) => void;
}

@Options({
  components: {
    SideBar,
  },
})
export default class DefaultLayout extends Vue {
  viewData: ViewDataProps = {
    title: '',
    buttonText: '',
    buttonOnPress: () => { },
  };

  created() {
    EventBus.$on('layout-view', this.changeViewData);
  }

  beforeDestroy() {
    EventBus.$off('layout-view', this.changeViewData);
  }

  changeViewData(data: ViewDataProps) {
    this.viewData = ({ ...data });
  }
}
</script>

<style scoped lang="scss">
#defaultLayout {
  display: flex;
  flex-direction: row;
  height: 100%;
}

#view {
  width: 100%;
  height: 100%;
}

#viewTitle {
  margin-top: 56px;
  margin-left: 44px;
  font-size: 40px;
  font-weight: bold;
  line-height: 46px;
  color: #25282B;
  letter-spacing: 0.2px;
}

#layoutButton {
  margin-left: 44px;
  margin-top: 14px;
  overflow: hidden;
}

#routerView {
  height: calc(100% - 184px);
  // padding: 46px;
  margin: 44px;
  background: #FFF;
  border-radius: 8px;
  box-shadow: 0 12px 26px rgba(16, 30, 115, 0.06)
}
</style>
