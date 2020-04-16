<template
  ><div>
    <div class="flex">
      <h3 class="text-2xl text-green-500 mb-1 uppercase">
        Virtual Event Archives
      </h3>
      <div v-if="$auth.loggedIn && $auth.user.role === 'admin'">
        <nuxt-link :to="'/new/event'">
          <button
            class="ml-5 mt-3 bg-primary leading-6 hover:bg-blue-700 rounded-md block text-4xl text-white uppercase py-0 px-2"
          >
            +
          </button>
        </nuxt-link>
      </div>
      <p class="text-lg mt-1 ml-8">
        The fun never ends with virtual events; explore here to check out the
        livestreams you've missed!
      </p>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
