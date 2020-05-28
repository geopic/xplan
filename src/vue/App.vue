<template>
  <div id="app" class="theme-light">
    <header>
      <div id="site-title">{{ this.$store.state.siteName }}</div>
      <div id="site-theme-switcher" @click="toggleTheme">Switch theme</div>
    </header>
    <main><router-view /></main>
    <footer>
      &copy; George Pickering 2020 |
      <a href="https://github.com/geopic/xplan">GitHub repo</a>
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
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 50px auto 50px;
  height: 100vh;
  justify-content: center;
  transition: background-color 250ms, color 250ms;

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
      border-bottom: 1px solid black;
      cursor: pointer;
      padding: 5px 8px;
      user-select: none;
    }
  }

  footer {
    align-items: center;
    display: flex;
    font-size: 90%;
    justify-content: center;
  }
}
</style>
