<template>
  <div>
    <div @click="$router.push('/catalog')" class="back-btn">
      <v-icon class="ml-0">chevron_left</v-icon>назад
    </div>
    <h1 class="display-1">Типы складов</h1>
    <v-divider class="mt-2 mb-8"></v-divider>

    <!-- warehouse_type creating dialog -->
    <v-dialog
      v-model="warehouse_typeDialog"
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
          @click="openWarehouse_type"
        >
          + Добавить тип склада
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <h1 class="display-1" v-if="warehouse_type.id">Редактирование типа склада</h1>
          <h1 class="display-1" v-else>Новый тип склада</h1>
        </v-card-title>
        <v-divider class="mb-8"></v-divider>

        <v-card-text class="pb-0">
          <v-text-field label="Название" outlined v-model="warehouse_type.name"></v-text-field>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <div v-if="warehouse_type.id">
            <v-btn depressed x-large color="success" @click="updateWarehouse_type" class="mr-3">Обновить тип склада</v-btn>
            <v-btn depressed x-large color="light-grey" @click="closeWarehouse_type" class="mr-3">Закрыть</v-btn>
          </div>
          <div v-else>
            <v-btn depressed x-large color="success" @click="createWarehouse_type" class="mr-3">Создать тип склада</v-btn>
            <v-btn depressed x-large color="light-grey" @click="closeWarehouse_type" class="mr-3">Закрыть</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- / warehouse_type creating dialog -->

    <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
    <v-container class="tree-box" fluid>
      <v-row class="tree-header">
        <v-col cols="11">
          Название
        </v-col>
      </v-row> 

      <v-row class="tree-row" v-for="item in warehouses_types" :key="item.id">
        <v-col cols="11">
          {{ item.name }}
        </v-col>
        <v-col cols="1" class="text-right">
          <div class="actions">
            <v-icon
              small
              class="mr-2"
              @click="openWarehouse_type(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteWarehouse_type(item)"
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
        @input="getWarehouses_types()"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'warehouse_types',
  data() {
    return {
      warehouse_typeDialog: false
    }
  },
  methods: {
    getWarehouses_types() {
      this.$store.dispatch('getWarehouses_types')
    },
    createWarehouse_type () {
      this.warehouse_typeDialog = false
      this.$store.dispatch('createWarehouse_type')
    },
    updateWarehouse_type () {
      this.warehouse_typeDialog = false
      this.$store.dispatch('updateWarehouse_type')
    },
    openWarehouse_type (item) {
      this.warehouse_typeDialog = true
      if (item.id) {
        this.$store.commit('setWarehouse_type', item)
      } else {
        this.$store.commit('setWarehouse_type', {})
      }
    },
    deleteWarehouse_type (item) {
      this.warehouse_typeDialog = false
      confirm('Вы уверены что хотите удалить тип склада? Вернуть ее уже будет нельзя!') && this.$store.dispatch('deleteWarehouse_type', item)
    },
    closeWarehouse_type () {
      this.warehouse_typeDialog = false
    },
  },
  computed: {
    warehouses_types () {
      return this.$store.getters.warehouses_types.data
    },
    warehouse_type () {
      return this.$store.getters.warehouse_type
    },
    paginator() {
      return this.$store.getters.warehouses_types.paginator
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  created() {
    this.getWarehouses_types()
  },
  watch: {
  }
}
</script>

<style lang="scss" scoped>
</style>
