<template>
  <div
    class="p-5 hover:bg-dark transition duration-500 ease-in-out cursor-pointer border-b border-dark-90"
  >
    <div>
      <div class="mb-8">
        <div class="flex">
          <ThResourceIcon
            :icon="pageType.replace(/^\w/, (c) => c.toUpperCase())"
            class="w-16 h-16 mr-5 mt-3 text-gray fill-current flex-none"
          />
          <div class="flex-grow">
            <div>
              <h3 class="text-xl text-gray-400 flex-grow leading-tight">
                {{ title }}
              </h3>
              <p class="mt-2">{{ description }}</p>
            </div>
          </div>

          <ThEventCover :image="image" class="flex-none rounded-md ml-4 mr-6" />
        </div>
        <div v-if="userId === user.id">
          <nuxt-link :to="{ name: 'edit-resource', params: { slug: slug } }"
            >edit</nuxt-link
          >
          <button @click="$emit('delete', id)">delete</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ThEventCover from './ThEventCover'
import ThResourceIcon from './ThResourceIcon'
export default {
  name: 'ThResourceListAdminItem',
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
    },
    description: {
      type: String,
      default: null
    },
    userId: {
      type: Number,
      default: null
    },
    user: {
      type: Object,
      required: true,
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
