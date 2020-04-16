<template>
  <div
    class="bg-dark min-h-full rounded-tl-md rounded-tr-md overflow-y-scroll leading-tight px-5 pb-10"
  >
    <div class="flex items-center py-5">
      <ThEventDate :date="event.start_time" />

      <h1
        class="flex-grow text-white text-2xl leading-tight whitespace-no-wrap overflow-x-hidden mr-4 ml-2"
      >
        {{ event.title }}
      </h1>
      <ThShareItem :item="event" label-text="Share"></ThShareItem>
    </div>
    <div class="flex px-5">
      <ThEventCoverLarge
        v-if="event.image_url"
        :image="event.image_url"
        width="1/3"
        height="48"
      />
      <div
        v-else
        class="w-2/5 h-48 bg-white bg-cover"
        :style="{
          backgroundImage: 'url(' + require('@/assets/images/Misc.jpg') + ')'
        }"
      ></div>
      <div class="w-3/5 ml-5">
        <div class="flex">
          <h4 class="flex-grow text-lg mb-4">Event Details</h4>
        </div>

        <ThEventDetailInfo
          icon="calendar"
          :title="$moment(event.start_time).format('llll')"
        />
        <ThEventDetailTime
          icon="clock"
          :start="$moment(event.start_time).format('h:mm A')"
          :end="
            event.end_time ? $moment(event.end_time).format('h:mm A') : null
          "
        />
        <div v-if="event.event_mode === 'Virtual'">
          <ThEventDetailInfo icon="MapPin" :title="addressInfo" />
          <ThEventDetailInfo
            v-if="event.virtual_url"
            icon="MapPin"
            :title="event.virtual_url"
          />
        </div>
        <div v-else>
          <ThEventDetailInfo icon="MapPin" :title="event.address" />
        </div>
        <div v-if="hasTicketUrl">
          <ThEventDetailInfo icon="MapPin" :title="event.ticket_url" />
        </div>
      </div>
    </div>
    <div class="p-5 border-b border-dark-90">
      <ThEventDetailActions :event="event" />
    </div>

    <div class="p-10 border-b border-dark-90 linkable">
      <div class="flex">
        <h3 class="text-xl text-gray-400 mb-4 mr-5">{{ event.title }}</h3>
        <ThShareItemSimple :item="event"></ThShareItemSimple>
      </div>
      <span
        v-linkified
        class="text-lg leading-normal"
        style="white-space: pre-wrap"
        >{{ event.description }}</span
      >
      <div class="grid grid-cols-2 mt-10">
        <ThLinkSummary
          v-for="link in event.url_attachments"
          :id="link.id"
          :key="link.id"
          :title="link.title"
          :description="link.description"
          :image-url="link.image_url"
          :link-url="link.url"
          :link-type="link.link_type"
          :video-id="link.video_id"
          :saved="true"
        >
        </ThLinkSummary>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ThEventDate from './ThEventDate'
import ThEventCoverLarge from './ThEventCoverLarge'
import ThEventDetailActions from './ThEventDetailActions'
import ThEventDetailInfo from './ThEventDetailInfo'
import ThEventDetailTime from './ThEventDetailTime'
import ThShareItem from './ThShareItem'
import ThShareItemSimple from './ThShareItemSimple'
import ThLinkSummary from '@/components/ThLinkSummary'

export default {
  name: 'ThEventDetail',
  components: {
    ThEventDate,
    ThEventCoverLarge,
    ThEventDetailActions,
    ThEventDetailInfo,
    ThEventDetailTime,
    ThLinkSummary,
    ThShareItem,
    ThShareItemSimple
  },
  props: {
    event: {
      type: Object,
      default: null
    }
  },
  computed: {
    hasTicketUrl() {
      return this.event.ticket_url && this.event.ticket_url.includes('http')
    },
    style() {
      return this.event.image_url ? `w-2/3` : `w-full`
    },
    addressInfo() {
      let addr = ''
      if (this.event.event_mode === 'Virtual') {
        addr = this.event.virtual_host
      }

      return addr
    },
    ...mapGetters({
      display: 'ui/display',
      breakpoints: 'ui/breakpoints'
    })
  }
}
</script>
<style scoped>
.linkable a {
  color: blue;
}
</style>
