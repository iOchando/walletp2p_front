<template>
  <div id="home" class="divcol center">
    <Header
      ref="header"
      :show-back-btn="false"
      top-text="GET"
      bottom-text="STARTED"
      description="SIGN IN OR REGISTER TO JOIN THE FUN"
      max-width="251px"
    />

    <div v-for="i in 3" v-show="$route.path === '/'" :id="`home-decoration-${i}`" :key="i" />

    <Footer ref="footer" text-bottom="PRIVACY POLICY">
      <template #content>
        <div id="home-footer-content">
          <v-text-field
            solo label="email"
            style="--margin-message: 1px"
          ></v-text-field>

          <v-btn class="btn" @click="onContinue()">continue</v-btn>

          <p class="p tcenter">or</p>

          <v-btn class="btn-outlined">
            <img width="18px" src="~/assets/sources/logos/gmail.svg" alt="gmail logo" style="margin-right: 10px">
            <span>CONTINUE WITH GOOGLE</span>
          </v-btn>

          <v-btn class="btn-outlined">CONTINUE WITH PASSPHRASE</v-btn>

          <span
            class="text tcenter"
            style="--fw: 700; --text: var(--text2); margin-top: 22px"
          >PRIVACY POLICY</span>
        </div>
      </template>


    </Footer>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
    }
  },
  head() {
    const title = 'Home';
    return {
      title,
    }
  },
  methods: {
    onContinue() {
      this.$router.push(this.localePath("/verification"))
    }
  }
};
</script>

<style src="~/assets/styles/pages/index.scss" lang="scss" />
