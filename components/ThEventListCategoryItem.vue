<template>
  <div
    class="Envet__item flex p-5 pl-0 hover:bg-dark transition duration-500 ease-in-out cursor-pointer border-b border-dark-90"
    @click="$emit('loadEvent', id, 'event')"
  >
    <ThEventDate :date="date" />
    <div class="flex w-full justify-between">
      <ThEventListItemDescription
        :title="title"
        :date="date"
        :address="address"
        :location="location"
        :event-type="eventMode"
      />
      <ThEventCover :image="image" class="rounded-md ml-4" />
      <div v-if="admin">
        <button @click="$emit('deleteFromCollection', id, 'Possibility')">
          remove from collection
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import ThEventDate from './ThEventDate'
import ThEventListItemDescription from './ThEventListItemDescription'
import ThEventCover from './ThEventCover'

export default {
  name: 'ThEventListAdminItem',
  components: {
    ThEventDate,
    ThEventListItemDescription,
    ThEventCover
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
    date: {
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
    },
    eventMode: {
      type: String,
      default: null
    },
    admin: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    async getEvent() {
      await this.$store.dispatch('event/getById', { id: this.id })
    }
  }
}
</script>
