<template>
  <div>
    <div class="folder_meta">
      <h1 class="display-1">Показатли исследований</h1>
      <v-divider class="mt-2 mb-8"></v-divider>
    </div>

    <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
    <v-container class="tree-box" fluid>
      <v-row
        class="tree-row tree-folders"
        v-for="folder in indicatorsGroups"
        :key="folder.id"
      >
        <v-col cols="12">
          <span class="folder-name" @click="$router.push('/indicators/' + folder.id)">
            <v-icon color="blue">folder</v-icon>
            {{ folder.name }}
          </span>
        </v-col>
      </v-row>
    </v-container>
    <div class="text-left mt-4">
      <v-pagination
        depressed
        v-model="paginator.current_pages"
        :length="paginator.total_pages"
        @input="getIndicatorsGroups()"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndicatorsGroups",
  data() {
    return {
    };
  },
  methods: {
    getIndicatorsGroups() {
      this.$store.dispatch('getIndicatorsGroups')
    },
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    indicatorsGroups () {
      return this.$store.getters.indicatorsGroups.data
    },
    paginator() {
      return this.$store.getters.indicatorsGroups.paginator;
    }
  },
  created() {
    this.getIndicatorsGroups()
  },
  watch: {
  },
};
</script>

<style lang="scss">
</style>
