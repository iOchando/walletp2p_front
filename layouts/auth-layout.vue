<template>
  <v-app id="layout">
    <Alerts ref="alerts" />
    <ModalsConfirmMsg ref="confirmMsg" />
    <ModalsConnect ref="connect" />

    <img
      id="layout-background"
      :src="
        require(`~/assets/sources/images/circle${
          $route.path === '/login' ? '-main'
          : $route.path === '/verification' ? '-person'
          : ''
        }.svg`)
      "
      alt="background"
    >

    <v-main class="parent">
      <nuxt-child data-nuxt="childs" />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "LoginLayout",
}
</script>

<style src="~/assets/styles/layouts/layout.scss" lang="scss" />
