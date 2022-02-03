<template>
  <div>
    <div @click="$router.push('/catalog')" class="back-btn">
      <v-icon class="ml-0">chevron_left</v-icon>назад
    </div>
    <v-row>
      <v-col>
        <h1 class="display-1">Контрагенты</h1>
      </v-col>
      <v-col class="text-right">
        <v-btn
          depressed
          color="light-grey"
          class="mb-4"
          @click="openContractorDialog"
        >
          + Добавить контрагента
        </v-btn>
      </v-col>
    </v-row>
    <v-divider class="mt-2 mb-5"></v-divider>

    <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
    <v-container class="tree-box" fluid>
      <v-row class="tree-header">
        <v-col cols="1">
          ID
        </v-col>
        <v-col cols="11">
          Название
        </v-col>
      </v-row>
      <v-row class="tree-row tree-folders" v-for="item in contractors" :key="item.id" @click="$router.push('/contractor/' + item.id)">
        <v-col cols="1">
          {{ item.id }}
        </v-col>
        <v-col cols="11">
          {{ item.account_name }}
        </v-col>
      </v-row>
    </v-container>
    <div class="text-left mt-4">
      <v-pagination
        depressed
        v-model="paginator.current_pages"
        :length="paginator.total_pages"
        @input="getContractors()"
      ></v-pagination>
    </div>

    <v-dialog
      v-model="contractorDialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5"><h1 class="display-1">Новый контрагент</h1></span>
        </v-card-title>
        <v-divider class="mb-8"></v-divider>
        <v-card-text class="pb-0">
          <v-text-field label="Наименование" outlined v-model="contractor.account_name"></v-text-field>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn depressed color="light-grey" @click="closeContractorDialog" class="mr-3">Закрыть</v-btn>
          <v-btn depressed color="success" @click="createContractor" class="mr-3">Создать</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
export default {
  name: 'Contractors',
  components: {
  },
  data() {
    return {
      contractorDialog: false,
    }
  },
  methods: {
    getContractors() {
      this.$store.dispatch('getContractors')
    },
    openContractorDialog() {
      this.contractorDialog = true;
    },
    closeContractorDialog() {
      this.contractorDialog = false;
    },
    createContractor() {
      this.$store.dispatch('createContractor')
    }
  },
  computed: {
    contractors() {
      return this.$store.getters.contractors.data
    },
    contractor() {
      return this.$store.getters.contractor
    },
    paginator() {
      return this.$store.getters.contractors.paginator
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  created() {
    this.getContractors()
  },
  watch:{
  }
}
</script>

<style lang="scss">
  .tree-box {
    .row {
      cursor: pointer;
    }
  }
</style>
