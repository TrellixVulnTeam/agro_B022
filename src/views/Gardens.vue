<template>
  <div>
    <div @click="$router.back()" class="back-btn">
      <v-icon class="ml-0">chevron_left</v-icon>назад
    </div>
    <h1 class="display-1">Сады</h1>
    <v-divider class="mt-2 mb-8"></v-divider>
    <v-btn @click="$router.push('/garden/new')" depressed color="light-grey" class="mb-4 mr-4">+ Добавить сад</v-btn>

    <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
    <v-container class="tree-box" fluid>
      <v-row class="tree-header">
        <v-col cols="3">
          Наименование
        </v-col>
        <v-col cols="2">

        </v-col>
        <v-col cols="4">

        </v-col>
        <v-col cols="2">

        </v-col>
        <v-col cols="1">
        </v-col>
      </v-row>

      <v-row class="tree-row tree-folders" v-for="item in items" :key="item.id">
        <v-col cols="3">
          <v-icon>mdi-file-outline</v-icon>
          {{ item.name }}
        </v-col>
        <v-col cols="2">

        </v-col>
        <v-col cols="4">
          {{ item.description.slice(0, 40) }}
        </v-col>
        <v-col cols="2">

        </v-col>
        <v-col cols="1" class="text-right">
          <div class="actions">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <div class="text-left mt-4">
      <v-pagination
        depressed
        v-model="paginator.current_pages"
        :length="paginator.total_pages"
        @input="getProducts()"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
// import { nameTheWrhsType } from '@/helpers/helpers.js'
export default {
  name: 'Gardens',
  data() {
    return {
    }
  },
  props: [ 'folder_id' ],
  methods: {
    getGardens(id) {
      this.$store.dispatch('getGardens', id)
    },
    editItem(item) {
      this.$router.push('/garden/' + item.id)
    },
    deleteItem(item) {
      this.$store.dispatch('deleteGarden', item)
    }
  },
  computed: {
    items() {
      return this.$store.getters.gardens.data
    },
    paginator() {
      return this.$store.getters.gardens.paginator
    },
    garden_types() {
      return this.$store.getters.garden_types.data
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  created() {
    this.getGardens(this.folder_id)
    this.$store.dispatch('getGarden_types')
  },
  watch:{
    // items() {
    //   this.items.forEach(wrh => {
    //     wrh.type = nameTheWrhsType(wrh, this.garden_types)
    //   })
    // },
    // $route() {
    //   this.getGardens(this.folder_id)
    // }
  }
}
</script>

<style lang="scss">
</style>
