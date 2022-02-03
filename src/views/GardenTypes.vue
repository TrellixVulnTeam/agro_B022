<template>
  <div>
    <div @click="$router.push('/catalog')" class="back-btn">
      <v-icon class="ml-0">chevron_left</v-icon>назад
    </div>
    <h1 class="display-1">Типы садов</h1>
    <v-divider class="mt-2 mb-8"></v-divider>

    <!-- garden_type creating dialog -->
    <v-dialog
      v-model="garden_typeDialog"
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
          @click="openGarden_type"
        >
          + Добавить тип сада
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <h1 class="display-1" v-if="garden_type.id">Редактирование типа сада</h1>
          <h1 class="display-1" v-else>Новый тип сада</h1>
        </v-card-title>
        <v-divider class="mb-8"></v-divider>

        <v-card-text class="pb-0">
          <v-text-field label="Название" outlined v-model="garden_type.name"></v-text-field>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <div v-if="garden_type.id">
            <v-btn depressed x-large color="success" @click="updateGarden_type" class="mr-3">Обновить тип сада</v-btn>
            <v-btn depressed x-large color="light-grey" @click="closeGarden_type" class="mr-3">Закрыть</v-btn>
          </div>
          <div v-else>
            <v-btn depressed x-large color="success" @click="createGarden_type" class="mr-3">Создать тип сада</v-btn>
            <v-btn depressed x-large color="light-grey" @click="closeGarden_type" class="mr-3">Закрыть</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- / garden_type creating dialog -->

    <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
    <v-container class="tree-box" fluid>
      <v-row class="tree-header">
        <v-col cols="11">
          Название
        </v-col>
      </v-row> 

      <v-row class="tree-row" v-for="item in garden_types" :key="item.id">
        <v-col cols="11">
          {{ item.name }}
        </v-col>
        <v-col cols="1" class="text-right">
          <div class="actions">
            <v-icon
              small
              class="mr-2"
              @click="openGarden_type(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteGarden_type(item)"
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
        @input="getGarden_types()"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'garden_types',
  data() {
    return {
      garden_typeDialog: false
    }
  },
  methods: {
    getGarden_types() {
      this.$store.dispatch('getGarden_types')
    },
    createGarden_type () {
      this.garden_typeDialog = false
      this.$store.dispatch('createGarden_type')
    },
    updateGarden_type () {
      this.garden_typeDialog = false
      this.$store.dispatch('updateGarden_type')
    },
    openGarden_type (item) {
      this.garden_typeDialog = true
      if (item.id) {
        this.$store.commit('setGarden_type', item)
      } else {
        this.$store.commit('setGarden_type', {})
      }
    },
    deleteGarden_type (item) {
      this.garden_typeDialog = false
      confirm('Вы уверены что хотите удалить тип сада? Вернуть ее уже будет нельзя!') && this.$store.dispatch('deleteGarden_type', item)
    },
    closeGarden_type () {
      this.garden_typeDialog = false
    },
  },
  computed: {
    garden_types () {
      return this.$store.getters.garden_types.data
    },
    garden_type () {
      return this.$store.getters.garden_type
    },
    paginator() {
      return this.$store.getters.garden_types.paginator
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  created() {
    this.getGarden_types()
  },
  watch: {
  }
}
</script>

<style lang="scss" scoped>
</style>
