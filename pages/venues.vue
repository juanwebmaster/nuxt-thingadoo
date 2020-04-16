<template>
  <div class="venues">
    <ThVenueFilter />
    <div class="flex h-full -mx-5">
      <ThVenueList class="w-1/2 mx-5" :venues="venues" />
      <ThVenueDetail v-if="venue.id" class="w-1/2 mx-5" :venue="venue" />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ThVenueFilter from '@/components/ThVenueFilter'
import ThVenueList from '@/components/ThVenueList'
import ThVenueDetail from '@/components/ThVenueDetail'

export default {
  components: {
    ThVenueFilter,
    ThVenueList,
    ThVenueDetail
  },
  async asyncData({ store, params }) {
    const venueList = await store.dispatch('venue/list')
    return { venues: venueList }
  },
  computed: mapGetters({
    venue: 'venue/detail'
  })
}
</script>
<style scoped>
.venues {
  height: calc(100vh - 136px);
}
</style>
