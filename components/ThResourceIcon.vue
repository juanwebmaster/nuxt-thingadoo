<template>
  <component :is="icon" class="text-white" />
</template>
<script>
import Map from '~/assets/images/resources/map.svg'
import Document from '~/assets/images/resources/document.svg'
import Video from '~/assets/images/resources/video.svg'
import Website from '~/assets/images/resources/website.svg'

export default {
  name: 'ThIcon',
  components: {
    Document,
    Video,
    Website,
    Map
  },
  props: {
    icon: {
      type: String,
      required: true,
      default: null
    }
  }
}
</script>
