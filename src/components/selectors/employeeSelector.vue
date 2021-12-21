<template>
  <div>

    <div v-if="title" class="catalog-selector" @click="openEmployeesDialog">
      <div class="catalog-selector-label">Сотрудник</div>
      {{title}}
    </div>
    <div v-else>
      <v-btn
        block
        depressed
        color="light-grey"
        class="mb-4"
        x-large
        @click="openEmployeesDialog"
      >
        Выбрать сотрудника
      </v-btn>
    </div>    

    <v-dialog
      v-model="employeesDialog"
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
          <v-row class="tree-row mb-4" v-for="dep in employeesByDepts" :key="dep.id">
            <v-col cols="10">
              <span class="headline mr-4">{{ dep.department }}</span>
            </v-col>
            <v-col cols="12">
              <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
              <!-- Component with table of Employees -->
              <departamentBlockForSelector :employees="dep.Employees" @sendItem="returnItem"></departamentBlockForSelector>
              <!-- / Component with table of Employees -->
            </v-col>
          </v-row>

        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn depressed color="light-grey" @click="closeEmployeesDialog" class="mr-3">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
const departamentBlockForSelector = () => import('@/components/selectors/departamentBlockForSelector')
export default {
  name: 'Empl',
  components: {
    departamentBlockForSelector
  },
  data() {
    return {
      employeesDialog: false,
      title: ''
    }
  },
  methods: {
    returnItem (item) {
      this.title = item.fio + ' (' + item.department + ')'
      this.$emit('returnItem', item)
      this.employeesDialog = false
    },
    getEmployeesByDepts() {
      this.$store.dispatch('getEmployeesByDepts')
    },
    openEmployeesDialog (department) {
      this.employeesDialog = true
      this.employee.department = department
    },
    closeEmployeesDialog () {
      this.employeesDialog = false
      this.$store.commit('setEmployees', {})
    },
  },
  computed: {
    employeesByDepts() {
      return this.$store.getters.employeesByDepts
    },
    employee() {
      return this.$store.getters.employee
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  created() {
    this.getEmployeesByDepts()
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
    color: #000;
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
