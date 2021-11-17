<template>
  <div>
    <div @click="$router.back()" class="back-btn">
      <v-icon class="ml-0">chevron_left</v-icon>назад
    </div>
    <h1 class="display-1">Редактирование блока</h1>
    <v-divider class="mt-2 mb-8"></v-divider>

    <v-row class="form-grid">
      <v-col cols="7">
        <v-text-field label="Наименование" outlined v-model="block.name"></v-text-field>

        <v-textarea label="Описание" outlined v-model="block.description"></v-textarea>
      </v-col>

    </v-row>
    <v-btn x-large depressed color="light-grey" @click="updateBlock" class="mr-3">Обновить</v-btn>
    <v-btn x-large depressed color="light-red" @click="deleteBlock" class="">Удалить сад</v-btn>

  </div>
</template>

<script>
export default {
  name: 'Block',
  props: ['id'],
  components: {
  },
  data() {
    return {
    }
  },
  methods: {
    updateBlock () {
      this.$store.dispatch('updateBlock')
    },
    createBlock () {
      this.$store.dispatch('createBlock')
    },
    deleteBlock () {
      this.$store.dispatch('deleteBlock', this.block)
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    block() {
      return this.$store.getters.block
    }
  },
  created() {
  }
}
</script>

<style lang="scss">
</style>
