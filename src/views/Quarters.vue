<template>
  <div>
    <div @click="$router.back()" class="back-btn">
      <v-icon class="ml-0">chevron_left</v-icon>назад
    </div>

    <v-row>
      <v-col cols="8">
        <h1 class="display-1">Сад</h1>
      </v-col>
      <v-col cols="4" class="text-right">
        <!-- Quarter creating dialog -->
        <v-dialog
          v-model="quarterDialog"
          persistent
          max-width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              depressed
              color="light-grey"
              v-bind="attrs"
              v-on="on"
            >
              + Добавить квартал
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <h1 class="display-1">Новый квартал</h1>
            </v-card-title>
            <v-divider class="mb-4"></v-divider>

            <v-card-text class="pb-0">
              <v-text-field label="Наименование" outlined v-model="quarter.name"></v-text-field>
            </v-card-text>
            <v-card-actions class="pa-4">

            <v-spacer></v-spacer>
            <v-btn depressed color="light-grey" @click="closeQuarter" class="mr-3">Закрыть</v-btn>
            <v-btn depressed color="light-grey" @click="createQuarter" class="mr-3">Создать</v-btn>
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
          <v-text-field label="Наименование" outlined v-model="block.name"></v-text-field>
          <v-select
            :items="landingSchemas.data"
            v-model.number="block.landing_schemas_id"
            outlined
            label="Схема посадки(м)"
            item-text="name"
            item-value="id"
          ></v-select>
          <v-textarea label="Описание" outlined v-model="block.description"></v-textarea>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn depressed color="light-grey" @click="closeBlock" class="mr-3">Закрыть</v-btn>
          <v-btn depressed color="light-grey" @click="createBlock" class="mr-3">Создать</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- / Block creating dialog -->


    <v-row class="tree-row mb-4" v-for="quarter in quarters" :key="quarter.id">
      <v-col cols="10">
        <span class="headline mr-4">{{ quarter.name }}</span>
        <v-btn depressed color="light-grey" @click="openBlockDialog(quarter.id)">+ Добавить блок</v-btn>
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
const blocks = () => import('@/components/blocks')
export default {
  name: 'Quarters',
  components: {
    blocks
  },
  data() {
    return {
      blockDialog: false,
      quarterDialog: false,
      quarter: {
        name: '',
        garden_id: 0
      }
    }
  },
  props: [ 'garden_id' ],
  methods: {
    getQuarters(garden_id) {
      this.$store.dispatch('getQuarters', garden_id)
    },
    editQuarter(quarter) {
      this.$router.push('/quarter/' + quarter.id)
    },
    deleteQuarter(quarter) {
      this.$store.dispatch('deleteQuarter', quarter)
    },
    createQuarter () {
      this.quarterDialog = false
      this.quarter.garden_id = parseInt(this.garden_id)
      this.$store.dispatch('createQuarter', this.quarter)
    },
    closeQuarter () {
      this.quarterDialog = false
      this.quarter.name = ''
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
    quarters_paginator() {
      return this.$store.getters.quarters.paginator
    },
    block () {
      return this.$store.getters.block
    },
    landingSchemas () {
      return this.$store.getters.landingSchemas
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  created() {
    this.getQuarters(this.garden_id)
    this.getLandingSchemas()
  },
  watch:{
  }
}
</script>

<style lang="scss">
</style>
