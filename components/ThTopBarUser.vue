<template>
  <div class="dropdown inline-block relative">
    <button>
      <ThAvatar :image="user.email" />
    </button>
    <ul class="z-20 dropdown-menu absolute right-0 hidden text-gray-700 pt-1">
      <li class="">
        <a
          class="rounded-t bg-white hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap"
          href="#"
          >My Profile</a
        >
      </li>
      <li>
        <nuxt-link
          to="/user"
          class="rounded-b bg-white hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap"
          >Your Events</nuxt-link
        >
      </li>

      <li class="">
        <a
          class="rounded-b bg-white hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap"
          href="#"
          @click="userLogout()"
          >Signout</a
        >
      </li>
    </ul>
  </div>
</template>
<script>
import ThAvatar from './ThAvatar'
export default {
  name: 'ThTopBarUser',
  components: { ThAvatar },
  props: {
    user: {
      type: Object,
      required: true,
      default: null
    }
  },
  methods: {
    async userLogout() {
      try {
        await this.$auth.logout()
      } catch (err) {
        err.response.data.errors.map((e) => {
          this.$toast.error(e)
        })
      }
    }
  }
}
</script>
<style lang="postcss">
.dropdown:hover .dropdown-menu {
  display: block;
}
</style>
