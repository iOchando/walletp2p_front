<template>
  <div id="approve-transaction" class="d-flex flex-column">
    <Header
      top-text="APPROVE"
      top-text-dir="rtl"
      bottom-text="TRANSACTION"
      bottom-text-dir="ltr"
    ></Header>

    <v-btn
      class="btn-outlined mx-auto"
      style="--bg: var(--secondary); --h: 34px; margin-bottom: 19px;"
    >
      <img src="@/assets/sources/icons/language-blue.svg">
      <h5 class="mb-0">app.nea--ramper.com</h5>
    </v-btn>


    <v-card
      min-height="45"
      class="btn-outlined justify-space-between align-center flex-wrap"
      style="margin-bottom: 12px;"
    >
      <label>FROM</label>

      <div class="d-flex flex-column tend">
        <span
          style="--fw: 700"
        >andresdom.near</span>

        <span
          class="ml-auto"
          style="--fw: 500; color: #7C7B7F !important"
        >5.866717 near</span>
      </div>
    </v-card>

    <v-card
      min-height="45"
      class="btn-outlined justify-space-between align-center flex-wrap"
    >
      <div class="acenter" style="gap: 8px;">
        <label>ESTIMATED FEES</label>
        <img src="@/assets/sources/icons/warning-blue.svg" alt="info icon">
      </div>

      <div class="d-flex flex-column tend ml-auto" style="--fw: 400">
        <span>&lt;0.000001 NEAR</span>
        <span>&lt; $0.01</span>
      </div>
    </v-card>


    <a
      href=""
      target="_blank"
      class="tcenter my-6 mx-auto"
      style="
        --fw: 700;
        max-width: max-content;
        font-size: 9px;
        letter-spacing: 0.27px;
      "
    >+ MORE INFORMATION</a>


    <aside class="d-flex justify-space-between" style="gap: 12px;">
      <v-btn class="btn-outlined flex-grow-1" style="--bg: var(--secondary)">
        CANCEL
      </v-btn>

      <v-btn class="btn flex-grow-1">
        CONNECT
      </v-btn>
    </aside>
  </div>
</template>

<script>
import utils from '../services/utils';

export default {
  name: "LimitedPermissions",
  layout: "default-variant",
  data() {
    return {
      checks: [
        { text: "View  the address of your permited account", check: true },
        { text: "View  the balance of your permited account", check: true },
        { text: "Call methods on the smart contract on behalf of your permited account", check: true },
        { text: "This does not allow the app to transfer tokens", check: false },
      ]
    }
  },
  head() {
    const title = 'Connect with NEAR';
    return {
      utils,
      title,
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style src="@/assets/styles/pages/approve-transaction.scss" lang="scss"></style>
