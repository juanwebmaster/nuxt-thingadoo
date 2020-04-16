<template>
  <form id="new-resource" name="resource" @submit.prevent="submitFunc">
    <div class="flex">
      <div class="w-2/3 flex-grow">
        <input
          v-model="resource.title"
          type="text"
          name="title"
          placeholder="enter a title or URL"
          class="text-white bg-black p-3 mb-4 block w-full text-xl"
          @blur="scrapeTitleLink"
          @paste="paste"
          @input="scrapeTitleLink"
        />
        <textarea
          v-model="resource.description"
          name="description"
          placeholder="optional description"
          class="text-white bg-black h-40 p-3 mb-4 block w-full text-lg"
          @blur="classifyAndScrape"
          @paste="paste"
          @input="scrapeLinks"
        />
        <div v-if="isClassifying" class="spinner">Classifying..</div>
        <div class="flex">
          <div class="w-1/2">
            <label>Tags</label>

            <multiselect
              id="select-classifications"
              v-model="resource.classifications"
              :options="classificationOptions"
              :close-on-select="true"
              :multiple="true"
              label="name"
              track-by="id"
              @input="updateSelected"
            >
            </multiselect>
          </div>
          <div class="w-1/2 ml-8">
            <label>Categories</label>
            <no-ssr>
              <multiselect
                id="select-categories"
                v-model="resource.categories"
                :options="categoryOptions"
                :close-on-select="true"
                :multiple="true"
                label="title"
                track-by="id"
                @input="updateSelected"
              >
              </multiselect>
            </no-ssr>
          </div>
        </div>
      </div>
      <div v-if="image" class="w-1/3 mx-10">
        <div>
          <img :src="image" />
          <button class="text-blue-500 text-lg mt-3" @click="removeImage">
            Remove image
          </button>
        </div>
      </div>
    </div>

    <div clsss="mt-4">
      <label>Select an image</label>
      <input id="resource-image" type="file" @change="onFileChange" />
    </div>

    <input
      v-if="!image"
      v-model="resource.image_url"
      name="image_url"
      placeholder="enter image url"
      class="block appearance-none w-full my-5"
      @blur="loadUrlImage"
      @paste="paste"
      @input="loadUrlImage"
    />
    <input
      v-model="url"
      type="text"
      name="url"
      placeholder="attach a url"
      @blur="scrapeUrlLink"
      @paste="paste"
      @input="scrapeUrlLink"
    />
    <label>Reach</label>
    <select
      v-if="this.$auth.loggedIn && $auth.user.role === 'admin'"
      v-model="resource.reach"
      name="reach"
      class="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
    >
      <option>Local</option>
      <option>Global</option>
    </select>
    <p class="mt-4">
      Paste in as many links as you want; each will be added as an attachment
    </p>

    <div class="flex mt-5">
      <button
        class="p-3 bg-primary-80 rounded-md block text-lg text-white uppercase"
      >
        add resource
      </button>
      <div
        class="mt-3 ml-8 text-white text-sm cursor-pointer hover:text-primary-70"
        @click="$router.back()"
      >
        cancel
      </div>
    </div>
    <h4 class="pb-4 text-lg">Attachments</h4>
    <div v-if="isScraping" class="spinner">Loading..</div>
    <div class="grid grid-cols-2">
      <ThLinkSummary
        v-for="link in resource.url_attachments"
        :id="link.id"
        :key="link.id"
        :title="link.title"
        :description="link.description"
        :image-url="link.image_url"
        :link-url="link.url"
        :link-type="link.link_type"
        :video-id="link.video_id"
        @removeAttachment="removeAttachment"
      >
      </ThLinkSummary>
    </div>
  </form>
</template>

<script>
import ThLinkSummary from '@/components/ThLinkSummary'
import 'vue-multiselect/dist/vue-multiselect.min.css'
export default {
  components: {
    ThLinkSummary
  },
  props: {
    resource: {
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
      url: '',
      image: '',
      isScraping: false,
      isPaste: false,
      categories: [],
      classificationOptions: [],
      categoryOptions: [],
      isClassifying: false
    }
  },
  computed: {
    submitFunc() {
      return this.submitMode === 'save'
        ? this.saveNewResource
        : this.updateResource
    }
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.log(this.resource)
    if (this.resource.image_url) {
      this.image = this.resource.image_url
    }
    this.$api.$get(`/categories/index`).then((response) => {
      this.categoryOptions = response.categories
    })
    this.$api.$get(`/classifications/index`).then((response) => {
      this.classificationOptions = response.classifications
    })
  },
  methods: {
    paste() {
      this.isPaste = true
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
        vm.image = e.target.result
      }
      reader.readAsDataURL(file)
    },
    removeImage(e) {
      this.image = ''
      this.resource.image_url = ''
    },
    loadUrlImage() {
      this.image = this.resource.image_url
    },
    classify() {
      this.isClassifying = true
      this.$api
        .$get('/classify?text=' + this.resource.description)
        .then((response) => {
          // eslint-disable-next-line no-console
          this.resource.classifications = response.classifications
          this.isClassifying = false
          this.categorize()
        })
    },
    categorize() {
      this.isClassifying = true
      const classificationIds = this.resource.classifications.map(
        (obj) => obj.name
      )
      this.$api
        .$get('/categorize?classifications=' + classificationIds)
        .then((response) => {
          this.resource.categories = response.categories
          this.isClassifying = false
        })
    },
    scrapeTitleLink() {
      if (this.resource.title.includes('http')) {
        this.url = this.resource.title
        this.resource.title = ''
        this.scrapeUrlLink()
      } else {
        this.isPaste = false
      }
    },
    scrapeUrlLink() {
      if (this.url.length > 0) {
        this.isScraping = true
        if (this.isPaste) {
          this.isPaste = false
          this.$api
            .$get('/scrape-links?text=' + this.url)
            .then((response) => {
              // eslint-disable-next-line no-console
              console.log(response)
              this.resource.url_attachments = [
                ...response.links,
                ...this.resource.url_attachments
              ]
              if (this.resource.title === '') {
                this.resource.title = this.resource.url_attachments[0].title
              }
              if (this.resource.description === '') {
                this.resource.description = this.resource.url_attachments[0].description
              }
              this.url = ''
              this.isScraping = false
            })
            .catch((response) => {
              this.$toast.error(response.message)
            })
        }
      }
    },
    scrapeLinks() {
      if (this.isPaste) {
        this.isPaste = false
        this.$api
          .$get('/scrape-links?text=' + this.resource.description)
          .then((response) => {
            this.resource.links = [
              ...response.links,
              ...this.resource.url_attachments
            ]
            if (this.resource.title === '') {
              this.resource.title = this.resource.url_attachments[0].title
              this.resource.description = this.resource.url_attachments[0].description
            }
          })
          .catch((response) => {
            this.$toast.error(response.message)
          })
      }
    },
    updateSelected() {
      // this should not be necessary, was working before without it!!
      this.$forceUpdate()
    },
    classifyAndScrape() {
      this.scrapeLinks()
      this.classify()
    },
    removeAttachment(title) {
      this.resource.url_attachments = this.resource.url_attachments.filter(
        (x) => x.title !== title
      )
    },
    saveNewResource() {
      const form = document.getElementById('new-resource')
      const fileField = document.getElementById('resource-image')
      const classificationIds = this.resource.classifications.map(
        (obj) => obj.id
      )
      const categoryIds = this.resource.categories.map((obj) => obj.id)
      const formData = new FormData(form)
      formData.append('classification_ids', classificationIds)
      formData.append('category_ids', categoryIds)

      const formLinks = JSON.stringify(this.resource.url_attachments)
      formData.append('url_attachments', formLinks)

      if (fileField && fileField.files[0]) {
        formData.append('image', fileField.files[0])
      }
      this.$api.$post('/resources/create', formData).then((response) => {
        // REDIRECT TO '/collections/collection-name'
        // eslint-disable-next-line no-console
        const slug = response.slug
        this.resource = {}
        this.$nuxt.$router.replace({ path: `/resources/${slug}` })
      })
    },

    updateResource() {
      const form = document.getElementById('new-resource')
      const fileField = document.getElementById('resource-image')
      const classificationIds = this.resource.classifications.map(
        (obj) => obj.id
      )
      const categoryIds = this.resource.categories.map((obj) => obj.id)
      const formData = new FormData(form)
      formData.append('classification_ids', classificationIds)
      formData.append('category_ids', categoryIds)
      formData.append('image_url', this.resource.image_url)
      const formLinks = JSON.stringify(this.resource.url_attachments)
      formData.append('url_attachments', formLinks)
      // eslint-disable-next-line no-console
      console.log('heyzzzzzz')
      if (fileField && fileField.files[0]) {
        formData.append('image', fileField.files[0])
      }
      this.$api
        .$patch('/resources/' + this.resource.id, formData)
        .then((response) => {
          // REDIRECT TO '/collections/collection-name'
          // eslint-disable-next-line no-console
          const slug = response.slug
          this.resource = {}
          this.$nuxt.$router.replace({ path: `/resources/${slug}` })
        })
    }
  }
}
</script>
<style scoped>
input {
  @apply text-white bg-black p-3 mb-4 mt-1 block w-full text-xl;
}
textarea {
  @apply text-white bg-black h-40 p-3 mb-4 mt-1 block w-full text-lg;
}
select {
  @apply text-white bg-black p-3 mb-4 mt-1 block w-full text-xl;
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
