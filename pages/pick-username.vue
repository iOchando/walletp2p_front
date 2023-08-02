<template>
  <div id="pick-username" class="divcol center">
    <Header
      ref="header"
      top-text="PICK A"
      bottom-text="USERNAME"
      description="THIS WILL BE YOUR LEGIBLE WALLET ADDRESS"
      max-width="283px"
      top-text-dir="rtl"
      bottom-text-dir="ltr"
      bottom-text-indent="1.6ch"
    />

    <section id="pick-username-content">
      <v-text-field
        label="username / wallet" solo
        style="--margin-message: 1px"
      ></v-text-field>
      <v-btn class="btn" @click="onSignUp()">sign up</v-btn>

      <article class="btn-outlined">
        <img width="36px" src="@/assets/sources/icons/warning.svg" alt="warning icon">

        <p class="p">
          <span>NOTE:</span> Your username will serve as your wallet address, allowing seamless transfers with just a few keystrokes.
        </p>
      </article>
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
  name: "PickUsernamePage",
  layout: "auth-layout",
  data() {
    return {
    }
  },
  head() {
    const title = 'Pick a username';
    return {
      title,
    }
  },
  methods: {
    onSignUp() {
      localStorage.setItem("auth", true)
      this.$router.push(this.localePath("/"))
    }
  }
};
</script>

<style src="~/assets/styles/pages/pick-username.scss" lang="scss" />
