<template>
  <div>
    <ThLogo />
    <ThSidebarNav @toggleMenu="toggleMenu" />
  </div>
</template>
<script>
import ThLogo from './ThLogo'
import ThSidebarNav from './ThSidebarNav'

export default {
  name: 'ThSidebar',
  components: {
    ThLogo,
    ThSidebarNav
  },
  methods: {
    toggleMenu() {
      // nothing here, just preventing warn error
    }
  }
}
</script>
