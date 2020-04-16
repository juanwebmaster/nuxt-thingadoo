<template>
  <div>
    <ThCollectionIntro
      v-if="!$route.params.slug"
      class="mb-10"
    ></ThCollectionIntro>
    <div class="flex">
      <div class="flex-grow w-1/2">
        <div v-if="$route.params.slug">
          <NuxtChild
            :key="$route.params.slug"
            :show-overview="!showItemDetail"
            keep-alive
          />
        </div>
        <div v-else>
          <ThHomeSection
            title="Our Collections"
            sub-title="Automatically generated via code"
            url="#"
          />
          <div
            class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 mb-6"
          >
            <ThCollectionSummary
              v-for="collection in algorithmic_collections"
              :id="collection.id"
              :key="collection.id"
              :title="collection.title"
              :slug="collection.slug"
            >
            </ThCollectionSummary>
          </div>
          <ThHomeSection
            title="User-Generated Collections"
            sub-title="Hand-picked content by local curators"
            url="#"
          />
          <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
            <ThCollectionSummary
              v-for="collection in user_collections"
              :id="collection.id"
              :key="collection.id"
              :title="collection.title"
              :slug="collection.slug"
            >
            </ThCollectionSummary>
          </div>
        </div>
      </div>
      <div v-if="showItemDetail" class="w-1/2 ml-8">
        <div v-if="detailItemType === 'event'">
          <ThEventDetail class="mx-5" :event="detailItem" />
        </div>
        <div v-else-if="detailItemType === 'resource'">
          <ThResourceDetail class="mx-5" :resource="detailItem" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ThEventDetail from '@/components/ThEventDetail'
import ThResourceDetail from '@/components/ThResourceDetail'
import ThCollectionIntro from '@/components/ThCollectionIntro'
import ThCollectionSummary from '@/components/ThCollectionSummary'
import ThHomeSection from '@/components/ThHomeSection'

export default {
  components: {
    ThEventDetail,
    ThResourceDetail,
    ThCollectionIntro,
    ThCollectionSummary,
    ThHomeSection
  },
  data() {
    return {
      algorithmic_collections: [],
      user_collections: [],
      showCollectionItem: false,
      collectionItemId: false,
      collectionItem: {},
      showItemDetail: false,
      detailItemType: '',
      detailItemId: null,
      detailItem: {}
    }
  },
  created() {
    // initial load of collection
    // we can move this to a store if that's best

    this.$api.$get(`/collections/index`).then((response) => {
      this.algorithmic_collections = response.algorithmic_collections
      this.user_collections = response.user_collections
    })
  },
  methods: {
    hideCollection() {
      this.$router.replace({ name: 'collections', params: {} })
      this.showCollectionItem = false
      this.collectionItem = {}
      this.collectionItemId = null
      this.showItemDetail = false
    },
    loadDetailById(id, itemType) {
      switch (itemType) {
        case 'event':
          this.detailItemId = id
          this.$api.$get(`/possibilities/${id}`, {}).then((response) => {
            this.detailItem = response
            this.detailItemType = 'event'
            this.showItemDetail = true
          })
          break
        case 'resource':
          this.detailItemId = id
          this.$api.$get(`/resources/${id}`, {}).then((response) => {
            this.detailItem = response
            this.detailItemType = 'resource'
            this.showItemDetail = true
          })
          break
      }
    }
  },
  head() {
    return {
      meta: [
        {
          hid: 'title',
          name: 'tile',
          content: 'Community Collections | Thingadoo'
        },
        {
          hid: 'og:title',
          name: 'og:tile',
          content: 'Community Collections | Thingadoo'
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
          content: 'https://www.thingadoo.com/collections'
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
            'event, resources, organizations, information, virtual, covid, collections, curators'
        }
      ]
    }
  }
}
</script>

<style></style>
