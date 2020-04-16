<template>
  <div>
    <ThHomeSection
      title="Virtual Events"
      sub-title="Tune in to livestreams around the area"
      url="/events"
    />
    <div v-if="watchable_events">
      <mq-layout
        :mq="['phone', 'sm', 'md', 'lg']"
        class="flex overflow-x-scroll overflow-y-hidden"
      >
        <ThMobileEventListItem
          v-for="event in watchable_events.slice(0, 9)"
          :id="event.id"
          :key="`event-item-${event.id}`"
          :date="event.start_time"
          :title="event.title"
          :address="event.address"
          :location="event.location"
          :image="event.image_url"
          :event-mode="event.event_mode"
          :slug="event.slug"
          class="flex-none w-6/7 sm:w-5/7 md:w-4/7 lg:w-3/7 mr-5"
        />
      </mq-layout>
      <mq-layout mq="xl+" class="overflow-x-scroll overflow-y-hidden">
        <VueSlickCarousel v-bind="eventSettings">
          <TheEventListItem
            v-for="event in watchable_events.slice(0, 9)"
            :id="event.id"
            :key="`event-item-${event.id}`"
            :date="event.start_time"
            :title="event.title"
            :address="event.address"
            :location="event.location"
            :image="event.image_url"
            :event-mode="event.event_mode"
            :slug="event.slug"
            class="flex-none w-4/7 xl:w-3/7 xxl:w-2/7 mr-5"
          />
        </VueSlickCarousel>
      </mq-layout>
    </div>
    <nuxt-link
      :to="'/events'"
      class="block hover:underline text-right mb-5 text-lg mr-5"
      >see all ></nuxt-link
    >

    <ThHomeSection
      title="Collections"
      sub-title="Explore curated collections"
      url="/collections"
    />
    <div>
      <VueSlickCarousel v-bind="settings">
        <ThCollectionSummary
          v-for="collection in collections.slice(0, 8)"
          :id="collection.id"
          :key="`collection-item-${collection.id}`"
          :title="collection.title"
          :slug="collection.slug"
          :image="collection.image_url"
          class="flex-none ml-4 w-4/7 sm:w-3/7 md:w-4/9 lg:w-2/7 xl:w-1/7"
        />
      </VueSlickCarousel>
    </div>
    <nuxt-link
      :to="'/collections'"
      class="block hover:underline text-right mb-5 text-lg mr-5"
      >see all ></nuxt-link
    >
    <ThHomeSection
      title="Categories"
      sub-title="Browse content by categories"
      url="/categories"
    />
    <div>
      <VueSlickCarousel v-bind="settings">
        <ThCategorySummary
          v-for="category in categories.slice(0, 8)"
          :id="category.id"
          :key="`category-item-${category.id}`"
          :title="category.title"
          :slug="category.slug"
          class="flex-none ml-4 w-4/7 sm:w-3/7 md:w-4/9 lg:w-2/7 xl:w-1/7"
        />
      </VueSlickCarousel>
    </div>
    <nuxt-link
      :to="'/categories'"
      class="block hover:underline text-right text-lg mr-5"
      >see all ></nuxt-link
    >
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import ThCategorySummary from '@/components/ThCategorySummary'
import ThCollectionSummary from '@/components/ThCollectionSummary'
import TheEventListItem from '@/components/ThEventListItem'
import ThMobileEventListItem from '@/components/ThMobileEventListItem'
import ThHomeSection from '@/components/ThHomeSection'
export default {
  components: {
    ThHomeSection,
    ThCollectionSummary,
    TheEventListItem,
    ThMobileEventListItem,
    ThCategorySummary,
    VueSlickCarousel
  },
  async asyncData({ store, params }) {
    const data = await store.dispatch('homepage/list')
    return {
      watchable_events: data.for_watching,
      categories: data.categories,
      collections: data.collections
    }
  },
  data() {
    return {
      settings: {
        arrows: true,
        dots: false,
        slidesToShow: 4,
        responsive: [
          {
            breakpoint: 1920,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 5,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 1440,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 860,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ]
      },
      eventSettings: {
        arrows: true,
        dots: false,
        slidesToShow: 3
      }
    }
  },
  computed: {
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
  }
}
</script>
