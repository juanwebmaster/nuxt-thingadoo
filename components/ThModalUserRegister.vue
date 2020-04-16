<template>
  <form name="registerForm" @submit="userRegister">
    <div class="p-8">
      <label class="block mb-5">
        <input
          v-model="register.email"
          name="email"
          class="form-input block w-full text-xl"
          placeholder="email"
        />
      </label>
      <label class="block mb-5">
        <input
          v-model="register.password"
          name="password"
          class="form-input block w-full text-xl"
          placeholder="password"
          type="password"
        />
      </label>
      <label class="block mb-5">
        <input
          v-model="register.password_confirmation"
          name="password"
          class="form-input block w-full text-xl"
          placeholder="confirm your password"
          type="password"
        />
      </label>

      <button
        type="submit"
        class="bg-primary-80 ml-1 my-3 px-4 py-1 text-white rounded-md text-xl uppercase"
      >
        Register
      </button>
      <div
        class="text-blue-500 cursor-pointer hover:underline"
        @click="openUserModal('login')"
      >
        Already have an account?
      </div>
    </div>
  </form>
</template>
<script>
export default {
  name: 'ThModalUserRegister',
  data() {
    return {
      register: {
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  methods: {
    async userRegister(e) {
      e.preventDefault()
      if (this.register.password === this.register.password_confirmation) {
        try {
          await this.$axios.post('/auth', {
            email: this.register.email,
            password: this.register.password,
            password_confirmation: this.register.password_confirmation
          })
          this.$toast.success('Registration Successful')
          await this.$auth.loginWith('local', {
            data: {
              email: this.register.email,
              password: this.register.password
            }
          })
          this.$modal.hide('th-modal-user')
        } catch (err) {
          err.response.data.errors.map((e) => {
            this.$toast.error(e)
          })
        }
      } else {
        this.$toast.error('Passwords do not match')
      }
    },
    openUserModal(section) {
      this.$store.dispatch('setModalUserSection', section)
      this.$modal.show('th-modal-user')
    }
  }
}
</script>
