<template>
  <div id="app">
    <header>
      <div id="site-title">{{ this.$store.state.siteName }}</div>
    </header>
    <main><router-view /></main>
    <footer>
      &copy; George Pickering 2020 |
      <a href="https://github.com/geopic/xplan">GitHub repository</a>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  created() {
    document.title = this.$store.state.siteName;
  }
}
</script>
