<template>
  <div id="send" class="d-flex flex-column">
    <Header
      :show-prepend="false"
      show-append
    ></Header>

    <aside class="d-flex" style="gap: 12px; margin-top: 26px;">
      <v-btn class="btn-outlined flex-grow-1" style="--bg: #DEE6EA;">
        SEND
      </v-btn>

      <v-btn class="btn flex-grow-1">
        RECEIVE
      </v-btn>
    </aside>


    <section class="d-flex flex-column" style="height: 248px;">
      <v-text-field
        v-model="amount"
        placeholder="0.0"
        type="number"
      ></v-text-field>

      <v-btn
        class="btn-outlined mx-auto"
        style="--bg: #DEE6EA; --b-color: var(--primary); --c: var(--primary); --fs: 12px; --fw: 700; --ls: 0.36px; --h: 34px; width: 121px;"
      >USE MAX</v-btn>
    </section>


    <section class="d-flex flex-column" style="gap: 14px;">
      <v-card
        class="btn-outlined space"
        style="--bg: #DEE6EA; --b-color: #D1C4E8; padding: 0 23px;"
      >
        <h5 class="mb-0">SELECT ASSET</h5>
        
        <div class="center" style="gap: 6px;">
          <img src="@/assets/sources/logos/near-icon.svg" alt="near icon" style="width: 29px;">
          <span style="--fs: 12px; --c: var(--primary); --ls: normal">NEAR</span>
          <img src="@/assets/sources/icons/double-chevron-right.svg" alt="arrow right">
        </div>
      </v-card>

      <v-card
        class="btn-outlined space"
        style="--bg: #DEE6EA; --b-color: #D1C4E8; padding: 0 23px;"
      >
        <h5 class="mb-0">AVAILABLE TO SEND</h5>
        
        <span style="--fs: 12px; --ls: normal">25.74794 NEAR</span>
      </v-card>

      <aside class="d-flex" style="gap: 12px">
        <v-btn class="btn-outlined flex-grow-1" style="--bg: #DEE6EA;" @click="$router.go(-1)">
          CANCEL
        </v-btn>

        <v-btn class="btn flex-grow-1" to="/send-details">
          CONTINUE
        </v-btn>
      </aside>
    </section>
  </div>
</template>

<script>
export default {
  name: "SendPage",
  data() {
    return {
      amount: ""
    }
  },
  head() {
    const title = 'Send';
    return {
      title,
    }
  },
}
</script>

<style src="@/assets/styles/pages/send.scss" lang="scss"></style>
