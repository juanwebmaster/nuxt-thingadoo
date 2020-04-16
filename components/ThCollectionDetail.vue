<template>
  <perfect-scrollbar ref="collectionDetailScroll">
    <div class="bg-dark-80 mb-5">
      <div class="flex justify-between">
        <div class="block p-6">
          <div
            class="flex text-xl mr-5 cursor-pointer"
            @click="$emit('hideCollectionDetail')"
          >
            X
            <h2 class="text-xl text-white mb-4 flex-grow">
              {{ collection.title }}
            </h2>
          </div>
          <ThShareItem :item="collection" :label-text="`Follow`"></ThShareItem>
        </div>
        <div>
          <img class="h-full" :src="`/collections/item_png.png`" />
        </div>
      </div>
      <div v-if="$auth.loggedIn" class="flex">
        <ThFollowButton
          :item-type="'collection'"
          :item-id="collection.id"
          :button-active="
            this.$auth.user.collection_ids.includes(collection.id)
              ? true
              : false
          "
        />
        <button
          class="btn"
          @click="
            $modal.show('th-modal-collection', {
              itemId: collection.id,
              itemType: 'Collection'
            })
          "
        >
          <ThIcon icon="Star" class="w-6 h-6 mr-4" /> Bookmark
        </button>
      </div>
    </div>
    <div>
      <div v-if="collection.resources && collection.resources.length > 0">
        <h3 class="mt-6 text-xl text-green-500">
          Resources [{{ collection.resources.length }}]
        </h3>
        <div class="flex overflow-x-scroll overflow-y-hidden">
          <ThCollectionResourceHorizontalItem
            v-for="resource in collection.resources"
            :id="resource.id"
            :key="`resource-item-${resource.id}`"
            :date="resource.start_time"
            :title="resource.title"
            :description="resource.description"
            :admin="userIsOwner"
            :image="
              resource.url_attachments[0]
                ? resource.url_attachments[0].image_url
                : ''
            "
            :page-type="
              resource.url_attachments[0]
                ? resource.url_attachments[0].link_type
                : 'website'
            "
            @deleteFromCollection="deleteItemId"
            @loadEvent="loadItem"
          />
        </div>
      </div>

      <div
        v-if="collection.possibilities && collection.possibilities.length > 0"
      >
        <h3 class="mt-6 text-xl text-green-500">
          Events [{{ collection.possibilities.length }}]
        </h3>
        <ThEventListCollectionItem
          v-for="event in collection.possibilities"
          :id="event.id"
          :key="`event-item-${event.id}`"
          :date="event.start_time"
          :title="event.title"
          :address="event.address"
          :location="event.location"
          :image="event.image_url"
          :event-mode="event.event_mode"
          :admin="userIsOwner"
          @deleteFromCollection="deleteItemId"
          @loadEvent="loadItem"
        />
      </div>
      <div v-if="collection.collections && collection.collections.length > 0">
        <h3 class="mt-6 text-xl text-green-500">
          Collections [{{ collection.collections.length }}]
        </h3>
        <div class="flex overflow-x-scroll overflow-y-hidden">
          <ThCollectionFolderHorizontalItem
            v-for="col in collection.collections"
            :id="col.id"
            :key="`col-item-${col.id}`"
            :title="col.title"
            :description="col.description"
            :image="col.image_url"
            :admin="userIsOwner"
            @deleteFromCollection="deleteItemId"
            @loadEvent="loadItem"
          />
        </div>
      </div>
    </div>
  </perfect-scrollbar>
</template>

<script>
import ThIcon from './ThIcon'
import ThShareItem from './ThShareItem'
import ThEventListCollectionItem from '@/components/ThEventListCollectionItem'
import ThCollectionFolderHorizontalItem from '@/components/ThCollectionFolderHorizontalItem'
import ThCollectionResourceHorizontalItem from '@/components/ThCollectionResourceHorizontalItem'
import ThFollowButton from '@/components/ThFollowButton'

export default {
  components: {
    ThIcon,
    ThEventListCollectionItem,
    ThCollectionFolderHorizontalItem,
    ThCollectionResourceHorizontalItem,
    ThFollowButton,
    ThShareItem
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
          this.$parent.collection = response.collection
        })
        .catch((response) => {
          this.$toast.error(response.message)
        })
    }
  }
}
</script>

<style></style>
