<template>
  <div id="authLayout">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class AuthLayout extends Vue { }
</script>

<style scoped lang="scss">
#authLayout {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
