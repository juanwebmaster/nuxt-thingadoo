<template>
  <NuxtLink
    :to="`/events/${slug}`"
    class="Envet__item hover:bg-dark bg-dark-80 transition duration-500 ease-in-out cursor-pointer border-b border-dark-90"
    @click.native="$emit('showDetail')"
  >
    <ThEventCoverFull :image="image" class="w-full bg-center bg-cover" />

    <div class="flex p-4">
      <ThEventDate :date="date" />
      <div>
        <a href="/" class="text-xl block text-gray-400 leading-tight">{{
          title
        }}</a>
        <span class="block">{{ $moment(date).format('llll') }}</span>
        <a href="/">{{ address }}</a>
        <p>{{ location }}</p>
      </div>
    </div>
    <div class="pb-4 border-b-4 border-black"></div>
  </NuxtLink>
</template>
<script>
import ThEventDate from './ThEventDate'
import ThEventCoverFull from './ThEventCoverFull'

export default {
  name: 'TheEventListItem',
  components: {
    ThEventDate,
    ThEventCoverFull
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
    }
  }
}
</script>
