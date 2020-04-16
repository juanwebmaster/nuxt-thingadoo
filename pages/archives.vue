<template>
  <div class="Events">
    <ThEventArchivesIntro class="mb-6" />
    <div class="flex h-full z-40">
      <ThEventList
        v-if="xlScreen || largeScreen"
        :events="events"
        :component-name="'TheEventListItem'"
        class="w-2/5 mr-0 mr-8 flex-initial"
      />

      <ThEventList
        v-if="!detailVisible && (mediumScreen || smallScreen)"
        :events="events"
        :component-name="'ThMobileEventListItem'"
        class="w-full mr-0 flex-initial"
        @showDetail="detailVisible = true"
      />

      <NuxtChild
        v-if="
          $route.params.slug &&
            detailVisible === true &&
            (smallScreen || mediumScreen)
        "
        :key="$route.params.slug"
        class="w-full flex-initial"
        keep-alive
        @hideDetail="detailVisible = false"
      />

      <NuxtChild
        v-if="$route.params.slug && (largeScreen || xlScreen)"
        :key="$route.params.slug"
        class="w-3/5 flex-initial"
        keep-alive
      />
    </div>
  </div>
</template>
<script>
// import ThEventFilter from '@/components/ThEventFilter'
import ThEventList from '@/components/ThEventList'
import ThEventArchivesIntro from '@/components/ThEventArchivesIntro'
export default {
  layout: 'feed',
  components: {
    ThEventList,
    ThEventArchivesIntro
  },
  async asyncData({ store, params }) {
    store.dispatch('event/set_filters', { mode: params.mode })
    const eventList = await store.dispatch('event/list')
    return { events: eventList }
  },
  computed: {
    event() {
      return this.$store.getters['event/detail']
    },
    smallScreen() {
      return ['phone', 'sm'].includes(this.$mq)
    },
    mediumScreen() {
      return ['md'].includes(this.$mq)
    },
    largeScreen() {
      return ['lg', 'xl'].includes(this.$mq)
    },
    xlScreen() {
      return ['xxl', 'xxxl'].includes(this.$mq)
    }
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.log(this.$route.params)
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
