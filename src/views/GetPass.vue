<template>
    <div>
      <v-card flat class="rounded pa-4">
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field name="email" label="email" type="text" v-model="email" :rules="loginRules" required v-on:keyup.enter="getPass"></v-text-field>
            <!-- <v-text-field name="login" label="Ваш логин" type="text" v-model="login" :rules="loginRules" required v-on:keyup.enter="submit"></v-text-field>
            <v-text-field name="password" label="Пароль для входа" type="password" v-model="password" :rules="passwordRules" :counter="6" required v-on:keyup.enter="submit"></v-text-field> -->
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            dark
            flat
            class="success"
            :loading="loading"
            :disabled="!valid || loading"
            @click="getPass"
          >
            Получить пароль
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      email: '',
      loginRules: [
        v => !!v || 'Без логина войти не получится',
        v => (v && v.length >= 1) || 'Логин не может быть меньше одного символа'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Без пароля войти не получится',
        v => (v && v.length >= 6) || 'Пароль не может быть меньше 6-и символов'
      ],
      valid: false
    }
  },
  methods: {
    getPass() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('getPass', this.email)
      }
    }
  },
  computed: {
  },
  created() {
    this.getPass()
  }
}
</script>