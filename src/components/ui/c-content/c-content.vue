<template>
  <div class="c-content">
    <div class="c-content__topbar">
      <img src="../../../assets/logo.svg" alt="Logo" class="logo" />
    </div>
    <div class="c-content__wrapper">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
@use "sass-bem/bem";
@use "@scss/_imports";

@include bem.component("content") {
  width: 100%;
  height: 100%;
  padding: 32px;
  display: flex;
  flex-direction: column;

  > * {
    width: 100%;
  }

  @include bem.block("logo") {
    width: 50px;
    height: 50px;
    margin: 0 auto;
  }

  @include bem.element("topbar") {
    position: absolute;
    top: 32px;
    left: 0;
    width: 100%;
  }

  @include bem.element("wrapper") {
    margin: auto 0;
  }
}
</style>
