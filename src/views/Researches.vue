<template>
  <div>
    <div @click="$router.back()" class="back-btn">
      <v-icon class="ml-0">chevron_left</v-icon>назад
    </div>
    <h1 class="display-1">Исследования</h1>
    <v-divider class="mt-2 mb-4"></v-divider>

    <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
    <v-container class="tree-box" fluid>
      <v-row class="tree-header">
        <v-col cols="3">
          Дата
        </v-col>
        <v-col cols="2">
          Приемка
        </v-col>
        <v-col cols="4">
          Количество
        </v-col>
        <v-col cols="2">
          Статус
        </v-col>
        <v-col cols="1">
        </v-col>
      </v-row> 

      <v-row class="tree-row tree-folders" v-for="item in researches" :key="item.id" @click="goToResearch(item.id)">
        <v-col cols="3">
          {{ item.research_date | moment('DD.MM.YYYY в hh:mm') }}
        </v-col>
        <v-col cols="2">
          {{ item.acceptance_id }}
        </v-col>
        <v-col cols="4">
          {{ item.quantity }}
        </v-col>
        <v-col cols="2">
          {{ item.status }}
        </v-col>
        <v-col cols="1" class="text-right actions">
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
        @input="getResearches()"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Researches',
  data() {
    return {
      acceptanceDialog: false
    }
  },
  methods: {
    getResearches() {
      this.$store.dispatch('getResearches')
    },
    goToResearch (id) {
      this.$router.push('/research/' + id)
    }
  },
  computed: {
    researches() {
      return this.$store.getters.researches.data
    },
    paginator() {
      return this.$store.getters.researches.paginator
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  created() {
    this.getResearches()
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
