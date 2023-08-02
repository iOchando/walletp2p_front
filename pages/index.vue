<template>
  <div id="home" class="divcol center">
    <Header
      ref="header"
      :show-back-btn="false"
      top-text="Home"
      bottom-text="Page"
      description="SIGN IN OR REGISTER TO JOIN THE FUN"
      max-width="251px"
    />

    <Footer ref="footer">
      <template #content>
        <!-- content -->
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
