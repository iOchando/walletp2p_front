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

    <div id="verification-content">
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

      <v-btn class="btn">verify</v-btn>
    </div>

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
  }
};
</script>

<style src="~/assets/styles/pages/verification.scss" lang="scss" />
