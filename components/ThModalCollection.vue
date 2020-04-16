<template>
  <modal
    name="th-modal-collection"
    transition="pop-out"
    :width="modalWidth"
    :height="450"
    @before-open="beforeOpen"
  >
    <div>
      <ThLogo />
      <div class="p-10">
        <div v-if="$auth.loggedIn">
          <label>Add to existing collection</label>
          <select
            v-model="collectionId"
            name="collectionId"
            class="block appearance-none text-black bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            @change="addToCollection"
          >
            <option
              v-for="collection in $auth.user.collections"
              :key="collection.id"
              :value="collection.id"
              >{{ collection.title }}</option
            >
          </select>
          <label class="mb-5">Or, add to a new collection</label>
          <input
            id="collection-title"
            v-model="collectionTitle"
            name="collection-title"
            placeholder="new collection name"
            class="block w-full mb-5 p-3 text-black"
          />
          <button
            class="mt-5 bg-primary rounded-md block font-bold text-lg text-white uppercase"
            @click="addToCollection"
          >
            create and add
          </button>
        </div>
        <div v-else>
          <h3>You must log in to use collections</h3>
          <button class="p-4 inline-block mr-3" @click="openUserModal('login')">
            Login
          </button>
          <button
            class="p-4 inline-block bg-primary rounded-md text-white"
            @click="openUserModal('register')"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  </modal>
</template>
<script>
import ThLogo from './ThLogo'
const MODAL_WIDTH = 400

export default {
  name: 'ThModalCollection',
  components: {
    ThLogo
  },
  data() {
    return {
      modalWidth: MODAL_WIDTH,
      itemId: null,
      collectionTitle: '',
      collectionId: null
    }
  },
  created() {
    if (process.client) {
      this.modalWidth = MODAL_WIDTH
    }
  },
  methods: {
    beforeOpen(event) {
      this.itemId = event.params.itemId
      this.itemType = event.params.itemType
    },
    openUserModal(section) {
      this.$modal.hide('th-modal-collection')
      this.$store.dispatch('setModalUserSection', section)
      this.$modal.show('th-modal-user')
    },
    addToCollection() {
      if (this.collectionId !== null) {
        // add to a new collection
        this.$api
          .$post(`/collections/${this.collectionId}/add`, {
            item_id: this.itemId,
            item_type: this.itemType
          })
          .then((response) => {
            this.collectionId = null
            this.$toast.success('Item added to collection')
            // RELOADING USER so we have an active list of collections
            // probably, we just want to add this to a store
            this.$auth.fetchUser()
            this.$modal.hide('th-modal-collection')
          })
          .catch((response) => {
            this.$toast.error(response.message)
          })
      } else {
        this.$api
          .$post(`/collections/add-to-new/${this.itemId}`, {
            title: this.collectionTitle
          })
          .then((response) => {
            this.$toast.success('New collection created')
            // RELOADING USER so we have an active list of collections
            // probably, we just want to add this to a store
            this.$auth.fetchUser()
            this.$modal.hide('th-modal-collection')
          })
          .catch((response) => {
            this.$toast.error(response.message)
          })
      }
    }
  }
}
</script>
<style lang="postcss">
.v--modal {
  @apply bg-dark rounded-md shadow-xl !important;
}
.v--modal-overlay {
  background: rgba(54, 47, 47, 0.8) !important;
}
</style>
