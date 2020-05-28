<template>
  <div id="app" class="theme-light">
    <header>
      <div id="site-title">{{ this.$store.state.siteName }}</div>
      <div id="site-theme-switcher" @click="toggleTheme">Switch theme</div>
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
import utils from '@/common/utils';

@Component
export default class App extends Vue {
  mounted() {
    document.title = this.$store.state.siteName;

    if (utils.loadDataFromLS()?.theme === 'dark') {
      this.$el.classList.remove('theme-light');
      this.$el.classList.add('theme-dark');
    }
  }

  toggleTheme() {
    if (this.$el.classList.contains('theme-light')) {
      this.$el.classList.remove('theme-light');
      this.$el.classList.add('theme-dark');
      utils.saveDataToLS({ theme: 'dark' });
    } else if (this.$el.classList.contains('theme-dark')) {
      this.$el.classList.remove('theme-dark');
      this.$el.classList.add('theme-light');
      utils.saveDataToLS({ theme: 'light' });
    }
  }
}
</script>

<style lang="scss" scoped>
.theme-light {
  background-color: #fafafa;
  color: #222;
}

.theme-dark {
  background-color: #222;
  color: #fafafa;
}

#app {
  align-items: center;
  display: grid;
  grid-template-rows: 50px auto 50px;
  height: 100vh;
  justify-content: center;
}
</style>
