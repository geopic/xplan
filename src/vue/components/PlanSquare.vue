<template>
  <div class="plan-square">
    <div class="square-date">{{ formattedDate(this.$attrs.date) }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { format } from 'date-fns';

@Component
export default class PlanSquare extends Vue {
  formattedDate(date: string) {
    return format(new Date(date), 'EEE do MMM');
  }
}
</script>

<style lang="scss">
.plan-square {
  border: 1px dotted transparent;
  border-color: var(--accentAlt);
  flex: 0 1 25%;
  margin: 2px;
  padding: 5px 10px;
  text-align: center;

  &:hover,
  &:active {
    background-color: var(--bgColorAlt);
    cursor: pointer;
    user-select: none;
  }
}
</style>
