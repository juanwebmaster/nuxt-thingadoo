<template>
  <form name="resetPassword" class="p-10" @submit="resetPassword">
    <h2 class="text-green-500 text-2xl mb-5">Reset Your Password</h2>
    <div>
      <label class="block mb-5">
        <input
          v-model="password"
          type="password"
          class="form-input block text-xl mb-2"
          placeholder="new password"
        />
        <input
          v-model="password_confirmation"
          class="form-input block text-xl mb-2"
          type="password"
          placeholder="confirm new password"
        />
      </label>
      <button
        type="submit"
        class="bg-primary-80 ml-1 my-3 px-4 py-1 text-white rounded-md text-xl uppercase"
      >
        Reset Password
      </button>
    </div>
  </form>
</template>
<script>
export default {
  data() {
    return {
      password: '',
      password_confirmation: ''
    }
  },
  methods: {
    resetPassword(e) {
      e.preventDefault()
      if (this.password === this.password_confirmation) {
        const postData = {
          password: this.password,
          password_confirmation: this.password_confirmation
        }
        // eslint-disable-next-line no-console
        console.log(postData)
        this.$axios.$put('/auth/password', postData).then((response) => {
          this.$toast.success(response.message)
          this.$nuxt.$router.replace({ path: `/` })
        })
      } else {
        this.$toast.error('Passwords do not match')
      }
    }
  }
}
</script>
