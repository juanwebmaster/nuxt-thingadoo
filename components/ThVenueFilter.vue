<template>
  <div class="mb-6">
    <button
      v-for="(filter, k) in filters"
      :key="`filter-button-${k}`"
      class="px-4 py-2 text-sm bg-dark-70 border border-dark-80 mr-2 rounded-md hover:bg-dark-80 transition duration-500 ease-in-out "
    >
      {{ filter.title }}
    </button>
  </div>
</template>
<script>
export default {
  name: 'ThVenueFilter',
  data() {
    return {
      filters: [
        { title: 'Today', date: '' },
        { title: 'Tomorrow', date: '' },
        { title: 'This week', date: '' },
        { title: 'Next week', date: '' },
        { title: 'This weekend', date: '' },
        { title: 'This month', date: '' }
      ]
    }
  }
}
</script>
