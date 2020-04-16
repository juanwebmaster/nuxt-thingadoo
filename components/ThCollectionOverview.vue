<template>
  <div>
    <div class="mb-5">
      <div
        class="p-5 bg-no-repeat bg-cover"
        :style="`background-image: url('/collections/detail-header.png');`"
      >
        <div class="header-icon flex justify-end pb-3">
          <ThIcon :icon="'More'" class="w-6 h-6 mr-5" />
        </div>
        <div class="header justify-start">
          <ThIcon :icon="'List'" class="w-12 h-12 mr-5" />
          <h2 class="text-3xl text-white mb-4 flex-grow font-semibold">
            {{ collection.title }}
          </h2>
          <ThShareItem :item="collection" :label-text="`Share`"></ThShareItem>
        </div>
      </div>
      <p class="text-xl p-5">{{ collection.description }}</p>
    </div>

    <div v-if="userIsOwner">
      <div class="flex">
        <div
          class="text-purple-500 text-2xl font-semibold cursor-pointer mb-3 p-2 bg-dark-70 border border-dark-80 rounded-md transition duration-500 ease-in-out"
          @click="showAddForm = true"
        >
          + add item
        </div>
        <div class="mt-3 ml-5">add something interesting you noticed</div>
      </div>

      <input
        v-if="showAddForm"
        v-model="query"
        type="text"
        class="bg-dark-80 text-white p-4 rounded-md w-full"
        placeholder="Search for content to add..."
        @keyup="searchContent"
      />
      <div v-if="query.length > 2">
        <CollectionAutoSuggest
          v-for="item in autocomplete_suggestions"
          :id="item.id"
          :key="item.id"
          :title="item.title"
          :item-type="item.type"
          @addToCollection="addItemId"
        />
      </div>
    </div>
    <div v-else>
      <div
        class="text-purple-500 text-xl cursor-pointer mb-3 p-5"
        @click="showAddForm = true"
      >
        + suggest item
      </div>
      <input
        v-if="showAddForm"
        v-model="query"
        type="text"
        class="bg-dark-80 text-white p-4 rounded-md w-full"
        placeholder="Search for content to add..."
        @keyup="searchContent"
      />
      <div v-if="query.length > 2">
        <div class="bg-gray-700 border-blue-700 border w-full">
          <CollectionAutoSuggest
            v-for="item in autocomplete_suggestions"
            :id="item.id"
            :key="item.id"
            :title="item.title"
            :item-type="item.type"
            @addToCollection="suggestItemId"
          />
        </div>
      </div>
    </div>
    <div v-if="userIsOwner">
      <div class="flex-none mr-8 p-5 bg-dark-80 ">
        <div v-if="collection.collection_suggestions.length > 0">
          <div class="flex">
            <h2 class="text-2xl text-white mb-4">Suggested Items</h2>
            <p class="m-5 mt-2">Click 'accept' or 'reject' links</p>
          </div>

          <ThCollectionSuggestion
            v-for="suggestion in collection.collection_suggestions"
            :id="suggestion.id"
            :key="`item-${suggestion.id}`"
            :item-type="suggestion.item_type"
            :title="suggestion.title"
            :description="suggestion.description"
            :slug="suggestion.item_slug"
            class="bg-gray-900 mb-4 p-3"
            @handleSuggestion="processSuggestion"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ThIcon from './ThIcon'
import ThShareItem from './ThShareItem'
import CollectionAutoSuggest from '@/components/CollectionAutoSuggest'
import ThCollectionSuggestion from '@/components/ThCollectionSuggestion'

export default {
  components: {
    CollectionAutoSuggest,
    ThCollectionSuggestion,
    ThShareItem,
    ThIcon
  },
  props: {
    collection: {
      type: Object,
      required: true,
      default: null
    },
    userIsOwner: {
      type: Boolean,
      required: true,
      default: null
    }
  },
  data() {
    return {
      showAddForm: false,
      query: '',
      autocomplete_suggestions: []
    }
  },
  created() {
    // initial load of collection
    // we can move this to a store if that's best

    this.$api.$get(`/collections/index`).then((response) => {
      this.collections = response.collections
    })
  },
  methods: {
    loadItem(id, itemType) {
      this.$emit('loadItem', id, itemType)
    },
    // remove an item from collection
    // pass item item
    deleteItemId(id, itemType) {
      this.$api
        .$post(`/collections/${this.collection.id}/delete`, {
          item_id: id,
          item_type: itemType
        })
        .then((response) => {
          this.$toast.success('Item removed from collection')
          this.$parent.collection = response
        })
        .catch((response) => {
          this.$toast.error(response.message)
        })
    },
    // add an item to collection
    // pass item id
    addItemId(id, itemType) {
      this.autocomplete_suggestions = []
      this.showAddForm = false
      this.query = ''
      this.$api
        .$post(`/collections/${this.collection.id}/add`, {
          item_id: id,
          item_type: itemType
        })
        .then((response) => {
          this.$toast.success('Item added to collection')
          this.$parent.collection = response
        })
        .catch((response) => {
          this.$toast.error(response.message)
        })
    },
    // this is for other users to suggest items
    // pass id of suggested item
    suggestItemId(id, itemType) {
      this.autocomplete_suggestions = []
      this.showAddForm = false
      this.query = ''
      this.$api
        .$post(`/collections/${this.collection.id}/suggest`, {
          item_id: id,
          item_type: itemType
        })
        .then((response) => {
          this.$toast.success(response.message)
        })
        .catch((response) => {
          this.$toast.error(response.message)
        })
    },
    // this is for collection admin to accept or reject submission
    // pass id of suggestion, plus 'accept' or 'reject'
    processSuggestion(id, action) {
      // posting ID of suggestion
      this.$api
        .$post(`/collections/process-suggestion/${id}`, { action_type: action })
        .then((response) => {
          this.$toast.success(response.message)
          this.collection = response.collection
        })
        .catch((response) => {
          this.$toast.error(response.message)
        })
    },
    // autosuggest for items to add
    searchContent(e) {
      if (this.query.length > 2) {
        this.$api
          .$get(`${process.env.API_URL}/api/v1/search?query=${this.query}`)
          .then((response) => {
            this.autocomplete_suggestions = [
              ...response.possibilities,
              ...response.resources,
              ...response.collections
            ]
          })
      }
    }
  }
}
</script>

<style></style>
