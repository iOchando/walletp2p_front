<template>
  <div id="account-details">
    <Header
      show-append
      top-text="ACCOUNT"
      bottom-text="DETAILS"
    ></Header>


    <!-- details -->
    <section id="account-details-detail" class="d-flex flex-column" style="gap: 15px;">
      <div class="space">
        <h5 class="mb-0">WALLET ID</h5>

        <div class="d-flex" style="gap: 12px;">
          <span class="center">patriciasilvab.near</span>

          <v-btn
            class="btn-icon"
            style="--size: 29px"
          >
            <img src="@/assets/sources/icons/copy.svg" alt="copy to clipboard" style="--w: 15px">
          </v-btn>
        </div>
      </div>

      <div class="jspace">
        <h5 class="mb-0">wallet balance</h5>

        <div class="d-flex flex-column tend">
          <span>0.9999996 NEAR</span>
          <span>$1.38</span>
        </div>
      </div>

      <v-card class="btn-outlined">
        <aside v-for="(value, key, i) in details" :key="i" class="space">
          <div class="center">
            <h5 class="mb-0">{{ key }}</h5>
            <img src="@/assets/sources/icons/warning-blue.svg" alt="info">
          </div>

          <div class="d-flex flex-column tend">
            <span>{{ value.amount }} NEAR</span>
            <span>&lt; ${{ value.currency }}</span>
          </div>
        </aside>
      </v-card>
    </section>


    <h1 class="mb-0" style="direction: rtl;">security &</h1>
    <h1 style="margin-bottom: 22px;">recovery</h1>


    <h5
      class="acenter"
      style="margin-bottom: 19px; gap: 5px;"
    >
      most secure (recomemmended)
      <img src="@/assets/sources/icons/warning-blue.svg" alt="info">
    </h5>


    <v-card
      class="btn-outlined d-flex align-center justify-space-between"
      style="--br: 20px; padding: 22px 17px; gap: 19px; background-color: #DEE6EA !important; margin-bottom: 41px;"
    >
      <div class="d-flex flex-column" style="gap: 5px; max-width: 126px;">
        <h5 class="mb-0">ledger hardware wallet</h5>

        <p class="mb-0">Improve the security of your account by using a hardware wallet.</p>
      </div>

      <v-btn style="border-radius: 50px !important; max-width: 134px; min-height: 34.26px;" class="btn flex-grow-1">
        <span style="color: #fff !important;">ENABLE</span>
      </v-btn>
    </v-card>


    <v-card
      class="btn-outlined d-flex align-center justify-space-between"
      style="--br: 20px; padding: 22px 17px; gap: 19px; background-color: #DEE6EA !important; margin-bottom: 27px;"
    >
      <div class="d-flex" style="gap: 5px;">
        <div class="d-flex flex-column" style="max-width: 126px;">
          <h5 class="mb-0">send phrase</h5>

          <p class="mb-0">Enable jul 19 2023</p>
        </div>

        <img src="@/assets/sources/icons/warning-blue.svg" alt="info">
      </div>

      <v-btn style="border-radius: 50px !important; max-width: 134px; min-height: 34.26px;" class="btn flex-grow-1">
        <span style="color: #fff !important;">DISABLE</span>
      </v-btn>
    </v-card>


    <div class="d-flex flex-column" style="gap: 15px;">
      <v-btn
        class="btn-outlined"
        style="--b-color: var(--primary); --bg: #DEE6EA"
      >
        <span style="color: var(--primary) !important;">export local private key</span>
      </v-btn>

      <v-btn class="btn">
        remove account form wallet
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountDetails",
  layout: "default-variant",
  data() {
    return {
      details: {
        'reserved for storage': {
          amount: "0.000264",
          currency: "0.01"
        },
        'reserved for transactions': {
          amount: "0.005",
          currency: "0.01"
        },
      'available balance': {
          amount: "0.98275",
          currency: "1.31"
        }
      }
    }
  }
}
</script>

<style src="@/assets/styles/pages/account-details.scss" lang="scss"></style>
