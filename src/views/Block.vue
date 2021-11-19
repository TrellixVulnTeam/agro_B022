<template>
  <div>
    <div @click="$router.back()" class="back-btn">
      <v-icon class="ml-0">chevron_left</v-icon>назад
    </div>
    <h1 class="display-1">Склады</h1>
    <v-divider class="mt-2 mb-4"></v-divider>
    <!-- <v-btn @click="$router.push('/row/new')" depressed color="light-grey" class="mb-4 mr-4">+ Добавить ряд</v-btn> -->
    <v-btn
      depressed
      color="light-grey"
      class="mb-4"
      @click="newRow"
    >
      + Добавить ряд
    </v-btn>

    <v-dialog
      v-model="rowDialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5" v-if="row.id">Редактирование ряда</span>
          <span class="text-h5" v-else><h1 class="display-1">Новый ряд</h1></span>
        </v-card-title>
        <v-divider class="mb-4"></v-divider>
        <v-card-text class="pb-0">

          <v-text-field label="Наименование" outlined v-model="row.name"></v-text-field>
          <v-text-field label="Количество деревьев" outlined v-model.number="row.trees_count"></v-text-field>

          <!-- <v-select
            :items="rootstocks"
            v-model="row.rootstock_id"
            outlined
            label="Подвои"
          ></v-select> -->

        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <div v-if="row.id">
            <v-btn depressed color="light-grey" @click="updateRow" class="mr-3">Обновить</v-btn>
            <v-btn depressed color="light-grey" @click="closeRow" class="mr-3">Закрыть</v-btn>
          </div>
          <div v-else>
            <v-btn depressed color="light-grey" @click="createRow" class="mr-3">Создать</v-btn>
            <v-btn depressed color="light-grey" @click="closeRow" class="mr-3">Закрыть</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
    <v-container class="tree-box" fluid>
      <v-row class="tree-header">
        <v-col cols="3">
          Наименование
        </v-col>
        <v-col cols="2">
          Количество деревьев
        </v-col>
        <v-col cols="4">
          
        </v-col>
        <v-col cols="2">

        </v-col>
        <v-col cols="1">
        </v-col>
      </v-row>

      <v-row class="tree-row" v-for="row in rows" :key="row.id">
        <v-col cols="3">
          {{ row.name }}
        </v-col>
        <v-col cols="2">
          {{ row.trees_count }}
        </v-col>
        <v-col cols="4">

        </v-col>
        <v-col cols="2">

        </v-col>
        <v-col cols="1" class="text-right">
          <div class="actions">
            <v-icon
              small
              class="mr-2"
              @click="editRow(row)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteRow(row)"
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
        @input="getRows()"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Block',
  props: ['id'],
  data() {
    return {
      rowDialog: false
    }
  },
  methods: {
    getRows () {
      this.$store.dispatch('getRows', this.id)
    },
    getBlock () {
      this.$store.dispatch('getBlock', this.id)
    },
    editRow (row) {
      this.rowDialog = true
      this.$store.dispatch('getRow', row.id)
      this.$store.commit('setRowBlock', this.id)
    },
    newRow () {
      this.rowDialog = true
      this.$store.commit('setRowBlock', this.id)
    },
    updateRow () {
      this.$store.dispatch('updateRow')
      this.rowDialog = false
    },
    createRow () {
      this.$store.dispatch('createRow')
      this.rowDialog = false
    },
    closeRow () {
      this.rowDialog = false
    },
    deleteRow (row) {
      this.$store.dispatch('deleteRow', row)
      this.rowDialog = false
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    block() {
      return this.$store.getters.block
    },
    row () {
      return this.$store.getters.row
    },
    rows () {
      return this.$store.getters.rows.data
    },
    paginator () {
      return this.$store.getters.rows.paginator
    }
  },
  created() {
    this.getBlock()
    this.getRows()
  }
}
</script>

<style lang="scss">
</style>
