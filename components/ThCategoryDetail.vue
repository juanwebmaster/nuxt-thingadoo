<template>
  <div>
    <div class="bg-dark p-3 mb-3 lg:p-5 lg:mb-5">
      <div class="flex">
        <div class="flex-none" @click="hideDetail">
          <ThIcon :icon="'LeftArrow'" class="cursor-pointer w-8 h-8 mr-5  " />
        </div>
        <h2 class="text-2xl text-white lg:mb-4 flex-grow">
          {{ category.title }}
        </h2>
        <ThShareItemSimple
          v-if="breakpoints.largeSmaller"
          :item="event"
        ></ThShareItemSimple>
      </div>

      <ThShareItem
        v-if="breakpoints.largeOrBigger"
        :item="category"
      ></ThShareItem>
    </div>

    <div>
      <div v-if="category.resources && category.resources.length > 0">
        <h3 class="mt-6 text-xl text-green-500">
          Resources [{{ category.resources.length }}]
        </h3>
        <div class="flex overflow-x-scroll overflow-y-hidden">
          <ThCollectionResourceHorizontalItem
            v-for="resource in category.resources"
            :id="resource.id"
            :key="`resource-item-${resource.id}`"
            :date="resource.start_time"
            :title="resource.title"
            :description="resource.description"
            :admin="userIsOwner"
            :image="
              resource.url_attachments[0]
                ? resource.url_attachments[0].image_url
                : ''
            "
            :page-type="
              resource.url_attachments[0]
                ? resource.url_attachments[0].link_type
                : 'website'
            "
            @loadDetail="loadItem"
          />
        </div>
      </div>

      <div v-if="category.possibilities && category.possibilities.length > 0">
        <h3 class="mt-6 text-xl text-green-500">
          Events [{{ category.possibilities.length }}]
        </h3>
        <ThEventListCollectionItem
          v-for="event in category.possibilities"
          :id="event.id"
          :key="`event-item-${event.id}`"
          :date="event.start_time"
          :title="event.title"
          :address="event.address"
          :location="event.location"
          :image="event.image_url"
          :event-mode="event.event_mode"
          :reach="event.reach"
          :slug="event.slug"
          @loadDetail="loadItem"
        />
      </div>
      <div v-if="category.categories && category.categories.length > 0">
        <h3 class="mt-6 text-xl text-green-500">
          Collections [{{ category.categories.length }}]
        </h3>
        <div class="flex overflow-x-scroll overflow-y-hidden">
          <ThCollectionFolderHorizontalItem
            v-for="col in category.categories"
            :id="col.id"
            :key="`col-item-${col.id}`"
            :date="event.start_time"
            :title="event.title"
            :address="event.address"
            :location="event.location"
            :image="event.image_url"
            :event-mode="event.event_mode"
            :reach="event.reach"
            @loadDetail="loadItem"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ThShareItem from './ThShareItem'
import ThShareItemSimple from './ThShareItemSimple'
import ThEventListCollectionItem from '@/components/ThEventListCollectionItem'
import ThCollectionResourceHorizontalItem from '@/components/ThCollectionResourceHorizontalItem'
import ThIcon from '@/components/ThIcon'
export default {
  components: {
    ThEventListCollectionItem,
    ThCollectionResourceHorizontalItem,
    ThShareItem,
    ThShareItemSimple,
    ThIcon
  },
  props: {
    category: {
      type: Object,
      required: true,
      default: null
    }
  },
  computed: {
    ...mapGetters({
      display: 'ui/display',
      breakpoints: 'ui/breakpoints'
    })
  },
  mounted() {
    // initial load of category
    // we can move this to a store if that's best

    this.$api.$get(`/categories/index`).then((response) => {
      this.categorys = response.categories
    })
  },
  methods: {
    loadItem(id, itemType) {
      this.$store.dispatch('categories/loadItem', {
        itemType,
        itemId: id,
        itemActive: true
      })
    },
    hideDetail() {
      this.$store.commit('categories/SET_ITEM_VISIBILITY', {
        itemActive: false
      })
      this.$nuxt.$router.replace({ path: `/categories` })
    },
    deleteItemId(id) {
      // remove from caTEGORY for admin
    }
  }
}
</script>

<style></style>
