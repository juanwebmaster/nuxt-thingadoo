<template>
  <modal
    name="th-modal-share"
    transition="pop-out"
    :width="modalWidth"
    :height="450"
    @before-open="beforeOpen"
  >
    <div>
      <ThLogo />
      <social-sharing
        :url="item.url"
        :title="item.title"
        :description="item.description"
        inline-template
        class="text-3xl text-center"
      >
        <div>
          <network network="email" class="block mb-2"> <i></i> Email </network>
          <network network="facebook" class="block mb-2">
            <i class="fa fa-facebook"></i> Facebook
          </network>
          <network network="reddit" class="block mb-2">
            <i class="fa fa-reddit"></i> Reddit
          </network>
          <network network="twitter" class="block mb-2">
            <i class="fa fa-twitter"></i> Twitter
          </network>
        </div>
      </social-sharing>
    </div>
  </modal>
</template>
<script>
import ThLogo from './ThLogo'
const MODAL_WIDTH = 400

export default {
  name: 'ThModalShare',
  components: {
    ThLogo
  },
  data() {
    return {
      modalWidth: MODAL_WIDTH,
      item: {}
    }
  },
  created() {
    if (process.client) {
      this.modalWidth = MODAL_WIDTH
    }
  },
  methods: {
    beforeOpen(event) {
      this.item = event.params.item
    },
    openShareModal(section) {
      this.$modal.hide('th-modal-collection')
      this.$modal.show('th-modal-share')
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
