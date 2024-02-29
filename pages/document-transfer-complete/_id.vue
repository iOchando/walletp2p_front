<template>
  <div id="document-transfer-complete">
    <Header
      top-text="TRANSFERENCIA"
      top-text-dir="ltr"
      middle-text="NFT"
      middle-text-center
      bottom-text="COMPLETADA"
      bottom-text-dir="rtl"
    >
      <template #prepend>
        <v-btn class="btn-icon ml-auto" @click="$router.replace('/')">
          <v-icon size="18" style="translate: 1px 0;">mdi-close</v-icon>
        </v-btn>
      </template>
    </Header>
    

    <div class="d-flex flex-column" style="gap: 20px; margin-top: 20px;">
      <p class="mb-0" style="text-transform: none !important;">
        The NFT transfer has been successfully completed.
      </p>

      <v-card class="btn-outlined">
        <h6 class="mb-0">TRANSACTION INFO</h6>
        
        <aside
          v-for="(item, i) in contractInfo" :key="i"
          class="d-flex align-center justify-space-between flex-wrap mt-3"
          style="gap: 10px;"
        >
          <p class="mb-0 bold">{{ item.field }}</p>

          <div class="d-flex align-center ml-auto" style="gap: 10px;">
            <p class="mb-0">{{ item.linkText }}</p>

            <v-btn icon class="btn-icon" style="--size: 29px">
              <img src="../../assets/sources/icons/copy.svg" alt="copy icon" style="width: 14.82px;">
            </v-btn>
          </div>
        </aside>
      </v-card>
    </div>

    <v-btn class="btn">
      VOLVER A LA BILLETERA
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "DocumentDetailsPage",
  data() {
    return {
      contractInfo: [
        {
          field: "TX ID:",
          linkText: "x.paras-near"
        },
        {
          field: "Link:",
          linkText: "http://ips.fleek.co..."
        },
      ],
    }
  },
  head() {
    const title = 'Documento detalle';
    return {
      title,
    }
  },
}
</script>

<style src="@/assets/styles/pages/document-transfer-complete.scss" lang="scss"></style>
