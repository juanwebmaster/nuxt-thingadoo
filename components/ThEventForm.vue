<template>
  <form id="new-event" name="event" @submit.prevent="submitFunc">
    <div class="block">
      <input
        v-model="event.title"
        name="title"
        placeholder="event title"
        class="block w-full text-black"
      />
    </div>
    <div class="flex border-b border-gray-700 py-5">
      <div class="w-1/2 pr-10">
        <div>
          <label>Start Date</label>
          <VueCtkDateTimePicker
            id="date"
            v-model="event.date"
            :only-date="true"
            :format="'YYYY-MM-DD'"
            :formatted="'YYYY-MM-DD'"
            :label="'start date'"
            :disabled="false"
            :auto-close="true"
          />

          <label class="mt-4 block">Start time</label>
          <VueCtkDateTimePicker
            :id="'startTime'"
            v-model="event.start_time"
            class="date-fields"
            :only-time="true"
            :format="'HH:mm'"
            :formatted="'HH:mm'"
            :label="'start time'"
            :minute-interval="15"
          />
        </div>
      </div>
      <div class="w-1/2 pr-10">
        <label>End Date</label>
        <VueCtkDateTimePicker
          id="date"
          v-model="event.date"
          :only-date="true"
          :format="'YYYY-MM-DD'"
          :formatted="'YYYY-MM-DD'"
          :label="'start date'"
          :disabled="false"
          :auto-close="true"
        />
        <label class="mt-4 block">End time</label>
        <VueCtkDateTimePicker
          :id="'endTime'"
          v-model="event.end_time"
          class="date-fields"
          :only-time="true"
          :format="'HH:mm'"
          :formatted="'HH:mm'"
          :label="'end time'"
          :minute-interval="15"
        />
      </div>
    </div>
    <div class="flex">
      <div class="w-2/3 flex-grow">
        <input
          v-model="event.event_url"
          name="event_url"
          placeholder="event info url"
          class="block w-full mb-5 text-black"
          @blur="scrapeEvent"
        />
        <textarea
          id="description"
          v-model="event.description"
          name="description"
          placeholder="describe your event here"
          class="block appearance-none w-full my-5 h-64 text-black"
          @blur="classifyEvent"
        />
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
    <div v-if="isClassifying" class="spinner">Classifying..</div>
    <div class="flex">
      <div class="w-1/2">
        <label>Tags</label>
        <multiselect
          id="select-classifications"
          v-model="event.classifications"
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
        <multiselect
          id="select-categories"
          v-model="event.categories"
          :options="categoryOptions"
          :close-on-select="true"
          :multiple="true"
          label="title"
          track-by="id"
          @input="updateSelected"
        >
        </multiselect>
      </div>
    </div>

    <div v-if="!image">
      <label>Select an image</label>
      <input id="event-image" type="file" @change="onFileChange" />
    </div>

    <input
      v-if="!image"
      v-model="event.image_url"
      name="image_url"
      placeholder="enter image url"
      class="block appearance-none w-full my-5"
      @blur="loadUrlImage"
      @paste="paste"
      @input="loadUrlImage"
    />
    <div class="border-b border-gray-700 py-5">
      <label class="block">Event Type</label>
      <select v-model="event.event_mode" name="event_mode">
        <option>Conventional</option>
        <option>Virtual</option>
      </select>
      <div v-if="event.event_mode === 'Virtual'">
        <label class="mt-4 block">Virtual Event Details</label>
        <div class="flex mb-4">
          <select
            v-model="event.audience_mode"
            name="audience_mode"
            class="mr-4"
          >
            <option>Watching</option>
            <option>Joining</option>
          </select>
          <select
            v-if="this.$auth.loggedIn && $auth.user.role === 'admin'"
            v-model="event.reach"
            name="reach"
          >
            <option>Local</option>
            <option>Global</option>
          </select>
        </div>
        <div class="flex">
          <div v-if="event.audience_mode === 'Watching'">
            <select
              id="virtual_host"
              v-model="event.virtual_host"
              name="virtual_host"
              placeholder="virtual host"
            >
              <option></option>
              <option>Facebook</option>
              <option>YouTube</option>
              <option>Instagram</option>
              <option>Zoom</option>
              <option>Periscope</option>
              <option>UStream</option>
              <option>Livestream</option>
              <option>Online</option>
            </select>
          </div>
          <div v-else>
            <select
              id="virtual_host"
              v-model="event.virtual_host"
              name="virtual_host"
              placeholder="virtual host"
            >
              <option>Zoom</option>
              <option>Skype</option>
              <option>GoToMeeting</option>
              <option>Hangouts</option>
              <option>U Meeting</option>
              <option>Bluejeans</option>
              <option>Altspace</option>
              <option>Other</option>
            </select>
          </div>

          <input
            id="virtual_url"
            v-model="event.virtual_url"
            name="virtual_url"
            placeholder="url for virtual event"
            class="mx-3"
          />
          <div class="flex">
            <input
              id="collaborative"
              v-model="has_virtual_password"
              name="has_virtual_password"
              type="checkbox"
            />

            <label for="collaborative">password</label>
          </div>

          <div v-if="has_virtual_password">
            <input
              v-model="event.virtual_password"
              name="virtual_password"
              placeholder="password"
              class="flex-none ml-3"
            />
          </div>
        </div>
      </div>
      <div v-if="event.event_mode === 'Conventional'">
        <label class="mt-4 block">Street Address</label>
        <input
          id="address"
          v-model="event.address"
          class="block w-full"
          name="address"
          placeholder="street address"
        />
      </div>
    </div>

    <label class="custom-label flex mt-5">
      <div
        class="bg-white shadow w-6 h-6 p-1 flex justify-center items-center mr-2"
      >
        <input
          v-model="event.has_age_restriction"
          type="checkbox"
          class="hidden"
          name="has_age_restriction"
        />
        <svg
          class="hidden w-4 h-4 text-green-600 pointer-events-none"
          viewBox="0 0 172 172"
        >
          <g
            fill="none"
            stroke-width="none"
            stroke-miterlimit="10"
            font-family="none"
            font-weight="none"
            font-size="none"
            text-anchor="none"
            style="mix-blend-mode:normal"
          >
            <path d="M0 172V0h172v172z" />
            <path
              d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z"
              fill="currentColor"
              stroke-width="1"
            />
          </g>
        </svg>
      </div>
      <span class="select-none">This event has an age restriction </span>
    </label>
    <div v-if="event.has_age_restriction">
      <label class="mt-4 block">min age</label>
      <input v-model="event.ages" name="ages" placeholder="age restriction" />
    </div>
    <label class="custom-label flex mt-5">
      <div
        class="bg-white shadow w-6 h-6 p-1 flex justify-center items-center mr-2"
      >
        <input
          v-model="event.requires_rsvp"
          type="checkbox"
          name="requires_rsvp"
          class="hidden"
        />
        <svg
          class="hidden w-4 h-4 text-green-600 pointer-events-none"
          viewBox="0 0 172 172"
        >
          <g
            fill="none"
            stroke-width="none"
            stroke-miterlimit="10"
            font-family="none"
            font-weight="none"
            font-size="none"
            text-anchor="none"
            style="mix-blend-mode:normal"
          >
            <path d="M0 172V0h172v172z" />
            <path
              d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z"
              fill="currentColor"
              stroke-width="1"
            />
          </g>
        </svg>
      </div>
      <span class="select-none"
        >This event requires a rsvp or registration
      </span>
    </label>
    <div v-if="event.requires_rsvp">
      <label class="mt-4 block mb-2">capacity</label>
      <input
        v-model="event.capacity"
        name="capacity"
        placeholder="capacity"
        type="number"
      />
      <label class="mt-4 block mb-2">url for tickets or registration</label>
      <input
        v-model="event.ticket_url"
        name="ticket_url"
        placeholder="url for tickets or registration"
        type="text"
        class="w-full block"
      />
    </div>
    <label class="custom-label flex mt-5">
      <div
        class="bg-white shadow w-6 h-6 p-1 flex justify-center items-center mr-2"
      >
        <input
          v-model="event.has_fee"
          name="has_fee"
          type="checkbox"
          class="hidden"
          checked
        />
        <svg
          class="hidden w-4 h-4 text-green-600 pointer-events-none"
          viewBox="0 0 172 172"
        >
          <g
            fill="none"
            stroke-width="none"
            stroke-miterlimit="10"
            font-family="none"
            font-weight="none"
            font-size="none"
            text-anchor="none"
            style="mix-blend-mode:normal"
          >
            <path d="M0 172V0h172v172z" />
            <path
              d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z"
              fill="currentColor"
              stroke-width="1"
            />
          </g>
        </svg>
      </div>
      <span class="select-none">This event has a fee for admission </span>
    </label>
    <div v-if="event.has_fee">
      <label class="mt-4 block">Price</label>
      <input
        v-model="event.price"
        name="price"
        placeholder="price"
        type="text"
      />
    </div>
    <div class="border-b border-gray-700 py-5">
      <h3 class="pb-4 text-2xl">Attachments</h3>
      <p class="my-2">
        Paste in as many links as you want; each will be added as an attachment
      </p>
      <input
        v-model="url"
        type="text"
        name="url"
        placeholder="attach a url"
        @blur="scrapeUrlLink"
        @paste="paste"
        @input="scrapeUrlLink"
      />

      <div v-if="isScraping" class="spinner">Loading..</div>
      <div class="grid grid-cols-3">
        <ThLinkSummary
          v-for="link in event.url_attachments"
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
    </div>
    <div class="flex mt-5">
      <button
        class="p-3 bg-primary-80 rounded-md block text-lg text-white uppercase"
      >
        save
      </button>
      <div
        class="mt-3 ml-8 text-white text-sm cursor-pointer hover:text-primary-70"
        @click="$router.back()"
      >
        cancel
      </div>
    </div>
  </form>
</template>

<script>
import Multiselect from 'vue-multiselect'
import ThLinkSummary from '@/components/ThLinkSummary'
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
  name: 'ThEventForm',

  components: {
    ThLinkSummary,
    Multiselect
  },

  props: {
    event: {
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
      has_virtual_password: false,
      // dummy data, will load real info later
      classificationOptions: [],
      // dummy data, will load real info later
      categoryOptions: [],
      image: '',
      url: '',
      isScraping: false,
      isClassifying: false,
      isPaste: false
    }
  },
  computed: {
    submitFunc() {
      return this.submitMode === 'save' ? this.saveEvent : this.updateEvent
    }
  },
  mounted() {
    if (this.event.image_url) {
      this.image = this.event.image_url
    }
    this.$api.$get(`/categories/index`).then((response) => {
      this.categoryOptions = response.categories
    })
    this.$api.$get(`/classifications/index`).then((response) => {
      this.classificationOptions = response.classifications
    })
  },
  methods: {
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
      this.event.image_url = ''
    },
    classifyEvent() {
      this.isClassifying = true
      this.$api
        .$get('/classify?text=' + this.event.description)
        .then((response) => {
          // eslint-disable-next-line no-console
          console.log(response.classifications)
          this.event.classifications = response.classifications
          this.isClassifying = false
          this.categorizeEvent()
        })
    },
    categorizeEvent() {
      this.isClassifying = true
      const classificationIds = this.event.classifications.map(
        (obj) => obj.name
      )
      this.$api
        .$get('/categorize?classifications=' + classificationIds)
        .then((response) => {
          this.event.categories = response.categories
          this.isClassifying = false
        })
    },
    scrapeEvent(url) {
      this.$api
        .$get('/scrape-event?url=' + this.event.event_url)
        .then((response) => {
          // eslint-disable-next-line no-console
          this.event.url_attachments.push({
            title: response.title,
            description: response.description,
            image_url: response.image_url,
            url: this.event.event_url,
            link_type: 'website'
          })
          if (this.event.title === '') {
            this.event.title = response.title
          }
          if (this.event.description === '') {
            this.event.description = response.description
            this.classifyEvent()
          }
          if (this.event.image_url === '') {
            this.event.image_url = response.image_url
            this.image = this.event.image_url
          }

          this.event.date = response.start_time.split('T')[0]
          this.event.start_time = response.start_time.split('T')[1]
        })
    },
    paste() {
      this.isPaste = true
    },
    updateSelected() {
      // this should not be necessary, was working before without it!!
      this.$forceUpdate()
    },
    loadUrlImage() {
      this.image = this.event.image_url
    },
    scrapeTitleLink() {
      if (this.event.title.includes('http')) {
        this.url = this.event.title
        this.event.title = ''
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
              this.event.url_attachments = [
                ...response.links,
                ...this.event.url_attachments
              ]
              if (this.event.title === '') {
                this.event.title = this.event.url_attachments[0].title
              }
              if (this.event.description === '') {
                this.event.description = this.event.url_attachments[0].description
                this.classifyEvent()
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
          .$get('/scrape-links?text=' + this.event.description)
          .then((response) => {
            this.event.url_attachments = [
              ...response.links,
              ...this.event.url_attachments
            ]
            if (this.event.title === '') {
              this.event.title = this.event.url_attachments[0].title
              this.event.description = this.event.url_attachments[0].description
              this.classifyEvent()
            }
          })
          .catch((response) => {
            this.$toast.error(response.message)
          })
      }
    },
    removeAttachment(title) {
      this.event.url_attachments = this.event.url_attachments.filter(
        (x) => x.title !== title
      )
    },
    saveEvent() {
      const dateParts = document.getElementById('date-input').value.split('-')
      const timestamp = this.toTimestamp(
        `${dateParts[0]} ${dateParts[1]} ${dateParts[2]} ${this.event.start_time}`
      )
      const endTimestamp = this.toTimestamp(
        `${dateParts[0]} ${dateParts[1]} ${dateParts[2]} ${this.event.end_time}`
      )
      if (this.validateFields()) {
        const form = document.getElementById('new-event')
        const fileField = document.getElementById('event-image')
        const classificationIds = this.event.classifications.map(
          (obj) => obj.id
        )
        const categoryIds = this.event.categories.map((obj) => obj.id)
        const formData = new FormData(form)
        formData.append('classification_ids', classificationIds)
        formData.append('category_ids', categoryIds)

        formData.append('timestamp', timestamp)
        if (this.event.end_time.length > 0) {
          formData.append('end_timestamp', endTimestamp)
        }
        const formLinks = JSON.stringify(this.event.url_attachments)
        formData.append('links', formLinks)

        if (fileField && fileField.files[0]) {
          formData.append('image', fileField.files[0])
        }

        this.$api.$post('/possibilities/create', formData).then((response) => {
          const slug = response.slug
          this.event = {}
          this.$nuxt.$router.replace({ path: `/events/${slug}` })
        })
      }
    },
    updateEvent() {
      const dateParts = document.getElementById('date-input').value.split('-')
      const timestamp = this.toTimestamp(
        `${dateParts[0]} ${dateParts[1]} ${dateParts[2]} ${this.event.start_time}`
      )
      const endTimestamp = this.toTimestamp(
        `${dateParts[0]} ${dateParts[1]} ${dateParts[2]} ${this.event.end_time}`
      )
      if (this.validateFields()) {
        const form = document.getElementById('new-event')
        const fileField = document.getElementById('event-image')
        const classificationIds = this.event.classifications.map(
          (obj) => obj.id
        )
        const categoryIds = this.event.categories.map((obj) => obj.id)
        const formData = new FormData(form)
        formData.append('classification_ids', classificationIds)
        formData.append('category_ids', categoryIds)
        formData.append('timestamp', timestamp)
        formData.append('end_timestamp', endTimestamp)
        formData.append('image_url', this.event.image_url)
        const formLinks = JSON.stringify(this.event.url_attachments)
        formData.append('links', formLinks)

        if (fileField && fileField.files[0]) {
          formData.append('image', fileField.files[0])
        }

        this.$api
          .$patch('/possibilities/' + this.event.id, formData)
          .then((response) => {
            const slug = response.slug
            this.event = {}
            this.$nuxt.$router.replace({ path: `/events/${slug}` })
          })
      }
    },
    validateFields() {
      let valid = true
      /*
      if (this.event.event_mode === 'Virtual') {
        if (this.event.virtual_host === '') {
          valid = false
          document.getElementById('virtual_host').classList.add('required')
          this.$toast.error('Virtual host required')
        }
      }
      */
      if (this.event.event_mode === 'Conventional') {
        if (this.event.address === '') {
          valid = false
          document.getElementById('address').classList.add('required')
          this.$toast.error('Address required')
        }
      }

      if (this.event.date === '') {
        valid = false
        this.$toast.error('Please enter a date')
      }
      if (this.event.start_time === '') {
        valid = false
        this.$toast.error('Please enter a time')
      }
      return valid
    },
    toTimestamp(strDate) {
      const datum = Date.parse(strDate)
      return datum / 1000
    }
  }
}
</script>

<style scoped>
.required {
  background: red;
  color: white;
}
input,
textarea {
  @apply p-3 bg-dark-90 text-white text-lg border-white border w-full;
}
select {
  @apply p-3 h-10 bg-dark-90 text-white text-lg border-white border;
}
.dropdown {
  @apply text-white;
}
label,
h2,
h3 {
  @apply text-gray-600 mb-1;
}
</style>
