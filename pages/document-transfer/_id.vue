<template>
  <div id="document-transfer">
    <Header
      top-text="TRANSFERIR"
      top-text-dir="rtl"
      bottom-text="NFT"
      bottom-text-dir="ltr"
      hide-profile
      max-width="283px"
      style="margin-bottom: 20px;"
    ></Header>
    
    
    <aside id="document-transfer-header" class="mb-6">
      <v-img-load
        :src="require('@/assets/sources/avatars/avatar-female.svg')"
        rounded="50%"
        sizes="94"
        border="2px solid white"
        class="mb-3"
      ></v-img-load>

      <h6 class="mb-0 bold">
        <img
          :src="require('@/assets/sources/icons/checked.svg')" alt="check"
          class="mr-2" style="width: 16px;">
        # 15 MONKEY ART
      </h6>
      <span>De: MonkeyBussiness</span>
    </aside>


    <div class="d-flex flex-column" style="gap: 20px; margin-top: 80px;">
      <p class="mb-0" style="text-transform: none !important;">Enter a recipient address, then proceed to confirm your transaction.</p>

      <v-card class="btn-outlined d-flex justify-space-between" style="gap: 10px;">
        <h6 class="mb-0 bold">SEND TO</h6>
        <h6 class="mb-0 ml-auto">ID ACCOUNT</h6>
      </v-card>

      <div style="gap: 10px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 100px), 1fr))">
        <v-btn class="btn-outlined" @click="$router.back()">
          CANCEL
        </v-btn>

        <v-btn
          class="btn"
          @click="$router.push({ path: '/document-transfer-complete', query: { id: $route.query.id } })"
        >
          SEND
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DocumentTransferPage",
  layout: "default",
  data() {
    return {
    }
  },
  head() {
    const title = 'Transferir documento';
    return {
      title,
    }
  },
}
</script>

<style src="@/assets/styles/pages/document-transfer.scss" lang="scss"></style>
