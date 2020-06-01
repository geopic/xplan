<template>
  <div id="home">
    <template v-if="data.length > 0">This is the home page.</template>
    <!--<template v-else-if="serverError">{{
      process.env.NODE_ENV === 'development'
        ? serverError
        : 'There was an issue in fetching server resources. Please check back again shortly.'
    }}</template>-->
    <template v-else-if="data.length === 0"
      ><div id="no-data-notice">You have no data.</div></template
    >
    <template v-else>Loading...</template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import utils from '@/common/utils';
import { SquareData } from '@/common/types';

@Component
export default class Home extends Vue {
  serverError = null;
  data: SquareData[] = [];

  created() {
    this.data = utils.loadAllDataFromLS()?.data as SquareData[];
  }
}
</script>

<style lang="scss" scoped></style>
