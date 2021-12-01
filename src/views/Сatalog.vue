<template>
  <div>
    <h1 class="display-1">Общий справочник</h1>
    <v-divider class="mt-2 mb-8"></v-divider>

    <v-row>
      <v-col cols="3">
        <v-card class="mx-auto" @click="$router.push('#')">
          <v-img
            src="/images/catalog-item.png"
          >
            <!-- <v-card-title>Title</v-card-title> -->
          </v-img>
          <v-card-text class="text--primary">
            <div>Показатели исследований</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="mx-auto" @click="$router.push('#')">
          <v-img
            src="/images/catalog-item.png"
          >
            <!-- <v-card-title>Title</v-card-title> -->
          </v-img>
          <v-card-text class="text--primary">
            <div>Контрагенты</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="mx-auto" @click="$router.push('#')">
          <v-img
            src="/images/catalog-item.png"
          >
            <!-- <v-card-title>Title</v-card-title> -->
          </v-img>
          <v-card-text class="text--primary">
            <div>Сорта</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="mx-auto" @click="$router.push('#')">
          <v-img
            src="/images/catalog-item.png"
          >
            <!-- <v-card-title>Title</v-card-title> -->
          </v-img>
          <v-card-text class="text--primary">
            <div>Подвои</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="mx-auto" @click="$router.push('#')">
          <v-img
            src="/images/catalog-item.png"
          >
            <!-- <v-card-title>Title</v-card-title> -->
          </v-img>
          <v-card-text class="text--primary">
            <div>Типы продукции</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="mx-auto" @click="$router.push('/products')">
          <v-img
            src="/images/catalog-item.png"
          >
            <!-- <v-card-title>Title</v-card-title> -->
          </v-img>
          <v-card-text class="text--primary">
            <div>Продукция</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="mx-auto" @click="$router.push('#')">
          <v-img
            src="/images/catalog-item.png"
          >
            <!-- <v-card-title>Title</v-card-title> -->
          </v-img>
          <v-card-text class="text--primary">
            <div>Типы складов</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="mx-auto" @click="$router.push('#')">
          <v-img
            src="/images/catalog-item.png"
          >
            <!-- <v-card-title>Title</v-card-title> -->
          </v-img>
          <v-card-text class="text--primary">
            <div>Схемы посадки</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="mx-auto" @click="$router.push('#')">
          <v-img
            src="/images/catalog-item.png"
          >
            <!-- <v-card-title>Title</v-card-title> -->
          </v-img>
          <v-card-text class="text--primary">
            <div>Единицы измерения</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

  </div>
</template>

<script>
export default {
  name: 'Сatalog',
  data() {
    return {
    }
  },
  methods: {
  },
  computed: {
  },
  created () {
  }
}
</script>

<style scoped lang="scss">
  .v-image {
    background-color: #ededed;
  }

</style>
