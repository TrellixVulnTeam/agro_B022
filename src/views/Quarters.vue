<template>
  <div>
    <div @click="$router.back()" class="back-btn">
      <v-icon class="ml-0">chevron_left</v-icon>назад
    </div>

    <v-row>
      <v-col cols="8">
        <h1 class="display-1">{{ garden.name }}</h1>
      </v-col>
      <v-col cols="4" class="text-right">
        <!-- Quarter creating dialog -->
        <v-btn
          depressed
          color="light-grey"
          @click="openQuarter(null)"
        >
          + Добавить квартал
        </v-btn>
        <v-dialog
          v-model="quarterDialog"
          persistent
          max-width="600px"
        >
          <v-card>
            <v-card-title>
              <h1 class="display-1" v-if="quarter.id">Редактировать квартал</h1>
              <h1 class="display-1" v-else>Новый квартал</h1>
            </v-card-title>
            <v-divider class="mb-4"></v-divider>

            <v-card-text class="pb-0">
              <v-text-field label="Наименование" outlined v-model="quarter.name"></v-text-field>
            </v-card-text>

            <v-card-actions class="pa-4">
            <v-spacer></v-spacer>
              <div v-if="quarter.id">
                <v-btn depressed x-large color="light-grey" @click="closeQuarter" class="mr-3">Закрыть</v-btn>
                <v-btn depressed x-large color="success" @click="updateQuarter" class="mr-3">Обновить</v-btn>
              </div>
              <div v-else>
                <v-btn depressed color="light-grey" @click="closeQuarter" class="mr-3">Закрыть</v-btn>
                <v-btn depressed color="success" @click="createQuarter" class="mr-3">Создать</v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- / Quarter creating dialog -->
      </v-col>
    </v-row>

    <v-divider class="mt-2 mb-8"></v-divider>

    <!-- Block creating dialog -->
    <v-dialog
      v-model="blockDialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5"><h1 class="display-1">Новый блок</h1></span>
        </v-card-title>
        <v-divider class="mb-4"></v-divider>

        <v-card-text class="pb-0">
          <!-- <v-text-field label="Наименование" outlined v-model="block.block_name"></v-text-field> -->
          <v-text-field label="Размер" outlined v-model.number="block.block_size"></v-text-field>
          <!-- <v-text-field label="Количество деревьев" outlined v-model.number="block.block_tree_count"></v-text-field> -->
          <!-- <productSelector @returnItem="setProduct" class="mb-7" /> -->
          <!-- <v-select
            :items="landingSchemas.data"
            v-model.number="block.block_landing_schemas_id"
            outlined
            label="Схема посадки(м)"
            item-text="name"
            item-value="id"
          ></v-select> -->
          <v-textarea label="Описание" outlined v-model="block.block_description"></v-textarea>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn depressed color="light-grey" @click="closeBlock" class="mr-3">Закрыть</v-btn>
          <v-btn depressed color="success" @click="createBlock" class="mr-3">Создать</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- / Block creating dialog -->

    <v-row class="tree-row mb-4" v-for="quarter in quarters" :key="quarter.id">
      <v-col cols="12">
        <v-row>
          <v-col cols="7">
            <span class="headline">{{ quarter.name }}</span>
            <v-btn depressed color="light-grey" @click="openBlockDialog(quarter.id)" class="ml-4">+ Добавить блок</v-btn>
          </v-col>
          <v-col cols="5" class="text-right">
            <v-btn depressed color="light-grey" @click="openQuarter(quarter)" class="mr-4">Редактировать квартал</v-btn>
            <v-btn depressed color="light-grey" @click="deleteQuarter(quarter)">Удалить квартал</v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
        <!-- Component with table of blocks -->
        <blocks :quarter_id="quarter.id"></blocks>
        <!-- / Component with table of blocks -->
      </v-col>
    </v-row>

  </div>
</template>

<script>
// import productSelector from '@/components/selectors/productSelector'
const blocks = () => import('@/components/blocks')
export default {
  name: 'Quarters',
  components: {
    blocks, 
    // productSelector
  },
  data() {
    return {
      blockDialog: false,
      quarterDialog: false
    }
  },
  props: [ 'garden_id' ],
  methods: {
    setProduct (payload) {
      this.block.product_id = payload.id
    },
    getQuarters(garden_id) {
      this.$store.dispatch('getQuarters', garden_id)
    },
    getGarden(garden_id) {
      this.$store.dispatch('getGarden', garden_id)
    },
    editQuarter(quarter) {
      this.$router.push('/quarter/' + quarter.id)
    },
    deleteQuarter(quarter) {
      confirm('Вы уверены что хотите удалить квартал? Вернуть его уже будет нельзя!') && this.$store.dispatch('deleteQuarter', quarter)
    },
    createQuarter () {
      this.quarterDialog = false
      this.quarter.garden_id = parseInt(this.garden_id)
      this.$store.dispatch('createQuarter', this.quarter)
    },
    updateQuarter () {
      this.quarterDialog = false
      this.$store.dispatch('updateQuarter')
    },
    openQuarter (quarter) {
      this.quarterDialog = true
      if (quarter == null) {
        this.$store.commit('setQuarter', {})
      } else {
        this.$store.commit('setQuarter', quarter)
      }
    },
    closeQuarter () {
      this.quarterDialog = false
    },
    openBlockDialog (quarter_id) {
      this.blockDialog = true
      this.$store.commit('setBlockParent', quarter_id)
    },
    createBlock () {
      this.blockDialog = false
      this.$store.dispatch('createBlock')
    },
    closeBlock () {
      this.blockDialog = false
      this.$store.commit('setBlock', {})
    },
    getLandingSchemas() {
      this.$store.dispatch('getLandingSchemas')
    }
  },
  computed: {
    quarters() {
      return this.$store.getters.quarters.data
    },
    quarter() {
      return this.$store.getters.quarter
    },
    quarters_paginator() {
      return this.$store.getters.quarters.paginator
    },
    block () {
      return this.$store.getters.block
    },
    landingSchemas () {
      return this.$store.getters.landingSchemas
    },
    garden() {
      return this.$store.getters.garden
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  created() {
    this.getQuarters(this.garden_id)
    this.getGarden(this.garden_id)
    this.getLandingSchemas()
  },
  watch:{
  }
}
</script>

<style lang="scss">
</style>
