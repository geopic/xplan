<template>
  <div id="home">
    <section id="site-main" v-if="plans.length > 0">
      <div class="plan-box" v-for="plan of plans" :key="plan.id">
        <h1>{{ plan.title }}</h1>
        <div class="plan-squares-box">
          <PlanSquare
            v-for="square of plan.squares"
            v-bind="square"
            :key="square.id"
          />
        </div>
      </div>
      <button type="button" id="site-delete-all" @click="deleteAllData">
        Clear data
      </button>
    </section>
    <template v-else-if="plans.length === 0">
      <section id="site-intro">
        <h1>Welcome!</h1>
        It looks like this is your first time on the site. If you are unfamiliar
        with the concept of the 'X Effect', please check out this
        <a href="https://old.reddit.com/r/theXeffect/wiki/index"
          >informative page on Reddit</a
        >.
      </section>
      <form id="plan-creation-form" @submit.prevent="handleCreatePlanForm">
        <h1>Create new plan</h1>
        <div class="form-section">
          <label for="plan-name">Plan name</label>
          <input type="text" name="plan-name" id="plan-name" />
        </div>
        <div class="form-section">
          <label for="plan-days"
            >Number of days for plan<br />(leave at 0 for unlimited)</label
          ><input
            type="number"
            name="plan-days"
            id="plan-days"
            min="0"
            value="0"
          />
        </div>
        <div class="form-section">
          <button type="submit" id="plan-submit-btn">Submit</button>
        </div>
      </form>
    </template>
    <section id="site-loading" v-else>Loading...</section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import utils from '@/common/utils';
import { PlanData } from '@/common/types';
import PlanSquare from '@/vue/components/PlanSquare.vue';

@Component({
  components: {
    PlanSquare
  }
})
export default class Home extends Vue {
  plans: PlanData[] = [];

  created() {
    this.plans = (utils.storage.loadAll()?.plans as PlanData[]) || [];
  }

  deleteAllData() {
    if (window.confirm('Are you sure you wish to delete all site data?')) {
      utils.storage.clearAll();
      this.plans = [];
    }
  }

  handleCreatePlanForm(e: Event) {
    const targ = e.target as HTMLFormElement;
    const newPlan = utils.plans.initNewPlan(
      (targ.querySelector('#plan-name') as HTMLInputElement).value,
      +(targ.querySelector('#plan-days') as HTMLInputElement).value
    );

    // Update UI
    this.plans.push(newPlan);

    // Update persistent storage
    const data = utils.storage.loadAll() || utils.storage.default;
    data.plans.push(newPlan);
    utils.storage.saveAll(data);
  }
}
</script>

<style lang="scss">
#home {
  section {
    padding: 5px;
  }

  #site-main {
    .plan-box {
      .plan-squares-box {
        align-items: flex-start;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding: 5px;
      }
    }

    #site-delete-all {
      display: block;
      margin: 5px auto;
      width: 200px;
    }

    @media all and (min-width: $medquery-min-width-01) {
      #site-delete-all {
        width: 300px;
      }
    }
  }

  #site-intro {
    text-align: center;
  }

  #plan-creation-form {
    padding: 0px 10px;

    .form-section {
      align-items: stretch;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 10px 0px;

      label {
        margin-bottom: 5px;
        text-align: center;
      }
    }

    @media all and (min-width: $medquery-min-width-01) {
      background-color: var(--bgColorAlt);
      margin: 15px auto;
      padding: 10px 20px;
      width: $medquery-min-width-01;
    }
  }
}
</style>
