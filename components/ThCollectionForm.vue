<template>
  <form id="new-collection" @submit.prevent="submitFunc">
    <input
      id="title"
      v-model="collection.title"
      name="title"
      placeholder="collection title"
      class="block w-full mb-5 p-3 text-black"
    />
    <textarea
      id="description"
      v-model="collection.description"
      name="description"
      class="block w-full mb-5 p-3 text-black"
      placeholder="describe your collection (optional)"
    />
    <select
      v-if="this.$auth.loggedIn && $auth.user.role === 'admin'"
      v-model="collection.reach"
      name="reach"
      class="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
    >
      <option>Local</option>
      <option>Global</option>
    </select>
    <div v-if="!image">
      <h2>Select an image</h2>
      <input id="collection-image" type="file" @change="onFileChange" />
    </div>
    <div v-else>
      <img :src="image" />
      <button @click="removeImage">Remove image</button>
    </div>
    <div class="block">
      <input
        id="public"
        v-model="collection.public"
        name="public"
        type="checkbox"
        :value="true"
      />

      <label for="public">public collection</label>
    </div>
    <div class="block">
      <input
        id="collaborative"
        v-model="collection.collaborative"
        name="collaborative"
        type="checkbox"
        :value="true"
      />

      <label for="collaborative">allow additional admins</label>
    </div>
    <button
      class="mt-5 bg-primary-800 rounded-md block uppercase py-3 px-3 text-lg text-white uppercase"
    >
      add collection
    </button>
  </form>
</template>

<script>
export default {
  props: {
    collection: {
      type: Object,
      default: null
    },
    submitMode: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      image: ''
    }
  },
  computed: {
    submitFunc() {
      return this.submitMode === 'save'
        ? this.saveNewCollection
        : this.updateCollection
    }
  },
  methods: {
    saveNewCollection() {
      const form = document.getElementById('new-collection')
      const fileField = document.getElementById('collection-image')
      const formData = new FormData(form)
      // not sure why I have to manually add checkboxes
      formData.append('public', document.getElementsByName('public')[0].checked)
      formData.append(
        'collaborative',
        document.getElementsByName('collaborative')[0].checked
      )
      if (fileField.files[0]) {
        formData.append('image', fileField.files[0])
      }

      this.$api.$post('/collections/create', formData).then((response) => {
        // REDIRECT TO '/collections/collection-name'
        this.collection = {}
        const slug = response.slug
        this.$nuxt.$router.replace({ path: `/collections/${slug}` })
      })
    },
    updateCollection() {
      const form = document.getElementById('new-collection')
      const fileField = document.getElementById('collection-image')
      const formData = new FormData(form)
      // not sure why I have to manually add checkboxes
      formData.append('public', document.getElementsByName('public')[0].checked)
      formData.append(
        'collaborative',
        document.getElementsByName('collaborative')[0].checked
      )
      if (fileField.files[0]) {
        formData.append('image', fileField.files[0])
      }

      this.$api
        .$patch('/collections/' + this.collection.id, formData)
        .then((response) => {
          // REDIRECT TO '/collections/collection-name'
          this.collection = {}
          const slug = response.slug
          this.$nuxt.$router.replace({ path: `/collections/${slug}` })
        })
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage(files[0])
    },
    createImage(file) {
      const reader = new FileReader()
      const vm = this

      reader.onload = (e) => {
        vm.event.image = e.target.result
      }
      reader.readAsDataURL(file)
    },
    removeImage(e) {
      this.image = ''
    }
  }
}
</script>

<style scoped>
input {
  color: black;
  padding: 0.5em;
}
textarea {
  color: black;
  padding: 0.5em;
  height: 15em;
}
select {
  color: black;
}
.form-input {
  display: block;
}
textarea {
  width: 100%;
}
.vdp-datepicker {
  color: black;
}
.custom-label input:checked + svg {
  display: block !important;
}
.timepicker {
  color: black;
}
</style>
