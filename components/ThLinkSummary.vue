<template>
  <div class="item m-5 max-w-sm justify-between">
    <h3 class="text-2xl text-white uppercase">{{ resourceType }}</h3>
    <div class="url h-20 overflow-y-hidden">
      <a :href="linkUrl" class="underline text-blue-300 text-xs break-all">{{
        linkUrl
      }}</a>
    </div>
    <div class="bg-dark-80 relative border border-solid border-gray-600">
      <div
        v-if="!saved"
        class="absolute right-0 mr-2 cursor-pointer"
        @click="$emit('removeAttachment', title)"
      >
        <ThIcon :icon="'Cross'" class="w-4 h-4"></ThIcon>
      </div>
      <div
        v-if="linkType.includes('video')"
        class="flex items-center justify-center w-full h-48 bg-black"
      >
        <div v-if="linkUrl.includes('facebook')">
          <ThFacebookVideo :url="linkUrl" :title="title"></ThFacebookVideo>
        </div>
        <div v-else class="w-full">
          <youtube
            player-width="100%"
            player-height="100%"
            :video-id="videoId"
          ></youtube>
        </div>
      </div>
      <div
        v-else
        class="h-48 bg-no-repeat bg-cover"
        :style="`background-image: url('${imageUrl}');`"
      ></div>
      <div
        class="description min-h-resourceDesc p-5 border border-solid border-gray-600"
      >
        <p>{{ resProvider }}</p>
        <h4 class="block w-full text-xl text-green-300">{{ title }}</h4>
      </div>
    </div>
    <a :href="url"
      ><h4 class="block mt-4 w-full text-xl text-green-300">{{ title }}</h4></a
    >
    <p class="my-2">{{ description }}</p>
    <p class="justify-end">
      <a :href="url" class="underline text-blue-300 dont-break-out text-xs"
        >{{ url }}
      </a>
    </p>
  </div>
</template>

<script>
// import youtube from 'youtube-media'
import ThFacebookVideo from '@/components/ThFacebookVideo'
import ThIcon from '@/components/ThIcon'
export default {
  name: 'ThLinkSummary',
  components: {
    ThFacebookVideo,
    ThIcon
  },
  props: {
    id: {
      type: Number,
      required: true,
      default: null
    },
    linkUrl: {
      type: String,
      required: true,
      default: null
    },
    title: {
      type: String,
      required: true,
      default: null
    },
    description: {
      type: String,
      required: true,
      default: null
    },
    imageUrl: {
      type: String,
      required: true,
      default: null
    },
    linkType: {
      type: String,
      required: true,
      default: null
    },
    videoId: {
      type: String,
      required: true,
      default: null
    },
    saved: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
      resourceType: '',
      resProvider: '',
      url: ''
    }
  },
  mounted() {
    //  Exception Error Fixed
    if (this.linkUrl) {
      const tempArray = this.linkUrl.split('/')
      this.resProvider = tempArray[2]
      const typeArray = tempArray[2].split('.')
      if (typeArray[1] !== 'com') {
        this.resourceType = typeArray[1]
      } else {
        this.resourceType = 'Website'
      }
    }
  }
}
</script>

<style>
.dont-break-out {
  /* These are technically the same, but use both */
  overflow-wrap: break-word;
  word-wrap: break-word;

  -ms-word-break: break-all;
  /* This is the dangerous one in WebKit, as it breaks things wherever */
  word-break: break-all;
  /* Instead use this non-standard one: */
  word-break: break-word;

  /* Adds a hyphen where the word breaks, if supported (No Blink) */
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
}
</style>
