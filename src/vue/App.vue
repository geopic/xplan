<template>
  <div id="app">
    <header>
      <div id="site-header-box">
        <div id="site-title">
          {{ this.$store.state.siteName }}
        </div>
        <div
          id="site-config-icon"
          title="Open / close settings menu"
          @click="toggleConfigMenu"
        >
          <font-awesome-icon icon="cog" size="lg" />
          Settings
        </div>
      </div>
      <div class="hidden" id="site-config-box">
        <div class="site-config-box-section">
          <label>Theme: </label> <button type="button">Light</button>
          <button type="button">Dark</button>
        </div>
        <div class="site-config-box-section">
          <label>Sort squares by: </label> <button type="button">Start</button>
          <button type="button">End</button>
        </div>
        <div class="site-config-box-section">
          <label for="site-config-locale">Language: </label>
          <select id="site-config-locale"
            ><option value="en">English</option></select
          >
          <a href="#">Contribute</a>
        </div>
      </div>
    </header>
    <main><router-view /></main>
    <footer>
      <div id="site-credits">
        &copy; {{ this.$store.state.siteName }} contributors 2020 |
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

  toggleConfigMenu() {
    this.$el.querySelector('#site-config-box')?.classList.toggle('hidden');
  }
}
</script>

<style lang="scss">
#app {
  align-items: stretch;
  display: grid;
  grid-template-rows: auto auto 50px;
  height: 100%;
  justify-content: stretch;
  padding: 5px;

  header {
    align-items: stretch;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    #site-header-box {
      align-items: center;
      display: flex;
      justify-content: space-evenly;

      #site-title {
        font-size: 160%;
      }

      #site-config-icon {
        align-items: center;
        cursor: pointer;
        display: flex;
        flex: 0 1 100px;
        justify-content: space-evenly;
        padding: 2px 5px;
        user-select: none;

        &:hover,
        &:active {
          background-color: var(--bgColor1);
        }
      }
    }

    #site-config-box {
      height: auto;
      padding: 20px;
      padding-bottom: 0px;
      transition: height 250ms;
      visibility: visible;
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

    @media all and (min-width: $medquery-min-width-01) {
      #site-header-box {
        #site-config-icon {
          flex: 0 1 140px;
        }
      }
    }
  }

  footer {
    align-self: center;

    #site-credits {
      align-items: center;
      display: flex;
      font-size: 90%;
      justify-content: center;
    }
  }
}

.hidden {
  height: 0px !important;
  padding: 0px !important;
  visibility: hidden !important;
}
</style>
