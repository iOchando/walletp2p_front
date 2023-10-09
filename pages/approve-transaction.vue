<template>
  <div id="approve-transaction" class="d-flex flex-column">
    <modalInfo
      activator="#more-information-btn"
      title="Transaction Details"
      content-class="approve-transaction-info-modal"
    >
      <v-card class="btn-outlined mb-4 px-4 py-2" style="--bg: var(--secondary); --br: 15px; --ls: normal; --fs: 12px; --fw: 600">
        <h6 class="mb-3" style="--fs: 15px">Network Fees</h6>

        <div class="space" style="gap: 20px;">
          <span>Estimated Fees</span>
          <span style="--fw: 400">&lt; 0.00001 NEAR</span>
        </div>

        <div class="space" style="gap: 20px;">
          <span>Fee limit</span>
          <span style="--fw: 400">600 Tgas</span>
        </div>
      </v-card>


      <v-card class="btn-outlined px-4 py-2" style="--bg: var(--secondary); --br: 15px; --ls: normal; --fs: 12px; --fw: 600">
        <h6 class="mb-3" style="--fs: 15px">Contract Details</h6>

        <section class="d-flex flex-column" style="gap: 20px;">
          <aside
            v-for="(item, i) in transactionDetails.contract" :key="i"
            class="d-flex flex-column"
            style="gap: 10px;"
          >
            <div class="space" style="gap: 20px;">
              <span>For Contract</span>
              <a
                href="" target="_blank"
                class="center"
                style="font-size: 12px; gap: 6px;">
                {{ item.account }}
                <img src="@/assets/sources/icons/link.svg" alt="link icon" style="width: 15px;">
              </a>
            </div>

            <div class="space" style="gap: 20px;">
              <span>Function:</span>
              <v-select
                v-model="item.function"
                :items="item.listFunctions"
                hide-details solo
                :menu-props="{ contentClass: 'aprove-transaction-info-menu' }"
              />
            </div>
          </aside>
        </section>
      </v-card>
    </modalInfo>

    <Header
      top-text="APPROVE"
      top-text-dir="rtl"
      bottom-text="TRANSACTION"
      bottom-text-dir="ltr"
    ></Header>

    <v-btn
      class="btn-outlined mx-auto"
      style="--bg: var(--secondary); --h: 34px; margin-top: 3px;"
    >
      <img src="@/assets/sources/icons/language-blue.svg">
      <h5 class="mb-0">app.nea--ramper.com</h5>
    </v-btn>


    <section class="d-flex flex-column center" style="height: 245px; margin-block: 25px;">
      <h2 class="ma-0">0 <span>NEAR</span></h2>
      <span>$4.45</span>
    </section>


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
      id="more-information-btn"
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
  layout: "default-variant-2",
  data() {
    return {
      checks: [
        { text: "View  the address of your permited account", check: true },
        { text: "View  the balance of your permited account", check: true },
        { text: "Call methods on the smart contract on behalf of your permited account", check: true },
        { text: "This does not allow the app to transfer tokens", check: false },
      ],
      transactionDetails: {
        network: undefined,
        contract: [
          {
            account: 'v4.nearp2pdex.near ',
            function: 'deposit',
            listFunctions: ['deposit', 'other']
          },
          {
            account: 'v4.nearp2pdex.near ',
            function: 'accept_offer',
            listFunctions: ['accept_offer', 'other']
          },
        ]
      }
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
