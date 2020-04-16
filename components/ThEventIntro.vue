<template
  ><div>
    <div class="flex">
      <h3 class="text-2xl whitespace-no-wrap text-green-500 mb-1 uppercase">
        Virtual Events
      </h3>
      <div v-if="$auth.loggedIn && $auth.user.role === 'admin'">
        <nuxt-link :to="'/new/event'">
          <button
            class="ml-3 mt-2 bg-primary-80 leading-6 hover:bg-blue-700 rounded-md block text-3xl text-white uppercase py-0 px-2"
          >
            +
          </button>
        </nuxt-link>
      </div>
      <p class="flex text-lg mt-1 ml-8 hidden lg:block">
        Find online events for you to join, or watch
      </p>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
