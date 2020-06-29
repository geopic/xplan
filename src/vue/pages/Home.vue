<template>
  <div id="home">
    <section id="site-main" v-if="data.length > 0">
      <div class="plan-box" v-for="entry of data" :key="entry.id">
        <h1>{{ entry.plan }}</h1>
        <div class="plan-squares-box">
          <div
            class="plan-squares"
            v-for="square of entry.squares"
            :key="entry.squares.indexOf(square)"
          >
            {{ formattedDate(square.date) }}
          </div>
        </div>
      </div>
      <button type="button" id="site-delete-all" @click="deleteAllData">
        Clear data
      </button>
    </section>
    <template v-else-if="data.length === 0">
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
import { PlanData, LsData } from '@/common/types';
import { addDays, format } from 'date-fns';
import { v4 as uuid } from 'uuid';

@Component
export default class Home extends Vue {
  data: PlanData[] = [];

  created() {
    this.data = (utils.data.loadAll()?.plans as PlanData[]) || [];
  }

  formattedDate(date: string) {
    return format(new Date(date), 'yyyy-MM-dd');
  }

  deleteAllData() {
    if (window.confirm('Are you sure you wish to delete all site data?')) {
      utils.data.clearAll();
      this.data = [];
    }
  }

  handleCreatePlanForm(e: Event) {
    const targ = e.target as HTMLFormElement;
    const data = utils.data.loadAll() || ({} as LsData);
    const plan: PlanData = {
      id: uuid(),
      plan:
        (targ.querySelector('#plan-name') as HTMLInputElement).value ||
        'Think up a plan',
      isUnlimited:
        +(targ.querySelector('#plan-days') as HTMLInputElement).value === 0,
      squares: [
        { id: uuid(), date: new Date(), isCompleted: false, notes: null }
      ]
    };

    for (
      let i = 1;
      i < +(targ.querySelector('#plan-days') as HTMLInputElement).value;
      i++
    ) {
      plan.squares.push({
        id: uuid(),
        date: addDays(new Date(), i),
        isCompleted: false,
        notes: null
      });
    }

    // Update UI
    this.data.push(plan);

    // Update persistent storage
    data.plans.push(plan);
    utils.data.saveAll(data);
  }
}
</script>

<style lang="scss">
#home {
  section {
    padding: 5px;
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
