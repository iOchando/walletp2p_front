<template>
  <div id="document-details">
    <Header style="margin-bottom: 115px;"></Header>
    

    <aside id="document-details-header" class="mb-6">
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

    <v-card class="btn-outlined">
      <h6>DESCRIPCIÓN</h6>
      <p class="mb-0">
        Bored Ape Yacht Club, NFT Monkey or BAYC for short, is a popular NFT project that has taken the cryptocurrency and digital art world by storm. Launched in April 2021, BAYC is a collection of 10,000 unique ape NFTs, each with its distinct item and characteristics. The project was created by a group of anonymous developers and has quickly become one of the most sought-after NFTs on the market.
      </p>
    </v-card>
    
    <v-card class="btn-outlined d-flex justify-space-between">
      <h6 class="mb-0">ROYALTY</h6>
      <h6 class="mb-0">1%</h6>
    </v-card>
    
    <v-card class="btn-outlined">
      <h6 class="mb-0">INFORMACIÓN DEL CONTRATO</h6>
      
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

    <v-btn class="btn" @click="$router.push({ path: '/document-transfer', query: { id: $route.query.id } })">
      TRANSFERIR
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
          field: "Dirección",
          linkText: "x.paras-near"
        },
        {
          field: "Enlace a la imagen",
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

<style src="@/assets/styles/pages/document-details.scss" lang="scss"></style>
