<template>
  <form name="recoverPassword" @submit="recoverPassword">
    <div class="p-8">
      <label class="block mb-5">
        <input
          v-model="email"
          name="email"
          class="form-input block text-xl w-full"
          placeholder="email"
        />
      </label>
      <button
        type="submit"
        class="bg-primary-80 ml-1 my-3 px-4 py-1 text-white rounded-md text-xl uppercase"
      >
        Send Reset Instructions
      </button>
    </div>
  </form>
</template>
<script>
export default {
  name: 'ThModalUserRecover',
  data() {
    return {
      email: '',
      redirectUrl: 'https://www.thingadoo.com/reset-password'
    }
  },
  methods: {
    recoverPassword(e) {
      e.preventDefault()
      const postData = {
        email: this.email,
        redirect_url: this.redirectUrl
      }
      this.$axios.$post('/auth/password', postData).then((response) => {
        this.$toast.success(response.message)
      })
    }
  }
}
</script>
