<template>
  <div id="app" class="theme-light">
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

    if (utils.storage.loadAll()?.theme === 'dark') {
      this.$el.classList.remove('theme-light');
      this.$el.classList.add('theme-dark');
    }
  }

  toggleTheme() {
    const data = utils.storage.loadAll() || utils.storage.default;

    if (this.$el.classList.contains('theme-light')) {
      this.$el.classList.remove('theme-light');
      this.$el.classList.add('theme-dark');
      data.theme = 'dark';
      utils.storage.saveAll(data);
    } else if (this.$el.classList.contains('theme-dark')) {
      this.$el.classList.remove('theme-dark');
      this.$el.classList.add('theme-light');
      data.theme = 'light';
      utils.storage.saveAll(data);
    }
  }
}
</script>

<style lang="scss">
#app {
  align-items: center;
  background-color: var(--bgColor);
  color: var(--color);
  display: grid;
  grid-template-rows: 50px auto 50px;
  height: 100vh;
  justify-content: center;
  transition: all 250ms;

  & > * {
    height: 100%;
    width: 100vw;
  }

  header {
    align-items: center;
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
        border-bottom: 1px dotted var(--accent);
      }
    }
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
