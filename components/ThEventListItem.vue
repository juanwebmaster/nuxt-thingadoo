<template>
  <div
    class="Envet__item hover:bg-dark bg-dark-80 transition duration-500 ease-in-out cursor-pointer border-b border-dark-90 carousel min-h-carousel"
  >
    <NuxtLink :to="`/events/${slug}`">
      <div class="flex justify-between py-3">
        <ThEventDate :date="date" class="flex-none" />
        <div class="flex-grow">
          <div class="flex">
            <a href="/" class="text-xl block text-gray-400 leading-tight">{{
              title
            }}</a>
          </div>
          <span class="block">{{ $moment(date).format('llll') }}</span>
          <a href="/">{{ address }}</a>
          <p>{{ location }}</p>
        </div>
        <ThEventCover
          v-if="image"
          :image="image"
          :label="reach || 'Global'"
          class="flex-none rounded-md ml-4 mr-6"
        />
        <div
          v-else
          class="flex-none rounded-md ml-4 mr-6 w-24 h-24 bg-white bg-cover relative"
          :style="{
            backgroundImage: 'url(' + require('@/assets/images/Misc.jpg') + ')'
          }"
        >
          <span
            class="absolute bottom-0 w-full text-center text-black uppercase bg-green-500"
            >{{ reach }}</span
          >
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
<script>
import ThEventDate from './ThEventDate'
import ThEventCover from './ThEventCover'

export default {
  name: 'TheEventListItem',
  components: {
    ThEventDate,
    ThEventCover
  },
  props: {
    id: {
      type: Number,
      default: 0,
      required: true
    },
    title: {
      type: String,
      default: null,
      required: true
    },
    date: {
      type: String,
      default: null,
      required: true
    },
    address: {
      type: String,
      default: null
    },
    location: {
      type: String,
      default: null
    },
    image: {
      type: String,
      default: null
    },
    eventMode: {
      type: String,
      default: null
    },
    slug: {
      type: String,
      default: null
    },
    reach: {
      type: String,
      default: null
    }
  }
}
</script>
<style scoped>
.carousel {
  width: auto !important;
  display: flex !important;
}
</style>
