<template>
  <div id="home">
    <template v-if="data.length > 0">This is the home page.</template>
    <!--<template v-else-if="serverError">{{
      process.env.NODE_ENV === 'development'
        ? serverError
        : 'There was an issue in fetching server resources. Please check back again shortly.'
    }}</template>-->
    <template v-else-if="data.length === 0">
      <section id="site-intro">
        <h1>Welcome</h1>
        It looks like this is your first time on the site. If you are unfamiliar
        with the concept of the 'X Effect', check out this
        <a href="https://old.reddit.com/r/theXeffect/wiki/index"
          >informative page on Reddit</a
        >.
      </section>
      <form id="plan-creation-form" @submit.prevent="handleCreatePlanForm">
        <h1>Create new plan</h1>
        <label for="plan-name">Plan name</label>
        <input type="text" name="plan-name" id="plan-name" />
        <label for="plan-days"
          >Number of days for plan (leave at 0 for unlimited)</label
        ><input
          type="number"
          name="plan-days"
          id="plan-days"
          min="0"
          value="0"
        /><button type="submit" id="plan-submit-btn">Submit</button>
      </form></template
    >
    <template v-else>Loading...</template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import utils from '@/common/utils';
import { PlanData, SquareData } from '@/common/types';
import { addDays } from 'date-fns';

@Component
export default class Home extends Vue {
  serverError = null;
  data: PlanData[] = [];

  created() {
    this.data = utils.loadAllDataFromLS()?.data as PlanData[];
  }

  handleCreatePlanForm(e: Event) {
    const targ = e.target as HTMLFormElement;
    const data: PlanData = {
      plan:
        (targ.querySelector('#plan-name') as HTMLInputElement).value ||
        'Think up a plan',
      squares: []
    };

    data.squares.push({ date: new Date(), isCompleted: false, notes: null });

    for (
      let i = 1;
      i <= +(targ.querySelector('#plan-days') as HTMLInputElement).value;
      i++
    ) {
      data.squares.push({
        date: addDays(new Date(), i),
        isCompleted: false,
        notes: null
      });
    }

    this.data.push(data);
  }
}
</script>

<style lang="scss"></style>
