<template>
  <div class="mb-8">
    <NuxtLink
      :to="`/events/${slug}`"
      class="Envet__item flex p-5 pl-0 hover:bg-dark transition duration-500
      ease-in-out cursor-pointer border-b border-dark-90"
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
      </div>
    </NuxtLink>
    <div v-if="userId === user.id" class="hyperlinked">
      <nuxt-link
        :to="{ name: 'edit-event', params: { slug: slug } }"
        class="mr-3"
        >edit</nuxt-link
      >
      <button @click="$emit('delete', id)">delete</button>
      <button @click="$emit('duplicate', id, 'possibilities')">
        duplicate
      </button>
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
    userId: {
      type: Number,
      default: null
    },
    user: {
      type: Object,
      required: true,
      default: null
    },
    slug: {
      type: String,
      default: null
    }
  },
  methods: {
    async getEvent() {
      await this.$store.dispatch('event/getById', { id: this.id })
    }
  }
}
</script>
<style scoped>
.hyperlinked a,
.hyperlinked button {
  @apply text-blue-500;
}
</style>
