<template>
  <div>
    <div class="fixed top-0 right-0 m-8" @click="toggleMenu">
      <ThIcon :icon="'Cross'"></ThIcon>
    </div>
    <ThLogo />
    <ThSidebarNav @toggleMenu="toggleMenu" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ThLogo from './ThLogo'
import ThIcon from './ThIcon'
import ThSidebarNav from './ThSidebarNav'

export default {
  name: 'ThSidebar',
  components: {
    ThLogo,
    ThIcon,
    ThSidebarNav
  },
  computed: {
    ...mapGetters({
      display: 'ui/display',
      breakpoints: 'ui/breakpoints'
    })
  },
  methods: {
    toggleMenu() {
      this.$store.commit('ui/SET_MENU_VISIBILITY', !this.display.menuVisible)
    }
  }
}
</script>
