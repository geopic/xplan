<template>
  <div id="app">
    <header>
      <div id="site-title">{{ this.$store.state.siteName }}</div>
      <div id="site-theme-switcher" @click="toggleTheme">Switch theme</div>
    </header>
    <main><router-view /></main>
    <footer>
      <div id="site-credits">
        &copy; George Pickering 2020 |
        <a href="https://github.com/geopic/xplan">GitHub repo</a>
      </div>
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
    const bodyEl = this.$el.parentElement as HTMLElement;

    if (utils.storage.loadAll()?.theme === 'dark') {
      bodyEl.classList.remove('theme-light');
      bodyEl.classList.add('theme-dark');
    }
  }

  toggleTheme() {
    const data = utils.storage.loadAll() || utils.storage.default;
    const bodyEl = this.$el.parentElement as HTMLElement;

    if (bodyEl.classList.contains('theme-light')) {
      bodyEl.classList.remove('theme-light');
      bodyEl.classList.add('theme-dark');
      data.theme = 'dark';
      utils.storage.saveAll(data);
    } else if (bodyEl.classList.contains('theme-dark')) {
      bodyEl.classList.remove('theme-dark');
      bodyEl.classList.add('theme-light');
      data.theme = 'light';
      utils.storage.saveAll(data);
    }
  }
}
</script>

<style lang="scss">
#app {
  align-items: center;
  display: grid;
  grid-template-rows: 60px auto 50px;
  height: 100%;
  justify-content: stretch;

  header {
    align-items: center;
    align-self: center;
    display: flex;
    justify-content: space-evenly;

    #site-title {
      font-size: 160%;
    }

    #site-theme-switcher {
      cursor: pointer;
      padding: 8px;
      user-select: none;

      &:hover,
      &:active {
        border-bottom: 1px dotted var(--accent0);
      }
    }
  }

  main {
    align-self: flex-start;
  }

  footer {
    #site-credits {
      align-items: center;
      display: flex;
      font-size: 90%;
      justify-content: center;
    }
  }
}
</style>
