<template>
  <div
    class="lg:bg-dark min-h-full rounded-tl-md rounded-tr-md overflow-y-scroll leading-tight px-5"
  >
    <div class="flex items-center py-5">
      <div class="large:hidden" @click="$emit('hideDetail')">
        <ThIcon
          :icon="'LeftArrow'"
          class="cursor-pointer w-8 h-8 mr-3 fill-current"
        />
      </div>

      <h1
        class="flex-grow text-white text-2xl leading-tight whitespace-no-wrap overflow-x-hidden mr-4"
      >
        hey {{ resource.title }}
      </h1>
    </div>
    <div class="mb-4 border-b border-dark-90 flex">
      <ThShareItem :item="resource" label-text="Share"></ThShareItem>
      <ThResourceDetailActions :resource="resource"></ThResourceDetailActions>
    </div>
    <ThEventCoverFull v-if="resource.image_url" :image="resource.image_url" />
    <div
      v-else
      class="w-full h-48 bg-white bg-cover"
      :style="{
        backgroundImage: 'url(' + require('@/assets/images/Misc.jpg') + ')'
      }"
    ></div>

    <div class="flex mt-5">
      <h3 class="text-xl text-gray-400 mb-4 mr-5">{{ resource.title }}</h3>
      <ThShareItemSimple :item="resource"></ThShareItemSimple>
    </div>
    <span
      v-if="resource.description"
      v-linkified
      class="text-lg leading-normal linkable"
      style="white-space: pre-wrap;"
      >{{ resource.description }}</span
    >

    <div class="grid grid-cols-1 my-6 px-3">
      <ThLinkSummary
        v-for="link in resource.url_attachments"
        :id="link.id"
        :key="link.id"
        :title="link.title"
        :description="link.description"
        :image-url="link.image_url"
        :url="link.url"
        :link-type="link.link_type"
        :video-id="link.video_id"
        :saved="true"
      >
      </ThLinkSummary>
    </div>
  </div>
</template>

<script>
import ThIcon from './ThIcon'
import ThShareItem from './ThShareItem'
import ThShareItemSimple from './ThShareItemSimple'
import ThLinkSummary from '@/components/ThLinkSummary'
import ThResourceDetailActions from '@/components/ThResourceDetailActions'
import ThEventCoverFull from '@/components/ThEventCoverFull'
export default {
  name: 'ThMobileResourceDetail',
  components: {
    ThLinkSummary,
    ThResourceDetailActions,
    ThIcon,
    ThShareItem,
    ThEventCoverFull,
    ThShareItemSimple
  },
  props: {
    resource: {
      type: Object,
      required: true,
      default: null
    }
  }
}
</script>

<style>
a.linkified {
  @apply text-blue-500;
}
</style>
