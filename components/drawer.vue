<template>
  <nav
    id="drawer"
    :class="{ opened: model }"
  >
    <img id="drawer-background" src="~/assets/sources/images/bg-drawer.svg" alt="background">

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


      <section class="d-flex flex-column" style="gap: 16px;">
        <div class="d-flex flex-column" style="gap: 9px;">
          <label>CUENTA</label>
          <WalletCard wallet="patriciasilvab.near" pass="hola hola hola" />
        </div>

        <v-btn class="btn">IMPORTAR CUENTA</v-btn>

        <v-btn
          class="btn-outlined"
          style="--bg: var(--secondary); --b-color: var(--primary); --c: var(--primary)"
        >CREAR CUENTA NUEVA</v-btn>
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
          name: "billetera",
          icon: require("@/assets/sources/drawer/wallet.svg"),
          action: () => {},
        },
        {
          name: "staking",
          icon: require("@/assets/sources/drawer/staking.svg"),
          action: () => {},
        },
        {
          name: "explorar",
          icon: require("@/assets/sources/drawer/explore.svg"),
          action: () => {},
        },
        {
          name: "cuenta",
          icon: require("@/assets/sources/drawer/account.svg"),
          action: () => {},
        },
        {
          name: "soporte",
          icon: require("@/assets/sources/drawer/support.svg"),
          action: () => {},
        },
        {
          name: "es",
          icon: require("@/assets/sources/drawer/language.svg"),
          action: () => {},
        },
      ]
    }
  },
  watch: {
    model(value) {
      const el = document.getElementById('drawer')

      if (!value) {
        el.style.backgroundColor = 'var(--primary)'
        setTimeout(() => { el.style.backgroundColor = 'transparent' }, 300);
        el.scrollTop = 0
      }
    }
  }
}
</script>

<style src="@/assets/styles/components/drawer.scss" lang="scss"></style>
