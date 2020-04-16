<template
  ><div>
    <div class="flex">
      <h3 class="text-3xl text-green-500 mb-1">Collections</h3>
      <div v-if="$auth.loggedIn && $auth.user.role === 'admin'">
        <nuxt-link :to="'/new/collection'">
          <button
            class="ml-5 mt-3 bg-primary leading-6 hover:bg-blue-700 rounded-md block text-4xl text-white uppercase py-0 px-2"
          >
            +
          </button>
        </nuxt-link>
      </div>
    </div>
    <p>Collections are ways to organize information on thingadoo</p>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
