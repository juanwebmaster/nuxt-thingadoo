<template>
  <div class="py-16 px-10 Logo w-full">
    <Logo class="m-auto" style="width:140px;" />
  </div>
</template>
<script>
import Logo from '~/assets/images/logo.svg'

export default {
  name: 'ThLogo',
  components: {
    Logo
  }
}
</script>
<style scoped>
.Logo {
  background: url('~assets/images/bg.svg?inline') no-repeat center center;
  background-size: contain;
}
</style>
