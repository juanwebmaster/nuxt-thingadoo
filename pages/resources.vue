<template>
  <div class="Resources">
    <div v-if="!detailVisible || breakpoints.largeOrBigger">
      <ThResourceIntro class="mb-4 mx-5"></ThResourceIntro>
    </div>
    <div class="flex h-full">
      <ThResourceList
        v-if="breakpoints.largeOrBigger"
        :resources="resources"
        :component-name="'ThResourceListItem'"
        class="w-2/5 mx-8 flex-initial"
        @showDetail="showDetail"
      />

      <ThResourceList
        v-if="!detailVisible && breakpoints.largeSmaller"
        :resources="resources"
        :component-name="'ThMobileResourceListItem'"
        class="w-full mx-0 flex-initial"
        @showDetail="detailVisible = true"
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
        @hideDetail="detailVisible = false"
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
import { mapGetters } from 'vuex'
import ThResourceList from '@/components/ThResourceList'
import ThResourceIntro from '@/components/ThResourceIntro'
export default {
  layout: 'feed',
  components: {
    ThResourceList,
    ThResourceIntro
  },
  async asyncData({ store, params }) {
    const resourceList = await store.dispatch('resource/list')
    return { resources: resourceList }
  },
  data() {
    return {
      detailVisible: false
    }
  },
  computed: {
    event() {
      return this.$store.getters['resource/detail']
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
  methods: {
    showDetail() {
      this.detailVisible = true
      this.$store.commit('ui/SET_DETAIL_VISIBILITY', this.detailVisible)
    },
    hideDetail() {
      this.detailVisible = false
      this.$store.commit('ui/SET_DETAIL_VISIBILITY', this.detailVisible)
      this.$nuxt.$router.replace({ path: `/resources` })
    }
  }
}
</script>
<style scoped>
.Resources {
  height: calc(100vh - 202px);
}
</style>
