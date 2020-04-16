<template>
  <div class="Events">
    <div v-if="!breakpoints.detailVisible || breakpoints.largeOrBigger">
      <ThEventIntro class="mb-2 mx-5"></ThEventIntro>
      <select
        v-if="!detailVisible"
        v-model="reach"
        class="text-black mx-5 text-normal mb-4"
        @change="updateFilters"
      >
        <option value="Local">Local</option>
        <option value="Global">Global</option>
      </select>
    </div>
    <div class="flex h-full">
      <ThEventList
        v-if="breakpoints.largeOrBigger"
        :events="events"
        :component-name="'TheEventListItem'"
        class="w-2/5 mr-8 flex-initial"
        @showDetail="showDetail"
      />

      <ThEventList
        v-if="!detailVisible && breakpoints.largeSmaller"
        :events="events"
        :component-name="'ThMobileEventListItem'"
        class="w-full mr-0 flex-initial"
        @showDetail="showDetail"
      />

      <NuxtChild
        v-if="
          $route.params.slug &&
            detailVisible === true &&
            breakpoints.largeSmaller
        "
        :key="$route.params.slug"
        class="w-full flex-initial"
        keep-alive
        @hideDetail="hideDetail"
      />

      <NuxtChild
        v-if="$route.params.slug && breakpoints.largeOrBigger"
        :key="$route.params.slug"
        class="w-3/5 flex-initial"
        keep-alive
      />
    </div>
  </div>
</template>
<script>
// import ThEventFilter from '@/components/ThEventFilter'
import { mapGetters } from 'vuex'
import ThEventList from '@/components/ThEventList'
import ThEventIntro from '@/components/ThEventIntro'

export default {
  layout: 'feed',
  components: {
    ThEventList,
    ThEventIntro
  },
  async asyncData({ store, params }) {
    store.dispatch('event/set_filters', { reach: 'Local' })
    const eventList = await store.dispatch('event/list')
    return { events: eventList }
  },
  data() {
    return {
      reach: 'Local',
      detailVisible: false
    }
  },
  computed: {
    event() {
      return this.$store.getters['event/detail']
    },
    ...mapGetters({
      display: 'ui/display',
      breakpoints: 'ui/breakpoints'
    })
  },
  created() {
    this.$store.commit('ui/SET_DETAIL_VISIBILITY', !!this.$route.params.slug)
    this.detailVisible = !!this.$route.params.slug
  },
  updated() {
    this.$store.commit('ui/SET_DETAIL_VISIBILITY', !!this.$route.params.slug)
    this.detailVisible = !!this.$route.params.slug
  },

  methods: {
    async updateFilters({ store, params }) {
      this.$store.dispatch('event/set_filters', { reach: this.reach })
      const eventList = await this.$store.dispatch('event/list')
      this.events = eventList
    },
    showDetail() {
      this.detailVisible = true
      this.$store.commit('ui/SET_DETAIL_VISIBILITY', this.detailVisible)
    },
    hideDetail() {
      this.detailVisible = false
      this.$store.commit('ui/SET_DETAIL_VISIBILITY', this.detailVisible)
      this.$nuxt.$router.replace({ path: `/events` })
    }
  },

  head() {
    return {
      meta: [
        {
          hid: 'title',
          name: 'tile',
          content: 'Thingadoo Virtual Events Calendar'
        },
        {
          hid: 'og:title',
          name: 'og:tile',
          content: 'Thingadoo Virtual Events Calendar'
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: 'https://www.thingadoo.com/events'
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: this.event.image_url
        },
        {
          hid: 'og:type',
          name: 'og:type',
          content: 'website'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            'event, virtual, online, community, music, classes, homeschooling, lgtbq, performance'
        }
      ]
    }
  }
}
</script>
<style scoped>
.Events {
  height: calc(100vh - 202px);
}
</style>
