<template>
  <div>
    <v-row>
      <v-col>
        <h1 class="display-1">Документы</h1>
      </v-col>
      <v-col class="text-right">
        <newAcceptance/>
      </v-col>
    </v-row>
    <v-divider class="mt-2 mb-8"></v-divider>

    <v-treeview
      v-model="tree"
      :open="initiallyOpen"
      :items="documents"
      activatable
      item-key="uuid"
      item-text="uuid"
      open-on-click
    >
      <template v-slot:label="{ item, open }">
        <div v-if="item.acceptance_date" class="folder">
          <v-row>
            <v-col cols="2">
              <v-icon class="mr-2">{{ open ? 'mdi-folder-open' : 'mdi-folder' }}</v-icon>
              <router-link :to="'/acceptance/' + item.id">{{ item.uuid }}</router-link>
            </v-col>
            <v-col cols="5">{{ item.acceptance_date | moment('DD.MM.YYYY') }}</v-col>
            <v-col cols="5">{{ item.contractor }}</v-col>
          </v-row>
        </div>
        <div v-else class="item">
          <v-row>
            <v-col cols="2">
              <v-icon class="mr-2">mdi-file-document-outline</v-icon>
              <router-link :to="'/research/' + item.id">{{ item.uuid }}</router-link>
            </v-col>
            <v-col cols="5">{{ item.created_at | moment('DD.MM.YYYY') }}</v-col>
            <v-col cols="5">{{ item.state }}</v-col>
          </v-row>
        </div>
      </template>
    </v-treeview>

    <v-divider class="mt-2 mb-8"></v-divider>

    <div class="text-left mt-4">
      <v-pagination
        depressed
        v-model="paginator.current_pages"
        :length="paginator.total_pages"
        @input="getProducts()"
      ></v-pagination>
    </div>

  </div>
</template>

<script>
import newAcceptance from '@/components/newAcceptance'
export default {
  name: 'Documents',
  components: {
    newAcceptance
  },

  data() {
    return {
      initiallyOpen: ['public'],
      tree: [],
    }
  },
  methods: {
  },
  computed: {
    documents () {
      return this.$store.getters.documents.data
    },
    paginator() {
      return this.$store.getters.products.paginator
    },
    researchStatuses() {
      return this.$store.getters.researchStatuses
    },
    loading() {
      return this.$store.getters.loading
    }
  },
  created () {
    this.$store.dispatch('getDocuments')
  },
  watch: {
    documents () {
      this.documents.forEach(acceptance => {
        if (acceptance.children) {
          acceptance.children.forEach(research => {
            this.researchStatuses.forEach(status => {
              if (research.state == status.value) {
                research.state = status.name
              }
            })
          }) 
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .v-treeview > .v-treeview-node:nth-child(2n-1) {
    & > .v-treeview-node__root {
      background: #F5F5F5;
    }
  }
  .v-treeview {
    a {
      color: #000000;
    }
  }
</style>
