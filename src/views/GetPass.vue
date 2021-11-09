<template>
    <div>
      <p class="authInfo">
        Пожалуйста, укажите email, который<br>привязан к Вашему аккаунту
      </p>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          name="email"
          label="Ваш email"
          type="text"
          outlined
          v-model="email"
          :rules="loginRules"
          required
          v-on:keyup.enter="getPass"
        ></v-text-field>
      </v-form>

      <v-btn
        block
        depressed
        large
        class="success mb-2"
        :loading="loading"
        :disabled="!valid || loading"
        @click="getPass"
      >
        Далее
      </v-btn>
      <v-btn
        block
        depressed
        large
        color="white"
        @click="goToSignIn"
      >
        Отменить
      </v-btn>
    </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      email: '',
      loginRules: [
        v => !!v || 'Необходимо указать email',
        v => (v && v.length >= 1) || 'Логин не может быть меньше одного символа'
      ],
      valid: false
    }
  },
  methods: {
    getPass() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('getPass', this.email)
      }
    },
    goToSignIn() {
      this.$router.push('/signin')
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  created() {
  }
}
</script>