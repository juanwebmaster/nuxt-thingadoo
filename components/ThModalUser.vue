<template>
  <modal
    name="th-modal-user"
    transition="pop-out"
    :width="modalWidth"
    :height="450"
  >
    <div>
      <h1 class="text-center p-6 pb-0 text-2xl uppercase text-green-500">
        {{ modal }}
      </h1>
      <component :is="getModalSection()" />
    </div>
  </modal>
</template>
<script>
import { mapGetters } from 'vuex'

import ThModalUserLogin from './ThModalUserLogin'
import ThModalUserRegister from './ThModalUserRegister'
import ThModalUserRecover from './ThModalUserRecover'
const MODAL_WIDTH = 400

export default {
  name: 'ThModalUser',
  components: {
    ThModalUserLogin,
    ThModalUserRegister,
    ThModalUserRecover
  },
  data() {
    return {
      modalWidth: MODAL_WIDTH
    }
  },
  computed: mapGetters({
    modal: 'modalUser'
  }),
  created() {
    if (process.client) {
      this.modalWidth = MODAL_WIDTH
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
        this.$modal.hide('th-modal-login')
      } catch (err) {
        err.response.data.errors.map((e) => {
          this.$toast.error(e)
        })
      }
    },
    getModalSection() {
      return `ThModalUser${this.modal
        .charAt(0)
        .toUpperCase()}${this.modal.slice(1)}`
    }
  }
}
</script>
<style lang="postcss">
.v--modal {
  @apply bg-dark rounded-md shadow-xl !important;
}
.v--modal-overlay {
  background: rgba(54, 47, 47, 0.8) !important;
}
</style>
