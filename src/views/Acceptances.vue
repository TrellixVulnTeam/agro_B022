<template>
  <div>
    <div @click="$router.back()" class="back-btn">
      <v-icon class="ml-0">chevron_left</v-icon>назад
    </div>
    <h1 class="display-1">Приемки</h1>
    <v-divider class="mt-2 mb-8"></v-divider>
<!-- 
    <v-dialog
      v-model="folderDialog"
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
        >
          + Добавить папку
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5" v-if="folder.id">Редактирование папки</span>
          <span class="text-h5" v-else><h1 class="display-1">Новая папка</h1></span>
        </v-card-title>
        <v-divider class="mb-4"></v-divider>
        <v-card-text class="pb-0">

          <v-text-field label="Наименование" outlined v-model="folder.folder_name"></v-text-field>

          <v-select
            v-if="!folder.id"
            :items="folderModels"
            v-model="folder.model"
            outlined
            label="Модель папки"
            item-text="model_name"
          ></v-select>

        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <div v-if="folder.id">
            <v-btn depressed color="light-grey" @click="updateFolder" class="mr-3">Обновить</v-btn>
            <v-btn depressed color="light-grey" @click="closeFolder" class="mr-3">Закрыть</v-btn>
          </div>
          <div v-else>
            <v-btn depressed color="light-grey" @click="createFolder" class="mr-3">Создать</v-btn>
            <v-btn depressed color="light-grey" @click="closeFolder" class="mr-3">Закрыть</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog> -->

    <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
    <v-container class="tree-box" fluid>
      <v-row class="tree-header">
        <v-col cols="2">
          Дата
        </v-col>
        <v-col cols="3">
          Работник
        </v-col>
        <v-col cols="1">
          Кол-во
        </v-col>
        <v-col cols="3">
          Контрагент
        </v-col>
        <v-col cols="2">
          Склад
        </v-col>
      </v-row> 

      <v-row class="tree-row tree-folders" v-for="item in acceptances" :key="item.id" @click="goToAcceptance(item.id)">
        <v-col cols="2">
          {{ item.acceptance_date | moment('DD.MM.YYYY в hh:mm') }}
        </v-col>
        <v-col cols="3">
          {{ item.employee_fio }}
        </v-col>
        <v-col cols="1">
          {{ item.quantity }}
        </v-col>
        <v-col cols="2">
          {{ item.contractor }}
        </v-col>
        <v-col cols="3">
          {{ item.warehouse_name }}
        </v-col>
        <v-col cols="1" class="text-right">
          <!-- <div class="actions">
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
          </div> -->
        </v-col>
      </v-row>
    </v-container>
    <div class="text-left mt-4">
      <v-pagination
        depressed
        v-model="paginator.current_pages"
        :length="paginator.total_pages"
        @input="getAcceptances()"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Acceptances',
  data() {
    return {
      acceptanceDialog: false
    }
  },
  methods: {
    getAcceptances() {
      this.$store.dispatch('getAcceptances')
    },
    goToAcceptance(id) {
      this.$router.push('/acceptance/' + id)
    }
  },
  computed: {
    acceptances() {
      return this.$store.getters.acceptances.data
    },
    paginator() {
      return this.$store.getters.acceptances.paginator
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  created() {
    this.getAcceptances()
  },
  watch:{
  }
}
</script>

<style lang="scss">
  .row {
    cursor: pointer;
  }
</style>
