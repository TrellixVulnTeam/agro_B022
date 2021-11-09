<template>
    <div>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          name="email"
          label="Логин или email"
          type="text"
          outlined
          v-model="email"
          :rules="loginRules"
          required
          v-on:keyup.enter="signIn"
        ></v-text-field>
        <v-text-field
          name="email"
          label="Пароль"
          type="password"
          outlined
          v-model="code"
          :rules="codeRules"
          required
          v-on:keyup.enter="signIn"
        ></v-text-field>
      </v-form>

      <v-btn
        block
        depressed
        large
        class="success mb-2"
        :loading="loading"
        :disabled="!valid || loading"
        @click="signIn"
      >
        Войти
      </v-btn>
      <v-btn
        block
        depressed
        large
        color="white"
        @click="goToGetPass"
      >
        Сбросить пароль
      </v-btn>
    </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      email: '',
      code: '',
      loginRules: [
        v => !!v || 'Необходимо указать email',
        v => (v && v.length >= 1) || 'Логин не может быть меньше одного символа'
      ],
      codeRules: [
        v => !!v || 'Необходимо указать пароль',
        v => (v && v.length >= 6) || 'Пароль не может быть меньше 6-и символов'
      ],
      valid: false
    }
  },
  methods: {
    signIn() {
      const { email, code } = this

      if (this.$refs.form.validate()) {
        this.$store.dispatch('signIn', { email, code })
      }
    },
    goToGetPass() {
      this.$router.push('/getpass')
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