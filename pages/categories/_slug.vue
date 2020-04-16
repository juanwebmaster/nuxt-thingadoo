<template>
  <div class="flex flex-no-wrap">
    <div class="w-1/2 flex-grow mx-5">
      <ThCategoryDetail
        v-if="!pageState.itemActive || breakpoints.largeOrBigger"
        :category="category"
        @hideDetail="hideDetail"
        @loadDetail="loadDetail"
      ></ThCategoryDetail>
    </div>
    <div
      v-if="!pageState.itemActive && breakpoints.largeOrBigger"
      class="ml-8 w-1/2 bg-dark flex-initial"
    >
      <ThCategoryOverview :category="category"></ThCategoryOverview>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ThCategoryDetail from '@/components/ThCategoryDetail'
import ThCategoryOverview from '@/components/ThCategoryOverview'
export default {
  components: {
    ThCategoryDetail,
    ThCategoryOverview
  },
  props: {
    showOverview: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      category: {}
    }
  },
  computed: {
    ...mapGetters({
      display: 'ui/display',
      breakpoints: 'ui/breakpoints',
      pageState: 'categories/display'
    })
  },
  created() {
    this.$api
      .$get(`/categories/${this.$route.params.slug}`)
      .then((response) => {
        this.category = response
      })
  }
}
</script>

<style></style>
