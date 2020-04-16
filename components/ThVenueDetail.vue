<template>
  <div class="bg-dark min-h-full rounded-tl-md rounded-tr-md overflow-y-scroll">
    <div class="flex items-center py-5">
      <h1 class="text-white text-2xl">{{ venue.title }}</h1>
    </div>
    <div>
      <ThVenueDetailInfo icon="MapPin" :title="venue.place.city" />
    </div>
    <div class="flex">
      <ThVenueCover
        v-if="venue.image_url"
        :image="venue.image_url"
        width="1/3"
        height="48"
      />
      <ThVenueDetailMap
        :key="`venue-map-${venue.id}`"
        :lat="venue.latitude"
        :lng="venue.longitude"
        :class="`h-48 ${style}`"
      />
    </div>
    <div class="p-5 border-b border-dark-90">
      <div v-if="$auth.loggedIn">
        <ThVenueDetailActions :venue="venue" :user="$auth.user" />
      </div>
    </div>

    <div class="p-5 border-b border-dark-90">
      <p>{{ venue.description }}</p>
    </div>
  </div>
</template>
<script>
import ThVenueCover from './ThVenueCover'
import ThVenueDetailMap from './ThVenueDetailMap'
import ThVenueDetailActions from './ThVenueDetailActions'
import ThVenueDetailInfo from './ThVenueDetailInfo'

export default {
  name: 'ThVenueDetail',
  components: {
    ThVenueCover,
    ThVenueDetailMap,
    ThVenueDetailActions,
    ThVenueDetailInfo
  },
  props: {
    venue: {
      type: Object,
      default: null
    }
  },
  computed: {
    style() {
      return this.venue.image_url ? `w-2/3` : `w-full`
    }
  }
}
</script>
