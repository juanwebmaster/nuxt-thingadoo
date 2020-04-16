<template>
  <div
    class="bg-dark-80 min-h-full rounded-tl-md rounded-tr-md overflow-y-scroll"
  >
    <TheVenueListItem
      v-for="venue in venues"
      :id="venue.id"
      :key="`venue-item-${venue.id}`"
      :title="venue.title"
      :address="venue.address"
      :location="venue.place.city"
      :image="venue.image_url"
    />
  </div>
</template>
<script>
import TheVenueListItem from './ThVenueListItem'

export default {
  name: 'TheVenueList',
  components: {
    TheVenueListItem
  },
  props: {
    venues: {
      type: Array,
      default: null
    }
  }
}
</script>
