<template>
  <div>
    <div @click="$router.back()" class="back-btn">
      <v-icon class="ml-0">chevron_left</v-icon>назад
    </div>
    <h1 class="display-1">Подвои</h1>
    <v-divider class="mt-2 mb-8"></v-divider>

    <!-- rootstock creating dialog -->
    <v-dialog
      v-model="rootstockDialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          depressed
          color="light-grey"
          v-bind="attrs"
          v-on="on"
          class="mb-4"
          @click="openRootstock()"
        >
          + Добавить rootstock
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <h1 class="display-1" v-if="rootstocks.id">Редактирование подвоя</h1>
          <h1 class="display-1" v-else>Новый подвой</h1>
        </v-card-title>
        <v-divider class="mb-8"></v-divider>

        <v-card-text class="pb-0">
          <v-text-field label="Название" outlined v-model="rootstock.name"></v-text-field>
          <v-text-field label="Описание" outlined v-model="rootstock.description"></v-text-field>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <div v-if="rootstock.id">
            <v-btn depressed x-large color="success" @click="updateRootstock" class="mr-3">Обновить подвой</v-btn>
            <v-btn depressed x-large color="light-grey" @click="closeRootstock" class="mr-3">Закрыть</v-btn>
          </div>
          <div v-else>
            <v-btn depressed x-large color="success" @click="createRootstock" class="mr-3">Создать подвой</v-btn>
            <v-btn depressed x-large color="light-grey" @click="closeRootstock" class="mr-3">Закрыть</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- / rootstock creating dialog -->

    <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
    <v-container class="tree-box" fluid>
      <v-row class="tree-header">
        <v-col cols="2">
          Название
        </v-col>
        <v-col cols="9">
          Описание
        </v-col>
      </v-row> 

      <v-row class="tree-row" v-for="item in rootstocks" :key="item.id">
        <v-col cols="2">
          {{ item.name }}
        </v-col>
        <v-col cols="9">
          {{ item.description }}
        </v-col>
        <v-col cols="1" class="text-right">
          <div class="actions">
            <v-icon
              small
              class="mr-2"
              @click="openRootstock(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteRootstock(item)"
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
        @input="getRootstocks()"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rootstocks',
  data() {
    return {
      rootstockDialog: false
    }
  },
  methods: {
    getRootstocks() {
      this.$store.dispatch('getRootstocks')
    },
    createRootstock () {
      this.rootstockDialog = false
      this.$store.dispatch('createRootstock')
    },
    updateRootstock () {
      this.rootstockDialog = false
      this.$store.dispatch('updateRootstock')
    },
    openRootstock (item) {
      this.rootstockDialog = true
      if (item.id) {
        this.$store.commit('setRootstock', item)
      } else {
        this.$store.commit('setRootstock', {})
      }
    },
    deleteRootstock (item) {
      this.rootstockDialog = false
      confirm('Вы уверены что хотите удалить тип сада? Вернуть ее уже будет нельзя!') && this.$store.dispatch('deleteRootstock', item)
    },
    closeRootstock () {
      this.rootstockDialog = false
    },
  },
  computed: {
    rootstocks () {
      return this.$store.getters.rootstocks.data
    },
    rootstock () {
      return this.$store.getters.rootstock
    },
    paginator() {
      return this.$store.getters.rootstocks.paginator
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  created() {
    this.getRootstocks()
  },
  watch: {
  }
}
</script>

<style lang="scss" scoped>
</style>
