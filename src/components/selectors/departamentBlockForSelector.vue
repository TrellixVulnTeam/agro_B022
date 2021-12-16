<template>
  <div class="blocks">

    <v-container class="tree-box" fluid>
      <v-row class="tree-header">
        <v-col cols="4">
          ФИО
        </v-col>
        <v-col cols="3">
          Телефон
        </v-col>
        <v-col cols="3">
          Email
        </v-col>
        <v-col cols="2">
          Должность
        </v-col>

      </v-row>
      <v-row class="tree-row" v-for="employee in employees" :key="employee.id" @click="selectItem(employee)">
        <v-col cols="4">
          <span class="folder-name">
            {{ employee.fio }}
          </span>
        </v-col>
        <v-col cols="3">
          {{ employee.phone }}
        </v-col>
        <v-col cols="3">
          {{ employee.email }}
        </v-col>
        <v-col cols="2">
          {{ employee.position }}
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  name: 'EmployeesBlock',
  data() {
    return {
    }
  },
  props: [ 'employees' ],
  methods: {
    selectItem (item) {
      this.$emit('sendItem', item)
      this.contractorsDialog = false;
    },
  },
  computed: {
    employee () {
      return this.$store.getters.employee
    },
    employeesByDepts() {
      return this.$store.getters.employeesByDepts
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  created() {
  },
  watch:{
  }
}
</script>

<style lang="scss">
</style>
