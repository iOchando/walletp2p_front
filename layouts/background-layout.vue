<template>
  <v-app id="auth-layout">
    <Alerts ref="alerts" />
    <!-- <ModalsConfirmMsg ref="confirmMsg" />
    <ModalsConnect ref="connect" /> -->

    <img
      id="auth-layout-background"
      :src="require(`~/assets/sources/images/circle.svg`)"
      alt="background"
      :style="`--w: 634px`"
    >

    <v-main class="parent">
      <nuxt-child data-nuxt="childs" />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "BackgroundLayout",
}
</script>

<style src="~/assets/styles/layouts/auth-layout.scss" lang="scss" />
