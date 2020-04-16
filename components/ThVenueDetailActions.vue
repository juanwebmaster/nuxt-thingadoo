<template>
  <div class="flex">
    <ThFollowButton
      :item-type="'listing'"
      :item-id="venue.id"
      :button-active="user.listing_ids.includes(venue.id) ? true : false"
    />
    <ThShareItem :item="venue"></ThShareItem>
  </div>
</template>
<script>
import ThFollowButton from './ThFollowButton'
import ThShareItem from './ThShareItem'

export default {
  name: 'ThVenueDetailActions',
  components: {
    ThFollowButton,
    ThShareItem
  },
  props: {
    venue: {
      type: Object,
      required: true,
      default: null
    },
    user: {
      type: Object,
      required: true,
      default: null
    }
  }
}
</script>
<style>
.btn {
  @apply p-4 flex bg-dark-70 border border-dark-80 mr-5 rounded-md transition duration-500 ease-in-out;

  :hover {
    @apply bg-dark-80;
  }
}
</style>
