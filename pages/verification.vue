<template>
  <div id="verification" class="divcol center">
    <Header
      ref="header"
      top-text="otp"
      bottom-text="verification"
      description="ENTER THE VERIFICATION CODE WE JUST SENT ON YOUR EMAIL ADDRESS"
      max-width="279px"
      top-text-dir="rtl"
      top-text-indent="2.8ch"
      bottom-text-dir="ltr"
    />

    <section id="verification-content">
      <v-otp-input
        length="4"
        type="number"
      ></v-otp-input>

      <div class="space">
        <span class="text">resend code in</span>

        <span
          class="text"
          style="--text: #F20C0C; --fw: 700"
        >2:13</span>
      </div>

      <v-btn class="btn" @click="onVerify()">verify</v-btn>
    </section>

    <Footer ref="footer">
      <template #content>
        <span class="text" style="--text: var(--text2)">NEED HELP? 
          <a style="--fw: 700" href="#" target="_blank">SUPPORT</a>
        </span>
      </template>
    </Footer>
  </div>
</template>

<script>
export default {
  name: "VerificationPage",
  layout: "auth-layout",
  data() {
    return {
    }
  },
  head() {
    const title = 'OTP Verification';
    return {
      title,
    }
  },
  methods: {
    onVerify() {
      this.$router.push(this.localePath("/pick-username"))
    }
  }
};
</script>

<style src="~/assets/styles/pages/verification.scss" lang="scss" />
