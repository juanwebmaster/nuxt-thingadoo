<template>
  <div>
    <input
      v-model="query"
      type="text"
      name="search"
      class="bg-dark-80 text-white rounded-md w-full py-2 px-5 text-xl"
      placeholder="Search Finger Lakes..."
      @keyup="searchContent"
      @keyup.esc.exact="hideSearch"
    />
    <div v-if="searchSuggestionsActive" class="mt-2 w-full bg-dark-80 p-4">
      <div class="flex">
        <div class="w-full">
          <div
            v-if="possibilitiesResults.length > 0"
            class="border-b border-gray-800 mb-4 pb-1"
          >
            <span class="text-green-400 mb-1">Events</span>
            <div>
              <NuxtLink
                v-for="possibility in possibilitiesResults"
                :key="possibility.id"
                :to="`/events/${possibility.slug}`"
                class="mb-2 hover:text-blue-500 cursor-pointer block text-xl leading-tight"
                @click.native="hideSearchOpenDetail"
              >
                {{ possibility.title }}
              </NuxtLink>
            </div>
          </div>
          <div
            v-if="listingsResults.length > 0"
            class="border-b border-gray-800 mb-4 pb-1"
          >
            <span class="text-green-400 mb-1">Organizations</span>
            <NuxtLink
              v-for="listing in listingsResults"
              :key="listing.id"
              :to="`/venues/${listing.id}`"
              class="mb-2 hover:text-blue-500 cursor-pointer block text-xl leading-tight"
              @click.native="hideSearchOpenDetail"
            >
              {{ listing.title }}
            </NuxtLink>
          </div>
          <div
            v-if="collectionsResults.length > 0"
            class="border-b border-gray-800 mb-4 pb-1"
          >
            <span class="text-green-400 mb-1">Collections</span>
            <NuxtLink
              v-for="collection in collectionsResults"
              :key="collection.id"
              :to="`/collections/${collection.slug}`"
              class="mb-1 hover:text-blue-500 cursor-pointer block text-xl"
              @click.native="hideSearchOpenDetail"
            >
              {{ collection.title }}
            </NuxtLink>
          </div>
          <div
            v-if="resourcesResults.length > 0"
            class="border-b border-gray pb-3"
          >
            <span class="text-green-400 mb-1">Resources</span>
            <NuxtLink
              v-for="resource in resourcesResults"
              :key="resource.id"
              :to="`/resources/${resource.slug}`"
              class="mb-1 hover:text-blue-500 cursor-pointer block text-xl"
              @click.native="hideSearchOpenDetail"
            >
              {{ resource.title }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ThDropdownSearch',
  data() {
    return {
      query: '',
      searchSuggestionsActive: false,
      possibilitiesResults: [],
      collectionsResults: [],
      resourcesResults: [],
      listingsResults: []
    }
  },
  computed: {
    ...mapGetters({
      display: 'ui/display',
      breakpoints: 'ui/breakpoints'
    })
  },
  methods: {
    searchContent(e) {
      if (this.query.length > 2) {
        // TODO: All api calls needs made by the store
        this.$api
          .$get(`${process.env.API_URL}/api/v1/search?query=${this.query}`)
          .then((response) => {
            // show events, listings and collections
            // click on any to load
            // we can either temporarily replace the feed content with search results
            // or, dropdown results from search bar
            this.searchSuggestionsActive = true
            this.possibilitiesResults = response.possibilities
            this.collectionsResults = response.collections
            this.listingsResults = response.listings
            this.resourcesResults = response.resources
          })
      }
      if (this.query.length === 0) {
        this.hideSearch()
        document.getElementsByName('search')[0].focus()
      }
    },
    hideSearch() {
      this.query = ''
      this.searchSuggestionsActive = false
      document.getElementsByName('search')[0].blur()
    },
    hideSearchOpenDetail() {
      this.query = ''
      this.searchSuggestionsActive = false
      this.$store.commit('ui/SET_DETAIL_VISIBILITY', true)
      document.getElementsByName('search')[0].blur()
    },
    openUserModal(section) {
      this.$store.dispatch('setModalUserSection', section)
      this.$modal.show('th-modal-user')
    },
    toggleMenu() {
      this.$store.commit('ui/SET_MENU_VISIBILITY', !this.display.menuVisible)
    }
  }
}
</script>

<style></style>
