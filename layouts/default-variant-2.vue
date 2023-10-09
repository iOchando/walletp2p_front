<template>
  <v-app id="default-layout-variant-2">
    <Alerts ref="alerts" />
    <!-- <ModalConfirmMsg ref="confirmMsg" />
    <ModalConnect ref="connect" /> -->

    <img
      id="default-layout-variant-2-background"
      :src="require(`~/assets/sources/images/circle.svg`)"
      alt="background"
      :style="`--w: 634px`"
    >

    <v-main class="parent">
      <nuxt-child data-nuxt="childs" />
    </v-main>

    <Footer ref="footer">
      <span class="text" style="--text: var(--text2)">© 2023 Near p2p LLC. all rights reserved.</span>
      <a class="text" style="--fw: 700; color: var(--primary) !important" href="#" target="_blank">
        Terms of Service // Privacy Policy
      </a>
    </Footer>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayoutVariant2",
}
</script>

<style src="~/assets/styles/layouts/default-layout-variant-2.scss" lang="scss" />
