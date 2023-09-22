<template>
  <div id="connect-with-near" class="d-flex flex-column">
    <Header
      top-text="CONNECT"
      top-text-dir="rtl"
      bottom-text="WITH NEAR"
      bottom-text-dir="ltr"
      description="AN APPLICATION IS REQUESTING LIMITED ACCESS TO YOUR NEAR ACCOUNT. SELECT THE ACCOUNT YOU WISH TO CONNECT."
    ></Header>

    <v-btn
      class="btn-outlined mx-auto mt-2 mb-6"
      style="--bg: var(--secondary); --h: 34px"
    >
      <img src="@/assets/sources/icons/language-blue.svg">
      <h5 class="mb-0">app.nea--ramper.com</h5>
    </v-btn>


    <v-card class="btn-outlined d-flex flex-column" style="gap: 14px;">
      <div class="v-card__wrapper d-flex flex-column" style="gap: 14px;">
        <WalletCard
          v-for="(item, i) in dataWallets" :key="i"
          :wallet="item.wallet"
          :pass="item.pass"
          collapsed
          :active="i == 0"
          :disabled="i != 0"
          :show="i == 0"
          @click="$log(item)"
        />
      </div>

      <v-btn
        class="btn-outlined"
        style="--b-color: var(--primary); --bg: var(--secondary); --c: var(--primary); margin-right: calc(var(--p-inside) + var(--p-outside));"
      >
        IMPORT A DIFFERENT ACCOUNT
      </v-btn>
    </v-card>

    <aside class="d-flex justify-space-between mt-6" style="gap: 12px;">
      <v-btn class="btn-outlined flex-grow-1" style="--bg: var(--secondary)">
        CANCEL
      </v-btn>

      <v-btn class="btn flex-grow-1">
        NEXT
      </v-btn>
    </aside>
  </div>
</template>

<script>
export default {
  name: "ConnectWithNear",
  layout: "default-variant",
  data() {
    return {
      dataWallets: [
        {
          wallet: "fritzwagner.near",
          pass: "hola hola hola hola hola",
        },
        {
          wallet: "1onduh47886002882hsghwoj asdasdasdas d as das da",
          pass: "hola hola hola hola hola asdsa asd asd as dasd",
        },
        {
          wallet: "746nwoknnbbllsnnsppmi018",
          pass: "hola hola hola hola hola",
        },
      ]
    }
  },
  head() {
    const title = 'Connect with NEAR';
    return {
      title,
    }
  },
}
</script>

<style src="@/assets/styles/pages/connect-with-near.scss" lang="scss"></style>
