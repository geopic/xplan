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
  --bgColor: #fafafa;
  --color: #222;
  --accent: #0085dd;
}

.theme-dark {
  --bgColor: #222;
  --color: #fafafa;
  --accent: #ffa034;
}

#app {
  align-items: center;
  background-color: var(--bgColor);
  box-sizing: border-box;
  color: var(--color);
  display: grid;
  grid-template-rows: 50px auto 50px;
  height: 100vh;
  justify-content: center;
  transition: background-color 250ms, border-color 250ms, color 250ms;

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
      border-bottom: 1px dotted var(--accent);
      cursor: pointer;
      padding: 8px;
      user-select: none;
    }
  }

  footer {
    align-items: center;
    display: flex;
    font-size: 90%;
    justify-content: center;

    a {
      color: var(--accent);
      text-decoration: none;
    }
  }
}
</style>
