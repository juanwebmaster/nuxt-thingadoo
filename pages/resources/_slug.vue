<template>
  <ThResourceDetail v-if="breakpoints.largeOrBigger" :resource="resource" />
  <ThMobileResourceDetail
    v-else
    :resource="resource"
    @hideDetail="$emit('hideDetail')"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import ThResourceDetail from '@/components/ThResourceDetail'
import ThMobileResourceDetail from '@/components/ThMobileResourceDetail'
export default {
  components: {
    ThResourceDetail,
    ThMobileResourceDetail
  },
  data() {
    return {
      resource: {
        url_attachments: []
      }
    }
  },
  computed: {
    ...mapGetters({
      display: 'ui/display',
      breakpoints: 'ui/breakpoints'
    })
  },
  mounted() {
    this.$api.$get(`/resources/${this.$route.params.slug}`).then((response) => {
      this.resource = response
    })
  }
}
</script>

<style></style>
