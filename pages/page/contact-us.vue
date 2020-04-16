<template>
  <div>
    <h1>Contact Us</h1>
    <p>Please reach out to us with feedback, questions & ideas!</p>
    <form @submit.prevent="handleSubmit">
      <label>Your Name</label>
      <input v-model="name" type="text" name="name" class="form-input" />
      <label>Your Email</label>
      <input v-model="email" type="text" name="email" class="form-input" />
      <label>Say Something</label>
      <textarea
        v-model="message"
        name="message"
        class="form-input large-input"
      />
      <button
        class="p-3 bg-primary rounded-md block font-bold text-lg text-white uppercase"
      >
        Send
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      message: ''
    }
  },
  methods: {
    handleSubmit() {
      const postData = { contact_form: { name: this.name, email: this.email } }
      this.$api
        .$post(`${process.env.API_URL}/api/v1/send-feedback`, postData)
        .then((response) => {
          // TOAST: response.data
          this.name = ''
          this.email = ''
          this.message = ''
        })
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/info_page.css';
</style>
