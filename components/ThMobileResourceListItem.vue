<template>
  <NuxtLink
    :to="`/resources/${slug}`"
    class="Envet__item hover:bg-dark pb-8 bg-dark-80 transition duration-500 ease-in-out cursor-pointer"
    @click.native="$emit('showDetail')"
  >
    <ThEventCoverFull
      v-if="image"
      :image="image"
      class="w-full bg-center bg-cover"
    />

    <div class="p-4">
      <div class="flex">
        <ThResourceIcon
          :icon="pageType.replace(/^\w/, (c) => c.toUpperCase())"
          class="w-6 h-6 mr-4 mt-1 text-gray fill-current flex-none"
        />
        <h3 class="text-xl text-gray-400 mt-1 flex-grow leading-tight">
          {{ title }}
        </h3>
      </div>
      <div class="flex">
        <p class="mt-3 w-full">{{ description }}</p>
      </div>
    </div>
    <div class="pb-4 border-b-4 border-black"></div>
  </NuxtLink>
</template>
<script>
import ThEventCoverFull from './ThEventCoverFull'
import ThResourceIcon from './ThResourceIcon'
export default {
  name: 'ThMobileResourceListItem',
  components: {
    ThEventCoverFull,
    ThResourceIcon
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
    description: {
      type: String,
      default: null,
      required: true
    },
    image: {
      type: String,
      default: null
    },
    pageType: {
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
