<template>
  <div>
    <div @click="$router.push('/catalog')" class="back-btn">
      <v-icon class="ml-0">chevron_left</v-icon>назад
    </div>
    <h1 class="display-1">Схемы посадки</h1>
    <v-divider class="mt-2 mb-8"></v-divider>

    <!-- landing_schema creating dialog -->
    <v-dialog
      v-model="landing_schemaDialog"
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
          @click="openLanding_schema()"
        >
          + Добавить схему посадки
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <h1 class="display-1" v-if="landing_schemas.id">Редактирование схемы посадки</h1>
          <h1 class="display-1" v-else>Новая схема посадки</h1>
        </v-card-title>
        <v-divider class="mb-8"></v-divider>

        <v-card-text class="pb-0">
          <v-text-field label="Название" outlined v-model="landing_schema.name"></v-text-field>
          <v-textarea label="Описание" outlined v-model="landing_schema.description"></v-textarea>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <div v-if="landing_schema.id">
            <v-btn depressed x-large color="success" @click="updateLanding_schema" class="mr-3">Обновить схему</v-btn>
            <v-btn depressed x-large color="light-grey" @click="closeLanding_schema" class="mr-3">Закрыть</v-btn>
          </div>
          <div v-else>
            <v-btn depressed x-large color="success" @click="createLanding_schema" class="mr-3">Создать схему</v-btn>
            <v-btn depressed x-large color="light-grey" @click="closeLanding_schema" class="mr-3">Закрыть</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- / landing_schema creating dialog -->

    <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
    <v-container class="tree-box" fluid>
      <v-row class="tree-header">
        <v-col cols="4">
          Название
        </v-col>
        <v-col cols="7">
          Описание
        </v-col>
      </v-row> 

      <v-row class="tree-row" v-for="item in landing_schemas" :key="item.id">
        <v-col cols="4">
          {{ item.name }}
        </v-col>
        <v-col cols="7">
          {{ item.description }}
        </v-col>
        <v-col cols="1" class="text-right">
          <div class="actions">
            <v-icon
              small
              class="mr-2"
              @click="openLanding_schema(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteLanding_schema(item)"
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
        @input="getLanding_schemas()"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'landing_schemas',
  data() {
    return {
      landing_schemaDialog: false
    }
  },
  methods: {
    getLanding_schemas() {
      this.$store.dispatch('getLanding_schemas')
    },
    createLanding_schema () {
      this.landing_schemaDialog = false
      this.$store.dispatch('createLanding_schema')
    },
    updateLanding_schema () {
      this.landing_schemaDialog = false
      this.$store.dispatch('updateLanding_schema')
    },
    openLanding_schema (item) {
      this.landing_schemaDialog = true
      if (item.id) {
        this.$store.commit('setLanding_schema', item)
      } else {
        this.$store.commit('setLanding_schema', {})
      }
    },
    deleteLanding_schema (item) {
      this.landing_schemaDialog = false
      confirm('Вы уверены что хотите удалить тип сада? Вернуть ее уже будет нельзя!') && this.$store.dispatch('deleteLanding_schema', item)
    },
    closeLanding_schema () {
      this.landing_schemaDialog = false
    },
  },
  computed: {
    landing_schemas () {
      return this.$store.getters.landing_schemas.data
    },
    landing_schema () {
      return this.$store.getters.landing_schema
    },
    paginator() {
      return this.$store.getters.landing_schemas.paginator
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  created() {
    this.getLanding_schemas()
  },
  watch: {
  }
}
</script>

<style lang="scss" scoped>
</style>
