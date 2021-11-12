<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        depressed
        color="light-grey"
        class="mb-4"
        v-bind="attrs"
        v-on="on"
        @click="loadFolder"
      >
        + Добавить папку
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5" v-if="folder.id">{{folder.name}}</span>
        <span class="text-h5" v-else><h1 class="display-1">Новая папка</h1></span>
      </v-card-title>
      <v-divider class="mb-4"></v-divider>
      <v-card-text>
        <v-container>

          <v-row class="form-grid">

            <v-col cols="12">
              <v-text-field label="Наименование" outlined v-model="folder.folder_name"></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-select
                :items="folderModels"
                v-model="folder.model"
                outlined
                label="Модель папки"
                item-text="model_name"
              ></v-select>
            </v-col>
          </v-row>

        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <div v-if="folder.id">
          <v-btn depressed color="light-grey" @click="updateFolder" class="mr-3">Обновить</v-btn>
          <v-btn depressed color="light-grey" @click="dialog = false" class="mr-3">Закрыть</v-btn>
          <v-btn depressed color="light-red" @click="deleteFolder" class="">Удалить продукцию</v-btn>
        </div>
        <div v-else>
          <v-btn depressed color="light-grey" @click="createFolder" class="mr-3">Создать</v-btn>
          <v-btn depressed color="light-grey" @click="dialog = false" class="mr-3">Закрыть</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Folder',
  props: [
    'id',
    'parent_id'
  ],
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    updateFolder () {
      this.$store.dispatch('updateFolder')
    },
    createFolder () {
      this.$store.dispatch('createFolder')
    },
    deleteFolder () {
      this.$store.dispatch('deleteFolder')
    },
    loadFolder () {
      if (this.id) {
        this.$store.dispatch('getFolder', this.id)
      }
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    folder() {
      return this.$store.getters.folder
    },
    folderModels() {
      return this.$store.getters.folderModels
    }
  },
  mounted() {
    this.folder = this.parent_id
    this.$store.dispatch('getFolderModels')
  }
}
</script>

<style lang="scss">
  .form-grid {
    margin-bottom: 0px;
    .row {
      margin-top: 0;
    }
    .col {
      padding-top: 0;
      padding-bottom: 0;
    }
  }
</style>
