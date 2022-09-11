<template>
  <div id="app" class="c-app">
    <!-- <c-menubar /> -->
    <c-content />
  </div>
</template>

<script>
// import CMenubar from "./components/ui/c-menubar/c-menubar.vue";
import CContent from "./components/ui/c-content/c-content.vue";

export default {
  components: {
    // CMenubar,
    CContent,
  },
};
</script>

<style lang="scss">
@use "sass-bem/bem";
@use "@scss/imports";
@import "@scss/index";

@include bem.component("app") {
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: imports.$cb-dark-2;
  overflow: hidden;
  text-align: center;

  * {
    &:hover {
      &::-webkit-scrollbar-thumb {
        background-color: rgba(imports.$cb-highlight-1, 1);
      }
    }

    &::-webkit-scrollbar {
      width: 20px;
      height: 4px;
    }

    &::-webkit-scrollbar-corner {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(imports.$cb-highlight-1, 0);
      border-radius: 8px;
      transition: background-color 0.3s ease;
    }

    // &::-webkit-scrollbar-track {
    //   background-color: imports.$cb-dark-1;
    // }
  }
}
</style>
