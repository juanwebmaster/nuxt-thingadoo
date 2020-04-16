<template>
  <ThEventDetail v-if="breakpoints.largeOrBigger" :event="event" />
  <ThMobileEventDetail
    v-else
    :event="event"
    @hideDetail="$emit('hideDetail')"
  />
</template>
<script>
import { mapGetters } from 'vuex'
import ThEventDetail from '@/components/ThEventDetail'
import ThMobileEventDetail from '@/components/ThMobileEventDetail'

export default {
  components: {
    ThEventDetail,
    ThMobileEventDetail
  },
  async asyncData({ params, store, env, error }) {
    const event = await store.dispatch('event/getById', { id: params.slug })
    return { event }
  },
  computed: {
    ...mapGetters({
      display: 'ui/display',
      breakpoints: 'ui/breakpoints'
    })
  },

  head() {
    return {
      meta: [
        {
          hid: 'title',
          name: 'tile',
          content: this.event.title + ' | Thingadoo Events'
        },
        {
          hid: 'og:title',
          name: 'og:tile',
          content: this.event.title + ' | Thingadoo Events'
        },
        {
          hid: 'description',
          name: 'description',
          content: this.event.description
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.event.description
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.event.description
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: this.event.url
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: this.event.image_url
        },
        {
          hid: 'og:type',
          name: 'og:type',
          content: 'article'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.event.classifications.map((x) => x.label)
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
