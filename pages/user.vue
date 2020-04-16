<template>
  <div class="flex">
    <div class="w-1/3 mr-8">
      <h2>Your Events</h2>

      <ThEventListAdminItem
        v-for="event in events"
        :id="event.id"
        :key="`event-item-${event.id}`"
        :date="event.start_time"
        :title="event.title"
        :address="event.address"
        :location="event.location"
        :image="event.image_url"
        :event-mode="event.event_mode"
        :slug="event.slug"
        :user-id="event.user_id"
        :user="$auth.user"
        @delete="deleteEvent"
      />
    </div>
    <div class="w-1/3 mr-8">
      <h2>Your Resources</h2>

      <ThResourceListAdminItem
        v-for="resource in resources"
        :id="resource.id"
        :key="`resource-item-${resource.id}`"
        :title="resource.title"
        :image="resource.image_url"
        :slug="resource.slug"
        :description="resource.snippet"
        :user-id="resource.user_id"
        :user="$auth.user"
        :page-type="
          resource.url_attachments.length > 0
            ? resource.url_attachments[0].link_type
            : 'website'
        "
        @delete="deleteResource"
      />
    </div>
    <div class="w-1/3 mr-8">
      <h2>Your Collections</h2>

      <ThCollectionListAdminItem
        v-for="collection in collections"
        :id="collection.id"
        :key="`collection-item-${collection.id}`"
        :title="collection.title"
        :image="collection.image_url"
        :slug="collection.slug"
        :description="collection.description"
        :admin-ids="collection.admin_ids"
        :user="$auth.user"
        @delete="deleteCollection"
        @duplicate="duplicateItem"
      />
    </div>
  </div>
</template>

<script>
import ThEventListAdminItem from '@/components/ThEventListAdminItem'
import ThResourceListAdminItem from '@/components/ThResourceListAdminItem'
import ThCollectionListAdminItem from '@/components/ThCollectionListAdminItem'
export default {
  components: {
    ThEventListAdminItem,
    ThResourceListAdminItem,
    ThCollectionListAdminItem
  },
  data() {
    return {
      events: [],
      resources: [],
      collections: []
    }
  },

  mounted() {
    this.$api.$post(`/users/posts`, {}).then((response) => {
      // eslint-disable-next-line no-console
      this.events = response.possibilities
      this.resources = response.resources
      this.collections = response.collections
    })
  },
  methods: {
    deleteEvent(id) {
      this.$api
        .$delete(`/possibilities/${id}`, {})
        .then((response) => {
          this.$toast.success(response.message)
          this.events = this.events.filter((item) => item.id !== id)
        })
        .catch((response) => {
          this.$toast.error(response.message)
        })
    },
    deleteResource(id) {
      this.$api
        .$delete(`/resources/${id}`, {})
        .then((response) => {
          this.$toast.success(response.message)
          this.resources = this.resources.filter((item) => item.id !== id)
        })
        .catch((response) => {
          this.$toast.error(response.message)
        })
    },
    deleteCollection(id) {
      this.$api
        .$delete(`/collections/${id}`, {})
        .then((response) => {
          this.$toast.success(response.message)
          this.collections = this.collections.filter((item) => item.id !== id)
        })
        .catch((response) => {
          this.$toast.error(response.message)
        })
    },
    duplicateItem(id, itemType) {
      let route = ''
      switch (itemType) {
        case 'possibilites':
          route = 'edit-event'
          break
        case 'resources':
          route = 'edit-resource'
          break
        case 'collections':
          route = 'edit-collection'
          break
        default:
        // code block
      }
      this.$api
        .$get(`/${itemType}/${id}/duplicate`)
        .then((response) => {
          this.$toast.success(response.message)
          this.$nuxt.$router.replace({
            name: route,
            params: { slug: response.slug }
          })
        })
        .catch((response) => {
          this.$toast.error(response.message)
        })
    }
  }
}
</script>

<style scoped>
h2 {
  @apply text-green-500 text-2xl mb-5;
}
</style>
