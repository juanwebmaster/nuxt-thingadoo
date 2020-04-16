<template>
  <form name="loginForm" @submit="userLogin">
    <div class="p-8">
      <label class="block mb-5">
        <input
          v-model="login.email"
          name="email"
          class="form-input block text-xl w-full"
          placeholder="Email"
        />
      </label>
      <label class="block mb-5">
        <input
          v-model="login.password"
          name="password"
          class="form-input block text-xl w-full"
          placeholder="Password"
          type="password"
        />
      </label>

      <button
        type="submit"
        class="bg-primary-80 ml-1 my-3 px-4 py-1 text-white rounded-md text-xl uppercase"
      >
        Login
      </button>
      <div
        class="text-blue-500 cursor-pointer hover:underline"
        @click="openUserModal('recover')"
      >
        Forgot your password?
      </div>
    </div>
  </form>
</template>
<script>
export default {
  name: 'ThModalUserLogin',
  data() {
    return {
      login: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async userLogin(e) {
      e.preventDefault()

      try {
        await this.$auth.loginWith('local', {
          data: this.login
        })
        this.$toast.success('Welcome, dear discoverer')
        this.$modal.hide('th-modal-user')
      } catch (err) {
        err.response.data.errors.map((e) => {
          this.$toast.error(e)
        })
      }
    },
    openUserModal(section) {
      this.$store.dispatch('setModalUserSection', section)
      this.$modal.show('th-modal-user')
    }
  }
}
</script>
