<template>
  <div class="plan-square">
    <div class="square-date">{{ formattedDate(this.$attrs.date) }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { format } from 'date-fns';
import utils from '@/common/utils';

@Component
export default class PlanSquare extends Vue {
  formattedDate(date: string) {
    return format(new Date(date), utils.storage.loadAll()!.dateFormat);
  }
}
</script>

<style lang="scss">
.plan-square {
  margin: 2px;
  padding: 5px 10px;
  text-align: center;

  &:hover,
  &:active {
    background-color: var(--bgColor1);
    cursor: pointer;
    user-select: none;
  }
}
</style>
