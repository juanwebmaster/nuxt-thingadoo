<template>
  <div>
    <form id="new-collection" class="mt-10" @submit.prevent="saveNewCollection">
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
        class="mt-5 bg-primary rounded-md block font-bold text-lg text-white uppercase"
      >
        add collection
      </button>
      <div @click="$emit('cancel')">cancel</div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: '',
      collection: {
        title: '',
        description: '',
        public: false,
        collaborative: false
      }
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
        this.$emit('cancel')
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
