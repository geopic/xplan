<template>
  <div id="home">
    <section id="site-main" v-if="lsData.plans.length > 0">
      <div class="plan-box" v-for="plan of lsData.plans" :key="plan.id">
        <div class="plan-title-box" @click="hideTitleShowForm">
          <h1>{{ plan.title }}</h1>
          <form
            style="display: none;"
            :data-planId="plan.id"
            @submit.prevent="amendPlanTitle"
          >
            <input
              type="text"
              :value="plan.title"
              :maxlength="planNameMaxLength"
            />
            <button type="submit">✅</button>
          </form>
        </div>
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
    <template v-else-if="lsData.plans.length === 0">
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
          <input
            type="text"
            name="plan-name"
            id="plan-name"
            :maxlength="planNameMaxLength"
          />
        </div>
        <div class="form-section">
          <label for="plan-days">Number of days for plan</label>
          <div id="plan-days-preset-box" @click="handlePresetChoiceSelect">
            <div id="plan-days-preset-box-zero">
              <button type="button">0 (continuous)</button>
            </div>
            <div id="plan-days-preset-box-non-zero">
              <button
                type="button"
                class="plan-days-preset"
                v-for="presetChoice of presetDaysChoices"
                :key="presetDaysChoices.indexOf(presetChoice)"
              >
                {{ presetChoice }}
              </button>
            </div>
          </div>
          <input
            type="number"
            name="plan-days"
            id="plan-days"
            min="0"
            value="0"
          />
        </div>
        <div class="form-section">
          <button type="submit" class="btn-important" id="plan-submit-btn">
            Submit
          </button>
        </div>
      </form>
    </template>
    <section id="site-loading" v-else>Loading...</section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import utils from '@/common/utils';
import { LsData } from '@/common/types';
import PlanSquare from '@/vue/components/PlanSquare.vue';

@Component({
  components: {
    PlanSquare
  }
})
export default class Home extends Vue {
  lsData: LsData = utils.storage.loadAll() || utils.storage.default;
  presetDaysChoices = [7, 14, 21, 28];
  planNameMaxLength = 24;
  planTitleIdsInEdit: string[] = [];

  created() {
    // Check data for any unlimited plans and add up to current date if not presently added
    for (const plan of this.lsData.plans) {
      if (plan.isUnlimited) {
        utils.plans.updateUnlimitedPlan(plan);
      }
    }

    utils.storage.saveAll(this.lsData);
  }

  hideTitleShowForm(e: Event) {
    const targ = e.target as HTMLElement;
    const form = (targ.parentElement as HTMLElement).querySelector(
      'form'
    ) as HTMLFormElement;

    if (targ.nodeName !== 'H1') {
      return;
    }

    targ.style.display = 'none';

    form.style.display = 'block';
    form.querySelector('input')!.focus();

    this.planTitleIdsInEdit.push(form.dataset.planId as string);
  }

  amendPlanTitle(e: Event) {
    const targ = e.target as HTMLFormElement;

    for (const savedPlan of this.lsData.plans) {
      if (savedPlan.id === targ.dataset.planid) {
        savedPlan.title = (targ.querySelector(
          'input'
        ) as HTMLInputElement).value;
      }
    }

    utils.storage.saveAll(this.lsData);

    targ.style.display = 'none';
    (targ.parentElement as HTMLElement).querySelector('h1')!.style.display =
      'block';
  }

  deleteAllData() {
    if (window.confirm('Are you sure you wish to delete all site data?')) {
      utils.storage.clearAll();
      this.lsData = utils.storage.default;
    }
  }

  handlePresetChoiceSelect(e: Event) {
    const targ = e.target as HTMLButtonElement;
    if (targ.nodeName !== 'BUTTON') {
      return;
    }

    (document.getElementById(
      'plan-days'
    ) as HTMLInputElement).value = (targ.textContent as string).match(
      /\d+/
    )![0];
  }

  handleCreatePlanForm(e: Event) {
    const targ = e.target as HTMLFormElement;
    const newPlan = utils.plans.initNewPlan(
      (targ.querySelector('#plan-name') as HTMLInputElement).value,
      +(targ.querySelector('#plan-days') as HTMLInputElement).value
    );

    // Update UI
    this.lsData.plans.push(newPlan);

    // Update persistent storage
    utils.storage.saveAll(this.lsData);
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
      .plan-title-box {
        align-items: flex-start;
        display: flex;
        height: 40px;
        justify-content: center;

        h1 {
          cursor: pointer;
        }

        form {
          & > * {
            margin: 0px 5px;
          }
        }
      }

      .plan-squares-box {
        align-items: stretch;
        display: flex;
        flex-direction: column;
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
      .plan-box {
        .plan-title-box {
          height: 60px;
        }
      }

      #site-delete-all {
        width: 300px;
      }
    }

    @media all and (min-width: $medquery-min-width-03) {
      .plan-box {
        .plan-title-box {
          height: 80px;

          h1 {
            width: 350px;
          }
        }
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
        margin-bottom: 10px;
        text-align: center;
      }
    }

    #plan-days-preset-box {
      & > * {
        align-items: center;
        display: flex;
        justify-content: space-evenly;
        margin-bottom: 10px;

        button {
          &:active,
          &:hover {
            font-weight: bold;
          }
        }
      }

      #plan-days-preset-box-zero {
        button {
          width: 200px;
        }
      }

      #plan-days-preset-box-non-zero {
        button {
          width: 80px;
        }

        @media all and (min-width: $medquery-min-width-01) {
          button {
            width: 100px;
          }
        }
      }
    }

    @media all and (min-width: $medquery-min-width-01) {
      background-color: var(--bgColor1);
      border: 1px solid var(--accent1);
      border-radius: 3px;
      margin: 20px auto;
      padding: 10px 20px;
      width: $medquery-min-width-01;
    }
  }
}
</style>
