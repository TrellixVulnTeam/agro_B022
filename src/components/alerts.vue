<template>
  <div>

    <template v-if="error">
      <v-snackbar
        flat
        right
        top
        :multi-line="true"
        :timeout=3000
        color="error"
        @input="closeError"
        :value="true"
      >
        <template v-slot:action="{ attrs }">
          <v-btn
            color="white"
            class="mr-1"
            text
            v-bind="attrs"
            @click.native="closeError"
          >
            Ok
          </v-btn>
        </template>
        {{ error }}
      </v-snackbar>
    </template>
    <template v-if="message">
      <v-snackbar
        flat
        right
        top
        :multi-line="true"
        :timeout=3000
        color="success"
        @input="closeMessage"
        :value="true"
      >
        {{ message }}
        <template v-slot:action="{ attrs }">
          <v-btn
            color="white"
            class="mr-1"
            text
            v-bind="attrs"
            @click.native="closeMessage"
          >
            Ok
          </v-btn>
        </template>
      </v-snackbar>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Alerts',
  data() {
    return {
    }
  },
  methods: {
    closeMessage () {
      this.$store.dispatch('clearMessages')
    },
    closeError () {
      this.$store.dispatch('clearErrors')
    }
  },
  computed: {
    message () {
      return this.$store.getters.message
    },
    error () {
      return this.$store.getters.error
    }
  },
  created() {
  }
}
</script>