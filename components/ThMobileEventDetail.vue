<template>
  <div
    class="lg:bg-dark min-h-full rounded-tl-md rounded-tr-md overflow-y-scroll leading-tight px-5"
  >
    <div class="flex items-center py-5">
      <div @click="$emit('hideDetail')">
        <ThIcon
          :icon="'LeftArrow'"
          class="cursor-pointer w-8 h-8 mr-3 fill-current"
        />
      </div>

      <h1
        class="flex-grow text-white text-2xl leading-tight whitespace-no-wrap overflow-x-hidden mr-4"
      >
        {{ event.title }}
      </h1>
    </div>
    <div class="mb-4 border-b border-dark-90 flex">
      <ThShareItem :item="event" label-text="Share"></ThShareItem>
      <ThEventDetailActions :event="event" />
    </div>
    <div class="flex">
      <ThEventCoverFull v-if="event.image_url" :image="event.image_url" />
      <div
        v-else
        class="w-full h-48 bg-white bg-cover"
        :style="{
          backgroundImage: 'url(' + require('@/assets/images/Misc.jpg') + ')'
        }"
      ></div>
    </div>
    <div class="flex py-5">
      <div>
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

    <div class="p-4 border-b bg-dark border-dark-90 linkable">
      <div class="flex">
        <h3 class="text-xl text-gray-400 mb-4 mr-5">{{ event.title }}</h3>
        <ThShareItemSimple :item="event"></ThShareItemSimple>
      </div>
      <span
        v-linkified
        class="text-xl leading-normal"
        style="white-space: pre-wrap"
        >{{ event.description }}</span
      >
      <div class="grid grid-cols-1 mt-8">
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
import ThEventCoverFull from './ThEventCoverFull'
import ThEventDetailActions from './ThEventDetailActions'
import ThEventDetailInfo from './ThEventDetailInfo'
import ThEventDetailTime from './ThEventDetailTime'
import ThShareItem from './ThShareItem'
import ThShareItemSimple from './ThShareItemSimple'
import ThIcon from './ThIcon'
import ThLinkSummary from '@/components/ThLinkSummary'

export default {
  name: 'ThEventDetail',
  components: {
    ThEventCoverFull,
    ThEventDetailActions,
    ThEventDetailInfo,
    ThEventDetailTime,
    ThLinkSummary,
    ThShareItem,
    ThShareItemSimple,
    ThIcon
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
