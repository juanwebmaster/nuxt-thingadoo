<template>
  <button v-if="buttonActive" class="btn" @click="followItem('unfollow')">
    <ThIcon icon="Star" class="w-6 h-6 mr-4" /> Unfollow
  </button>

  <button v-else class="btn" @click="followItem('follow')">
    <ThIcon icon="Star" class="w-6 h-6 mr-4" /> Follow
  </button>
</template>

<script>
import ThIcon from './ThIcon'

export default {
  name: 'ThFollowButton',
  components: {
    ThIcon
  },
  props: {
    buttonActive: {
      type: Boolean
    },
    itemId: {
      type: Number,
      default: null
    },
    itemType: {
      type: String,
      default: null
    }
  },
  methods: {
    followItem(mode) {
      if (mode === 'follow') {
        const postData = {
          follow: { item_type: this.itemType, item_id: this.itemId }
        }
        this.$api.$post(`/follows`, postData).then((response) => {
          this.$auth.fetchUser()
          this.$toast.success('You are now following this')
        })
      } else {
        const postData = { item_type: this.itemType, item_id: this.itemId }

        this.$api.$post(`/follows/delete`, postData).then((response) => {
          this.$auth.fetchUser()
          this.$toast.success('You are no longer following this')
        })
      }
    }
  }
}
</script>
