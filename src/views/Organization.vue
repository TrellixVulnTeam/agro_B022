<template>
  <div>
    <h1 class="display-1">Организация</h1>
    <v-divider class="mt-2 mb-8"></v-divider>
    <v-row>
      <v-col cols="3">
        <v-card class="mx-auto" @click="$router.push('/organizationinfo')">
          <v-img
            src="/images/org-item.png"
          >
            <!-- <v-card-title>Title</v-card-title> -->
          </v-img>
          <v-card-text class="text--primary">
            <div>Сведения об организации</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="mx-auto" @click="$router.push('/gardens')">
          <v-img
            src="/images/org-item.png"
          >
            <!-- <v-card-title>Title</v-card-title> -->
          </v-img>
          <v-card-text class="text--primary">
            <div>Структура сада</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="mx-auto" @click="$router.push('#')">
          <v-img
            src="/images/org-item.png"
          >
            <!-- <v-card-title>Title</v-card-title> -->
          </v-img>
          <v-card-text class="text--primary">
            <div>Склады</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="mx-auto" @click="$router.push('/employees')">
          <v-img
            src="/images/org-item.png"
          >
            <!-- <v-card-title>Title</v-card-title> -->
          </v-img>
          <v-card-text class="text--primary">
            <div>Сотрудники/пользователи</div>
          </v-card-text>
        </v-card>
      </v-col>

    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Organization',
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
</style>
