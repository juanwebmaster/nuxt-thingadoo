<template>
  <div
    class="Envet__item  pl-0 hover:bg-dark bg-dark-80 transition duration-500 ease-in-out cursor-pointer border-b border-dark-90"
  >
    <NuxtLink :to="`/resources/${slug}`">
      <div class="flex p-5">
        <div class="flex-grow">
          <div class="flex">
            <ThResourceIcon
              :icon="pageType.replace(/^\w/, (c) => c.toUpperCase())"
              class="w-8 h-8 mr-5 mt-2 text-gray fill-current flex-none"
            />
            <h3 class="text-xl text-gray-400 leading-tight">
              {{ title }}
            </h3>
          </div>
          <p class="mt-3 break-all">{{ description }}</p>
        </div>

        <ThEventCover :image="image" class="flex-none rounded-md ml-4 mr-6" />
      </div>
    </NuxtLink>
  </div>
</template>
<script>
import ThEventCover from './ThEventCover'
import ThResourceIcon from './ThResourceIcon'
export default {
  name: 'ThResourceListItem',
  components: { ThEventCover, ThResourceIcon },
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
  },
  data() {
    return {
      imageFile: 'Back'
    }
  },
  computed: {
    imgUrl() {
      return `@/assets/images/icons/Back.svg`
    }
  }
}
</script>
