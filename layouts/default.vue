<template>
  <v-app id="default-layout">
    <Alerts ref="alerts" />
    <ModalsConfirmMsg ref="confirmMsg" />
    <ModalsConnect ref="connect" />
    
    <Navbar ref="navbar"></Navbar>

    <img
      id="default-layout-background"
      src="~/assets/sources/images/circle.svg"
      alt="background"
    >

    <v-main class="parent">
      <nuxt-child data-nuxt="childs" />
    </v-main>
    
    <Footer ref="footer">
      <template #content>
        <span class="text">© 2023 Near p2p LLC. all rights reserved.</span>
        <a href="#" target="_blank">Terms of Service // Privacy Policy</a>
      </template>
    </Footer>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  middleware: ['authenticated'],
  data() {
    return {
    }
  },
  created() {
    // get data profile
    this.$store.dispatch("getData");
  },
  mounted() {
    this.scrollX();
    // this.footerHeightListener(); 
    
    // resize listener
    // window.addEventListener("resize", this.footerHeightListener);
  },
  beforeDestroy() {
    // window.removeEventListener("resize", this.footerHeightListener);
  },
  methods: {
    scrollX() {
      const
        scrollableDesktop = document.querySelectorAll('.scrollx'),
        scrollableMobile = document.querySelectorAll('.scrollxmobile');
      if (scrollableDesktop) {
        for (const el of scrollableDesktop) {
          el.addEventListener("wheel", event => { event.preventDefault(); el.scrollLeft += event.deltaY })
        }
      }
      if (scrollableMobile) {
        for (const el of scrollableMobile) {
          el.addEventListener("wheel", event => {
            if (window.innerWidth <= 880) { event.preventDefault(); el.scrollLeft += event.deltaY }
          })
        }
      }
    },
    footerHeightListener() {
      setTimeout(() => {
        const footer = document.querySelector('#footer');
        document.documentElement.style.setProperty(
          '--h-footer', `${footer.getBoundingClientRect().height}px`
        );
      }, 400);
    },
  },
}
</script>

<style src="~/assets/styles/layouts/default-layout.scss" lang="scss" />
