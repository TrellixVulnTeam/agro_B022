<template>
  <div>
    <h1 class="display-1">Общий справочник</h1>
    <v-divider class="mt-2 mb-8"></v-divider>

    <v-row>
      <v-col cols="3">
        <v-card class="mx-auto" @click="$router.push('/researches')">
          <v-img
            src="/images/catalog-item.png"
          >
            <!-- <v-card-title>Title</v-card-title> -->
          </v-img>
          <v-card-text class="text--primary">
            <div>Акты-оценки качества</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="mx-auto" @click="$router.push('/contractors')">
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
        <v-card class="mx-auto" @click="$router.push('/garden_types')">
          <v-img
            src="/images/catalog-item.png"
          >
            <!-- <v-card-title>Title</v-card-title> -->
          </v-img>
          <v-card-text class="text--primary">
            <div>Типы садов</div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="3">
        <v-card class="mx-auto" @click="$router.push('/landing_schemas')">
          <v-img
            src="/images/catalog-item.png"
          >
            <!-- <v-card-title>Title</v-card-title> -->
          </v-img>
          <v-card-text class="text--primary">
            <div>Схема посадки</div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="3">
        <v-card class="mx-auto" @click="$router.push('/rootstocks')">
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
        <v-card class="mx-auto" @click="$router.push('/indicators')">
          <v-img
            src="/images/catalog-item.png"
          >
            <!-- <v-card-title>Title</v-card-title> -->
          </v-img>
          <v-card-text class="text--primary">
            <div>Показателей исследований</div>
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
