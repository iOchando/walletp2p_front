<template>
  <div>
    <MenuNavbar ref="menu"></MenuNavbar>
    <!-- menu user -->
    <!-- <v-menu bottom offset-y nudge-bottom="10px">
      <template #activator="{ on, attrs }">
        <v-btn data-avatar class="btn-icon" v-bind="attrs" v-on="on">
          <img src="@/assets/sources/avatars/person.png" alt="avatar">
        </v-btn>
      </template>

      <v-list class="font2" color="var(--secondary)" style="--c:#fff">
        <v-list-item-group active-class="activeClass">
          <v-list-item
            v-for="(item,i) in dataMenuUser" :key="i"
            @click="item.key==='logout' ? $store.commit('signOut') : $router.push(localePath(key))">
            <v-list-item-title>{{item.name}}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu> -->


    <!-- menu -->
    <!-- <v-menu bottom offset-y nudge-bottom="10px">
      <template #activator="{ on, attrs }">
        <v-btn class="btn-icon" v-bind="attrs" v-on="on">
          <img width="16px" src="@/assets/sources/icons/options.svg" alt="settings">
        </v-btn>
      </template>

      <v-list class="font2" color="var(--secondary)" style="--c:#fff">
        <v-list-item-group active-class="activeClass">
          <v-list-item v-for="(item,i) in dataMenu" :key="i">
            <v-list-item-title>{{item.name}}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu> -->
    
    <div id="navbar" color="transparent">
      <slot name="prepend">
        <v-btn :style="`visibility: ${showBackBtn ? 'visible' : 'hidden'}`" class="btn-icon" @click="onPressBackBtn ?? $router.go(-1)">
          <img src="~/assets/sources/icons/arrow.svg" alt="go back">
        </v-btn>
      </slot>

      <aside v-if="showAppend" class="container-btns">
        <v-btn data-avatar class="btn-icon" to="/account-details">
          <img src="@/assets/sources/avatars/person.png" alt="avatar">
        </v-btn>
        
        <v-btn class="btn-icon">
          <img width="16px" src="@/assets/sources/icons/options.svg" alt="settings">
        </v-btn>
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
    showBackBtn: {
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
