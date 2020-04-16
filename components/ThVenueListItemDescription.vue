<template>
  <div>
    <h3 class="text-xl text-white block">{{ title }}</h3>
    <p>{{ address }}</p>
    <p>{{ location }}</p>
  </div>
</template>
<script>
export default {
  name: 'ThVenueListItemDescription',
  props: {
    title: {
      type: String,
      default: null,
      required: true
    },
    location: {
      type: String,
      default: null
    },
    address: {
      type: String,
      default: null
    }
  }
}
</script>
