<template>
  <v-app id="auth-layout">
    <Alerts ref="alerts" />
    <ModalsConfirmMsg ref="confirmMsg" />
    <ModalsConnect ref="connect" />

    <img
      id="auth-layout-background"
      :src="
        require(`~/assets/sources/images/circle${
          route === '/login' ? '-main'
          : route === '/verification' ? '-person'
          : ''
        }.svg`)
      "
      alt="background"
      :style="`--w: ${excludedRoutes.includes(route) ? 452 : 634}px`"
    >

    <v-main class="parent">
      <nuxt-child data-nuxt="childs" />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "AuthLayout",
  data() {
    return {
      excludedRoutes: [
        "/login",
        "/verification",
      ],
    };
  },
  computed: {
    route() {
      const route = this.$route.path
      
      if (route.endsWith("/")) {
        return route.slice(0, -1);
      }

      return route
    }
  },
}
</script>

<style src="~/assets/styles/layouts/auth-layout.scss" lang="scss" />
