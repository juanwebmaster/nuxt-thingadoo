<template>
  <nav class="mt-5 ml-3">
    <ul class="border-b border-gray-800 pb-3 mb-4">
      <li v-for="(item, k) in items1" :key="`nav-item-${k}`" class="h-12">
        <nuxt-link
          class="transition duration-500 ease-in-out text-lg d-block flex p-2 hover:bg-primary hover:text-white rounded-tl-md rounded-bl-md"
          :to="item.link"
          @click.native="$emit('toggleMenu')"
        >
          <ThIcon :icon="item.icon" class="w-6 h-6 mr-3" /> {{ item.title }}
        </nuxt-link>
      </li>
    </ul>
    <ul class="border-b border-gray-800 pb-3 mb-4">
      <li class="h-12">
        <nuxt-link
          class="transition duration-500 ease-in-out text-lg d-block flex p-2 hover:bg-primary hover:text-white rounded-tl-md rounded-bl-md"
          :to="{ name: 'events', params: { mode: 'future' } }"
          @click.native="$emit('toggleMenu')"
        >
          <ThIcon :icon="'Feed'" class="w-6 h-6 mr-3" /> Virtual Events
        </nuxt-link>
      </li>
      <li class="h-12">
        <nuxt-link
          class="transition duration-500 ease-in-out text-lg d-block flex p-2 hover:bg-primary hover:text-white rounded-tl-md rounded-bl-md"
          :to="{ name: 'resources' }"
          @click.native="$emit('toggleMenu')"
        >
          <ThIcon :icon="'Feed'" class="w-6 h-6 mr-3" /> Virtual Activities
        </nuxt-link>
      </li>
    </ul>
    <ul class="border-b border-gray-800 pb-3 mb-4">
      <li v-for="(item, k) in items3" :key="`nav-item-${k}`" class="h-12">
        <nuxt-link
          class="transition duration-500 ease-in-out text-lg d-block flex p-2 hover:bg-primary hover:text-white rounded-tl-md rounded-bl-md"
          :to="item.link"
          @click.native="$emit('toggleMenu')"
        >
          <ThIcon :icon="item.icon" class="w-6 h-6 mr-3" /> {{ item.title }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>
<script>
import ThIcon from './ThIcon'
export default {
  name: 'ThSidebarNav',
  components: {
    ThIcon
  },
  data() {
    return {
      items1: [{ icon: 'Home', title: 'Home', link: '/' }],
      items2: [
        { icon: 'Feed', title: 'Virtual Events', link: '/events' },
        {
          icon: 'Tags',
          title: 'Recent Livestreams',
          link: '/events'
        },
        { icon: 'Feed', title: 'Local   Resources', link: '/resources' }
      ],

      items3: [{ icon: 'Tags', title: 'Categories', link: '/categories' }]
    }
  }
}
</script>
<style lang="postcss">
.nuxt-link-exact-active {
  @apply bg-dark text-white;
}
</style>
