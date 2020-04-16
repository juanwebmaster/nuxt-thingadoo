<template>
  <div v-if="isFacebookLoaded">
    <!-- Your embedded video player code -->
    <!-- Load Facebook SDK for JavaScript -->
    <div id="fb-root"></div>
    <div v-if="url">
      <div
        class="fb-video flex justify-center"
        :name="url"
        :data-href="url"
        data-height="320"
        data-show-text="false"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThFacebookVideo',
  props: {
    url: {
      type: String,
      required: true,
      default: ''
    },
    title: {
      type: String,
      required: true,
      default: ''
    }
  },
  data() {
    return {
      isFacebookLoaded: false
    }
  },
  head() {
    return {
      script: [
        {
          hid: 'facebook',
          src: 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2',
          defer: true,
          // Changed after script load
          callback: () => {
            this.isFacebookLoaded = true
          }
        }
      ]
    }
  }
}
</script>
<style scoped>
.fb_iframe_widget_fluid_desktop iframe {
  width: 200px;
  height: 400px;
}
</style>
