<template>
  <div>
    <div class="flex">
      <div
        v-if="
          breakpoints.largeOrBigger ||
            (!pageState.itemActive && breakpoints.largeSmaller)
        "
        class="flex-grow w-1/2"
      >
        <div v-if="$route.params.slug">
          <NuxtChild
            :key="$route.params.slug"
            :show-overview="!showItemDetail"
            keep-alive
          />
        </div>
        <div v-else>
          <ThHomeSection
            title="Categories"
            sub-title="Automatically generated via code"
            class="mx-5"
            url="#"
          />

          <div
            class="mx-5 lg:mx:0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            <ThCategorySummary
              v-for="category in categories"
              :id="category.id"
              :key="category.id"
              :title="category.title"
              :slug="category.slug"
            >
            </ThCategorySummary>
          </div>
        </div>
      </div>
      <div v-if="pageState.itemActive" class="flex-grow w-1/2">
        <div v-if="pageState.activeItemType === 'possibilities'">
          <ThEventDetail
            v-if="breakpoints.largeOrBigger"
            class="lg:ml-5"
            :event="item"
          />
          <ThMobileEventDetail
            v-else
            class="lg:ml-5"
            :event="item"
            @hideDetail="hideDetail"
          />
        </div>
        <div v-if="pageState.activeItemType === 'resources'">
          <ThResourceDetail
            v-if="breakpoints.largeOrBigger"
            class="lg:ml-5"
            :resource="item"
          />
          <ThMobileResourceDetail
            v-else
            class="lg:ml-5"
            :resource="item"
            @hideDetail="hideDetail"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ThEventDetail from '@/components/ThEventDetail'
import ThResourceDetail from '@/components/ThResourceDetail'
import ThMobileEventDetail from '@/components/ThMobileEventDetail'
import ThMobileResourceDetail from '@/components/ThMobileResourceDetail'
import ThCategorySummary from '@/components/ThCategorySummary'
import ThHomeSection from '@/components/ThHomeSection'
export default {
  components: {
    ThEventDetail,
    ThResourceDetail,
    ThCategorySummary,
    ThHomeSection,
    ThMobileEventDetail,
    ThMobileResourceDetail
  },
  async asyncData({ store, params }) {
    const catList = await store.dispatch('categories/list')
    return { categories: catList }
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      display: 'ui/display',
      breakpoints: 'ui/breakpoints',
      pageState: 'categories/display',
      item: 'categories/item'
    })
  },
  methods: {
    hideDetail() {
      this.$store.commit('categories/SET_ITEM_VISIBILITY', {
        itemActive: false
      })
    }
  },

  head() {
    return {
      meta: [
        {
          hid: 'title',
          name: 'tile',
          content: 'Community Categories | Thingadoo'
        },
        {
          hid: 'og:title',
          name: 'og:tile',
          content: 'Community Categories | Thingadoo'
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: 'Events and resources curated by local experts'
        },
        {
          hid: 'description',
          name: 'description',
          content: 'Events and resources curated by local experts'
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: 'https://www.thingadoo.com/categories'
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
            'event, resources, organizations, information, virtual, covid, categories, curators'
        }
      ]
    }
  }
}
</script>

<style></style>
