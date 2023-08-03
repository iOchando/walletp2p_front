<template>
  <v-app id="auth-layout">
    <Alerts ref="alerts" />
    <ModalsConfirmMsg ref="confirmMsg" />
    <ModalsConnect ref="connect" />

    <img
      id="auth-layout-background"
      :src="
        require(`~/assets/sources/images/circle${
          $route.path === '/login' ? '-main'
          : $route.path === '/verification' ? '-person'
          : ''
        }.svg`)
      "
      alt="background"
      :style="`max-width: ${excludedRoutes.includes($route.path) ? 452 : 634}px`"
    >

    <v-main class="parent">
      <nuxt-child data-nuxt="childs" />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "LoginLayout",
  data() {
    return {
      excludedRoutes: [
        "/login",
        "/verification",
      ],
    };
  }
}
</script>

<style src="~/assets/styles/layouts/auth-layout.scss" lang="scss" />
