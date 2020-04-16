<template>
  <nav class="mt-5 ml-3">
    <ul class="border-b border-gray-800 pb-3 mb-4">
      <li class="flex items-center h-16">
        <nuxt-link
          class="transition duration-500 ease-in-out text-lg d-block flex items-center font-bold text-white p-2 hover:bg-primary hover:text-white rounded-tl-md rounded-bl-md"
          :to="{ name: 'events', params: { mode: 'future' } }"
          @click.native="$emit('toggleMenu')"
        >
          <ThIcon :icon="'Back'" class="w-6 h-6 mr-3" />
          Categories
        </nuxt-link>
      </li>
      <li
        v-for="category in categories.slice(0, 8)"
        :id="category.id"
        :key="`category-item-${category.id}`"
        class="flex items-center h-16"
      >
        <nuxt-link
          class="transition duration-500 ease-in-out text-lg d-block flex items-center p-2 pl-6 hover:bg-primary hover:text-white rounded-tl-md rounded-bl-md"
          :to="{ name: 'events', params: { mode: 'future' } }"
          @click.native="$emit('toggleMenu')"
        >
          <ThIcon
            :icon="`${extractSlug(category.slug)}`"
            class="w-6 h-6 mr-3"
          />
          {{ category.title }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>
<script>
import ThIcon from './ThIcon'
export default {
  name: 'ThSidebarSubNav',
  components: {
    ThIcon
  },
  data() {
    return {
      categories: []
    }
  },
  mounted() {
    this.updateCategories()
  },
  methods: {
    async updateCategories() {
      const data = await this.$store.dispatch('homepage/list')
      this.categories = data.categories
    },
    extractSlug(slug) {
      const array = slug.split('-')
      return array[0]
    }
  }
}
</script>
<style lang="postcss">
.nuxt-link-exact-active {
  @apply bg-dark text-white;
}
</style>
