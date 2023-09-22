<template>
  <div>
    <Drawer v-if="showAppend" ref="drawer"></Drawer>
    
    <div id="navbar" color="transparent">
      <slot name="prepend">
        <v-btn :style="`visibility: ${showPrepend ? 'visible' : 'hidden'}`" class="btn-icon" @click="onPressBackBtn ?? $router.go(-1)">
          <img src="~/assets/sources/icons/arrow.svg" alt="go back">
        </v-btn>
      </slot>

      <aside v-if="showAppend" class="container-btns">
        <v-btn data-avatar class="btn-icon" to="/account-details">
          <img src="@/assets/sources/avatars/person.png" alt="avatar">
        </v-btn>

        <v-btn class="btn-icon" style="visibility: hidden" />
      </aside>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavbarComponent",
  props: {
    showAppend: {
      type: Boolean,
      default: false,
    },
    showPrepend: {
      type: Boolean,
      default: true,
    },
    onPressBackBtn: {
      type: Function,
      default: undefined
    },
  },
  data() {
    return {
      dataMenuUser: [
        { key:"logout", name:"Log out" },
      ],
      dataMenu: [],
    };
  },
  // created() {
  //   const theme = localStorage.getItem("theme");
  //   if (theme) {
  //     setTimeout(() => {
  //       this.$store.commit("switchTheme", theme);
  //     }, 100);
  //   }
  //   if (theme === "light") {this.themeButton = true}
  //   else {this.themeButton = false}
  // },
  methods: {
    // changeTheme(theme) {
    //   this.$store.commit("switchTheme", theme);
    //   this.themeButton = !this.themeButton;
    // },
  },
};
</script>

<style src="~/assets/styles/components/navbar.scss" lang="scss" />
