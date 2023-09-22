<template>
  <nav
    id="drawer"
    :class="{ opened: model }"
  >
    <img id="drawer-background" src="~/assets/sources/images/bg-drawer.svg" alt="background">
    <!-- toggle when closed -->
    <v-btn id="drawer-toggle" v-ripple="false" class="btn-icon" style="--bg: transparent;" @click="model = !model">
      <img src="@/assets/sources/icons/options.svg" alt="settings">
    </v-btn>

    <div id="drawer__wrapper">
      <section id="drawer__ring">
        <div
          v-for="(item, i) in dataButtons" :key="i"
          class="action-btn d-flex align-center"
          style="gap: 11px;"
        >
          <h5 v-if="item.name" class="mb-0" style="text-transform: uppercase !important">{{ item.name }}</h5>
          <v-btn class="btn-icon-shadow" style="--size: var(--btn-size)" @click="item.action">
            <img :src="item.icon" :alt="`${item.name} icon`">
          </v-btn>
        </div>
      </section>


      <section id="drawer__footer" class="d-flex flex-column" style="gap: 16px;">
        <div class="d-flex flex-column" style="gap: 9px;">
          <label>ACCOUNT</label>
          <v-card class="btn-outlined space" style="padding: 0 8px 0 18px;">
            <h5 class="mb-0">patriciasilvab.near</h5>


            <aside class="d-flex" style="gap: 6px;">
              <div class="container-dots"></div>

              <v-btn class="btn-icon">
                <img src="@/assets/sources/icons/copy.svg" alt="copy to clipboard">
              </v-btn>

              <v-btn class="btn-icon" style="--bg: #DEE6EA; --b: 1px solid var(--primary);">
                <img src="@/assets/sources/icons/eye-off.svg" alt="hide password">
              </v-btn>
            </aside>
          </v-card>
        </div>

        <v-btn class="btn">IMPORT ACCOUNT</v-btn>

        <v-btn class="btn-outlined">CREATE NEW ACCOUNT</v-btn>
      </section>
    </div>
  </nav>
</template>

<script>
export default {
  name: "DrawerComponent",
  data() {
    return {
      model: false,
      dataButtons: [
        {
          icon: require("@/assets/sources/drawer/close.svg"),
          action: () => { this.model = false },
        },
        {
          name: "wallet",
          icon: require("@/assets/sources/drawer/wallet.svg"),
          action: () => {},
        },
        {
          name: "staking",
          icon: require("@/assets/sources/drawer/staking.svg"),
          action: () => {},
        },
        {
          name: "explore",
          icon: require("@/assets/sources/drawer/explore.svg"),
          action: () => {},
        },
        {
          name: "account",
          icon: require("@/assets/sources/drawer/account.svg"),
          action: () => {},
        },
        {
          name: "support",
          icon: require("@/assets/sources/drawer/support.svg"),
          action: () => {},
        },
        {
          name: "eng",
          icon: require("@/assets/sources/drawer/language.svg"),
          action: () => {},
        },
      ]
    }
  }
}
</script>

<style src="@/assets/styles/components/drawer.scss" lang="scss"></style>
