<template>
  <GMap
    ref="gMap"
    :center="{ lat: lat, lng: lng }"
    :options="{ fullscreenControl: false }"
    :zoom="15"
  >
    <GMapMarker :position="{ lat: lat, lng: lng }">
      <GMapInfoWindow>
        <code> lat: {{ lat }}, lng: {{ lng }} </code>
      </GMapInfoWindow>
    </GMapMarker>
  </GMap>
</template>
<script>
export default {
  name: 'ThEventDetailMap',
  props: {
    lat: {
      type: Number,
      default: null,
      required: true
    },
    lng: {
      type: Number,
      default: null,
      required: true
    }
  }
}
</script>
<style>
.GMap__Wrapper {
  @apply h-48;
}
</style>
