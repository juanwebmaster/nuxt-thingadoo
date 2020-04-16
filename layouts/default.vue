<template>
  <div class="flex bg-dark-90">
    <ThModalUser />
    <ThModalCollection />
    <ThModalShare />
    <div id="navbar">
      <ThSidebar
        v-if="breakpoints.largeOrBigger"
        class="sticky top-0 left-0 h-screen"
      />

      <ThMobileSidebar
        v-if="breakpoints.largeSmaller && display.menuVisible"
        class="sticky top-0 left-0 right-0 h-screen w-full"
      />
    </div>

    <div
      v-if="!display.menuVisible"
      id="content"
      class="w-full lg:pt-5 lg:px-6 overflow-hidden"
    >
      <ThTopBar class="sticky absolute top-0 bg-dark-90" />
      <transition name="slide-left" mode="out-in">
        <nuxt class="mt-4 overflow-scroll-y" />
      </transition>
      <ThFooter />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ThSidebar from '~/components/ThSidebar'
import ThMobileSidebar from '~/components/ThMobileSidebar'
import ThTopBar from '~/components/ThTopbar'
import ThModalCollection from '~/components/ThModalCollection'
import ThModalShare from '~/components/ThModalShare'
import ThFooter from '~/components/ThFooter'
import ThModalUser from '~/components/ThModalUser'
export default {
  components: {
    ThSidebar,
    ThTopBar,
    ThModalCollection,
    ThModalShare,
    ThFooter,
    ThMobileSidebar,
    ThModalUser
  },
  computed: {
    ...mapGetters({
      display: 'ui/display',
      breakpoints: 'ui/breakpoints'
    })
  },
  mounted() {
    const breakpoints = JSON.parse(JSON.stringify(this.breakpoints))
    // eslint-disable-next-line no-console
    if (['sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'].includes(this.$mq)) {
      breakpoints.smallOrBigger = true
      breakpoints.smallSmaller = false
    }
    if (['md', 'lg', 'xl', 'xxl', 'xxxl'].includes(this.$mq)) {
      breakpoints.mediumOrBigger = true
      breakpoints.mediumSmaller = false
    }
    if (['lg', 'xl', 'xxl', 'xxxl'].includes(this.$mq)) {
      breakpoints.largeOrBigger = true
      breakpoints.largeSmaller = false
    }
    if (['xl', 'xxl', 'xxxl'].includes(this.$mq)) {
      breakpoints.xlOrBigger = true
      breakpoints.xlSmaller = false
    }
    if (['xxl', 'xxxl'].includes(this.$mq)) {
      breakpoints.xxlOrBigger = true
      breakpoints.xxlSmaller = false
    }
    if (['xxxl'].includes(this.$mq)) {
      breakpoints.xxxlOrBigger = true
      breakpoints.xxxlSmaller = false
    }
    // eslint-disable-next-line no-console
    console.log(breakpoints)
    this.$store.commit('ui/SET_BREAKPOINTS', breakpoints)
  }
}
</script>

<style>
::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}
</style>
