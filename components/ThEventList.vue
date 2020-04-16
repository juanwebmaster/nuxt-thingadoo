<template>
  <perfect-scrollbar
    ref="eventListScroll"
    class="bg-dark-80 min-h-full rounded-tl-md rounded-tr-md overflow-y-scroll"
  >
    <div>
      <component
        :is="componentName"
        v-for="event in events"
        :id="event.id"
        :key="`event-item-${event.id}`"
        :date="event.start_time"
        :title="event.title"
        :address="event.address"
        :location="event.location"
        :image="event.image_url"
        :event-mode="event.event_mode"
        :reach="event.reach"
        :slug="event.slug"
        @showDetail="$emit('showDetail')"
      />
    </div>
  </perfect-scrollbar>
</template>
<script>
import TheEventListItem from './ThEventListItem'
import ThMobileEventListItem from './ThMobileEventListItem'

export default {
  name: 'ThEventList',
  components: {
    TheEventListItem,
    ThMobileEventListItem
  },
  props: {
    events: {
      type: Array,
      default: null
    },
    componentName: {
      type: String,
      default: 'ThEventListItem'
    }
  }
}
</script>
