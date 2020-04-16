<template>
  <div
    class="Envet__item flex p-5 pl-0 hover:bg-dark transition duration-500 ease-in-out cursor-pointer border-b border-dark-90"
    @click="getVenue()"
  >
    <ThVenueDate :date="date" />
    <div class="flex w-full justify-between">
      <ThVenueListItemDescription
        :title="title"
        :address="address"
        :location="location"
      />
      <ThVenueCover :image="image" class="rounded-md ml-4" />
    </div>
  </div>
</template>
<script>
import ThVenueListItemDescription from './ThVenueListItemDescription'
import ThVenueCover from './ThVenueCover'

export default {
  name: 'TheVenueListItem',
  components: {
    ThVenueListItemDescription,
    ThVenueCover
  },
  props: {
    id: {
      type: Number,
      default: 0,
      required: true
    },
    title: {
      type: String,
      default: null,
      required: true
    },
    address: {
      type: String,
      default: null
    },
    location: {
      type: String,
      default: null
    },
    image: {
      type: String,
      default: null
    }
  },
  methods: {
    async getVenue() {
      await this.$store.dispatch('venue/getById', { id: this.id })
    }
  }
}
</script>
