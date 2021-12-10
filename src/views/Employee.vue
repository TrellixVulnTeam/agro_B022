<template>
  <div>
    <div @click="$router.back()" class="back-btn">
      <v-icon class="ml-0">chevron_left</v-icon>назад
    </div>
    <h1 class="display-1">Employee</h1>
    <v-divider class="mt-2 mb-8"></v-divider>

    <div class="contractor-info">
      <v-row>
        <v-col>
          <h3>ww</h3>
          <v-text-field v-model="employee.name" placeholder=" название"></v-text-field>

          <v-btn depressed color="success" @click="updateEmployee" class="mr-3">Обновить</v-btn>
          <v-btn depressed color="error" @click="deleteEmployee" class="mr-3">Удалить</v-btn>

        </v-col>

      </v-row>
    </div>


  </div>
</template>

<script>
export default {
  name: 'Employee',
  props: ['id'],
  data() {
    return {
    }
  },
  methods: {
    updateEmployee() {
      this.$store.dispatch('updateEmployee')
    },
    deleteEmployee() {
      this.$store.dispatch('deleteEmployee')
    }
  },
  computed: {
    employee() {
      return this.$store.getters.employee
    }
  },
  created () {
    this.$store.dispatch('getEmployee', this.id)
  }
}
</script>

<style scoped lang="scss">
</style>
