<template>
  <div id="header">
    <v-btn :style="`opacity: ${showBackBtn ? 1 : 0}`" class="btn-icon" @click="onPressBackBtn ?? $router.go(-1)">
      <img src="~/assets/sources/icons/arrow.svg" alt="go back">
    </v-btn>

    <div
      id="header-content"
      :style="`--max-width: ${maxWidth}; --margin-left: ${marginLeftContent}; --margin-right: ${marginRightContent}`"
    >
      <h1 :style="`--dir: ${topTextDir}; --indent: ${topTextIndent}`" class="p">{{topText}}</h1>
      <h1 :style="`--dir: ${bottomTextDir}; --indent: ${bottomTextIndent}`">{{bottomText}}</h1>
      <p>{{description}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderComponent",
  props: {
    maxWidth: {
      type: String,
      default: undefined,
    },
    showBackBtn: {
      type: Boolean,
      default: true,
    },
    onPressBackBtn: {
      type: Function,
      default: undefined
    },
    marginLeftContent: {
      type: String,
      default: "auto",
    },
    marginRightContent: {
      type: String,
      default: "auto",
    },
    topText: {
      type: String,
      default: undefined
    },
    bottomText: {
      type: String,
      default: undefined
    },
    topTextDir: {
      type: String,
      default: "ltr"
    },
    bottomTextDir: {
      type: String,
      default: "rtl"
    },
    topTextIndent: {
      type: String,
      default: undefined
    },
    bottomTextIndent: {
      type: String,
      default: undefined
    },
    description: {
      type: String,
      default: undefined
    },
  },
};
</script>

<style lang="scss">
#header {
  margin-top: var(--margin-header);
  width: 100%;
  display: flex;
  flex-direction: column;

  &-content{
    width: 100%;
    max-width: var(--max-width, auto);
    margin-left: var(--margin-left, auto);
    margin-right: var(--margin-right, auto);
    margin-top: 16px;

    h1.p {
      direction: var(--dir, ltr);
      text-indent: var(--indent);
    }

    h1 + h1 {
      direction: var(--dir, rtl);
      text-indent: var(--indent);
    }

    p {
      text-align: center;
    }
  }
}
</style>
