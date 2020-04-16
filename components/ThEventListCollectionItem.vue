<template>
  <div
    class="relative Envet__item flex p-5 pl-0 hover:bg-dark transition duration-500 ease-in-out cursor-pointer border-b border-dark-90"
    @click="$emit('loadDetail', id, 'possibilities')"
  >
    <div v-if="admin" class="absolute top-0 right-0 m-4">
      <button @click="$emit('deleteFromCollection', id, 'Possibility')">
        <ThIcon :icon="'Cross'" class="w-4 h-4"></ThIcon>
      </button>
    </div>
    <ThEventDate class="ml-3" :date="date" />
    <div class="flex-grow">
      <div class="flex hover:underline">
        {{ title }}
      </div>
      <span class="block">{{ $moment(date).format('llll') }}</span>
      <a href="/">{{ address }}</a>
      <p>{{ location }}</p>
    </div>
    <ThEventCover
      v-if="image"
      :image="image"
      :label="reach || 'Global'"
      class="flex-none rounded-md ml-4"
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
</template>
<script>
import ThIcon from './ThIcon'
import ThEventDate from './ThEventDate'
import ThEventCover from './ThEventCover'

export default {
  name: 'ThEventListCollectionItem',
  components: {
    ThEventDate,
    ThEventCover,
    ThIcon
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
    admin: {
      type: Boolean,
      default: false
    }
  }
}
</script>
