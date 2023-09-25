<template>
  <div id="send-qr" class="d-flex flex-column">
    <Header
      :show-prepend="false"
      show-append
    ></Header>

    <aside class="d-flex" style="gap: 12px; margin-top: 26px;">
      <v-btn class="btn-outlined flex-grow-1" style="--bg: var(--secondary);">
        SEND
      </v-btn>

      <v-btn class="btn flex-grow-1">
        RECEIVE
      </v-btn>
    </aside>


    <section class="d-flex flex-column" style="height: 248px;">
      <vue-qr
        id="qr-code"
        text="https://www.npmjs.com/package/vue-qr"
        :bg-src="require('@/assets/sources/images/transparent.png')"
        :logo-src="require('@/assets/sources/logos/logo-qr.svg')"
        :logo-corner-radius="20"
        :correct-level="3"
        :dot-scale=".5"
        :size="500"
        :margin="0"
        :callback="test"
        :components="{
          data: {
            scale: 1,
          },
          timing: {
            scale: 1,
            protectors: false,
          },
          alignment: {
            scale: 1,
            protectors: false,
          },
          cornerAlignment: {
            scale: .9,
            protectors: true,
          },
        }"
      ></vue-qr>
    </section>


    <section class="d-flex flex-column" style="gap: 14px;">
      <div class="d-flex flex-column" style="gap: 6px;">
        <label>ACCOUNT ID</label>
        <v-card
          class="btn-outlined space"
          style="--bg: var(--secondary); padding: 0 8px 0 23px;"
        >
          <h5 class="mb-0">beesimple.near</h5>

          <v-btn class="btn-icon" style="--bg: var(--primary); --size: 29px">
            <img src="@/assets/sources/icons/copy.svg" alt="copy to clipboard" style="width: 15px;">
          </v-btn>
        </v-card>
      </div>

      <aside class="d-flex" style="gap: 12px">
        <v-btn class="btn-outlined flex-grow-1" style="--bg: var(--secondary);" @click="$router.go(-1)">
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
import VueQr from 'vue-qr'

export default {
  name: "SendQrPage",
  components: { VueQr },
  data() {
    return {
    }
  },
  head() {
    const title = 'Send QR';
    return {
      title,
    }
  },
  methods: {
    test(dataUrl, id) {
      console.log(dataUrl, id)
    }
  }
}
</script>

<style src="@/assets/styles/pages/send-qr.scss" lang="scss"></style>
