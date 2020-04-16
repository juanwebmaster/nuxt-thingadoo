<template>
  <div
    class="bg-dark min-h-full rounded-tl-md rounded-tr-md overflow-y-scroll leading-tight px-5 pb-10"
  >
    <div class="flex items-center py-5">
      <ThResourceIcon
        :icon="pageType.replace(/^\w/, (c) => c.toUpperCase())"
        class="w-10 h-10 text-gray-600 flex-none fill-current"
      />

      <h1
        class="flex-grow text-white text-2xl leading-tight whitespace-no-wrap overflow-x-hidden mr-4 ml-4"
      >
        {{ resource.title }}
      </h1>
      <ThShareItem :item="resource" label-text="Share"></ThShareItem>
    </div>
    <ThEventCoverLarge
      v-if="resource.image_url"
      :image="resource.image_url"
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
    <div class="my-5">
      <ThResourceDetailActions :resource="resource"></ThResourceDetailActions>
    </div>
    <div class="flex">
      <h3 class="text-xl text-gray-400 mb-4 mr-5">{{ resource.title }}</h3>
      <ThShareItemSimple :item="resource"></ThShareItemSimple>
    </div>
    <span
      v-if="resource.description"
      v-linkified
      class="text-xl leading-normal linkable"
      style="white-space: pre-wrap;"
      >{{ resource.description }}</span
    >

    <div class="flex flex-wrap mt-10">
      <ThLinkSummary
        v-for="link in resource.url_attachments"
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
</template>

<script>
import ThShareItem from './ThShareItem'
import ThShareItemSimple from './ThShareItemSimple'
import ThResourceIcon from './ThResourceIcon'
import ThLinkSummary from '@/components/ThLinkSummary'
import ThResourceDetailActions from '@/components/ThResourceDetailActions'
import ThEventCoverLarge from '@/components/ThEventCoverLarge'
export default {
  name: 'ThResourceDetail',
  components: {
    ThLinkSummary,
    ThResourceDetailActions,
    ThShareItem,
    ThEventCoverLarge,
    ThShareItemSimple,
    ThResourceIcon
  },
  props: {
    resource: {
      type: Object,
      required: true,
      default: null
    }
  },
  computed: {
    pageType() {
      return this.resource.url_attachments[0]
        ? this.resource.url_attachments[0].link_type
        : 'website'
    }
  }
}
</script>

<style>
a.linkified {
  @apply text-blue-500;
}
.btn {
  @apply p-3 h-12 flex bg-dark-70 border border-dark-80 mr-5 uppercase leading-snug rounded-md transition duration-500 ease-in-out;
}
.btn:hover {
  @apply bg-dark-80;
}
</style>
