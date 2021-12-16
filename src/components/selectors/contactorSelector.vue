<template>
  <div>

    <div v-if="account_name" class="catalog-selector" @click="openContractorsDialog">
      <div class="catalog-selector-label">Контрагент</div>
      {{account_name}}
    </div>
    <div v-else>
      <v-btn
        block
        depressed
        color="light-grey"
        class="mb-4"
        x-large
        @click="openContractorsDialog"
      >
        Выбрать контрагента
      </v-btn>
    </div>    

    <v-dialog
      v-model="contractorsDialog"
      persistent
      max-width="1200px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5"><h1 class="display-1">Выбор контрагента</h1></span>
        </v-card-title>
        <v-divider class="mb-8"></v-divider>
        <v-card-text class="pb-0">

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
            <v-row class="tree-row tree-folders" v-for="item in contractors" :key="item.id" @click="selectItem(item)">
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

        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn depressed color="light-grey" @click="closeContractorDialog" class="mr-3">Закрыть</v-btn>
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
      account_name: '',
      contractorsDialog: false,
    }
  },
  methods: {
    getContractors() {
      this.$store.dispatch('getContractors')
    },
    openContractorsDialog() {
      this.contractorsDialog = true;
    },
    selectItem (item) {
      this.account_name = item.account_name
      this.$emit('returnItem', item)
      this.contractorsDialog = false;
    },
    closeContractorDialog() {
      this.contractorsDialog = false;
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
  .catalog-selector {
    cursor: pointer;
    position: relative;
    border-radius: 4px;
    line-height: 38px;
    padding: 8px 12px 8px;
    border: 1px solid rgba(0, 0, 0, 0.42);

    .catalog-selector-label {
    position: absolute;
    left: 10px;
    top: -11px;
    padding: 0 2px;
    color: rgba(0, 0, 0, 0.6);
    line-height: 20px;
    font-size: 12px;
    background: white;
    }
  }
</style>
