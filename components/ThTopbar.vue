<template>
  <div>
    <div class="flex justify-between text-lg mx-5 my-4">
      <div v-if="breakpoints.largeSmaller" @click="toggleMenu">
        <ThIcon :icon="'Menu'" class="h-10 w-10 mr-5 mt-1"></ThIcon>
      </div>

      <div class="flex-grow">
        <ThDropdownSearch
          v-if="breakpoints.largeOrBigger"
          class="xxl:w-3/5 xl:w-4/5 lg:w-4/5 sm:w-full md:w-full pr-10 sm:pr-4 md:pr-4"
        />

        <div v-else @click="toggleSearch">
          <ThIcon
            icon="Search"
            class="self-end justify-end w-8 h-8 md:mr-4 mt-2"
          />
        </div>
      </div>

      <div v-if="$auth.loggedIn">
        <div class="flex">
          <nuxt-link v-if="$auth.user.role === 'admin'" to="/new/event">
            <button
              class="p-3 flex bg-primary-80 rounded-md text-white text-lg uppercase"
            >
              <ThIcon icon="Plus" class="w-6 h-6 md:mr-4" />
              <span class="hidden md:block">Event</span>
            </button></nuxt-link
          >
          <ThTopBarUser
            :user="$auth.user"
            class="ml-4 sm:ml-3 md:ml-6 sm:mr-2 md:mr-2 lg:mr-4"
          />
        </div>
      </div>
      <div v-else>
        <button
          class="py-2 px-3 mt-1 md:bg-transparent bg-primary-80 rounded-md text-white inline-block md:mr-3"
          @click="openUserModal('login')"
        >
          Login
        </button>
        <button
          class="py-2 px-3 mt-1 bg-primary-80 rounded-md text-white hidden md:inline-block"
          @click="openUserModal('register')"
        >
          Register
        </button>
      </div>
    </div>
    <div
      v-if="mobileSearchVisible"
      class="flex justify-between text-lg mx-5 my-4"
    >
      <ThDropdownSearch class="flex-grow" />
      <div @click="toggleSearch">
        <ThIcon icon="Cross" class="w-6 h-6 ml-3 mt-3" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ThTopBarUser from './ThTopBarUser'
import ThIcon from './ThIcon'
import ThDropdownSearch from './ThDropdownSearch'
export default {
  name: 'ThTopBar',
  components: {
    ThTopBarUser,
    ThIcon,
    ThDropdownSearch
  },
  data() {
    return {
      mobileSearchVisible: false
    }
  },
  computed: {
    ...mapGetters({
      display: 'ui/display',
      breakpoints: 'ui/breakpoints'
    })
  },
  created() {
    this.mobileSearchVisible = false
  },
  methods: {
    toggleMenu() {
      this.$store.commit('ui/SET_MENU_VISIBILITY', !this.display.menuVisible)
    },
    openUserModal(section) {
      this.$store.dispatch('setModalUserSection', section)
      this.$modal.show('th-modal-user')
    },

    toggleSearch() {
      if (this.mobileSearchVisible) {
        this.mobileSearchVisible = false
        document.getElementsByName('search')[0].blur()
      } else {
        this.mobileSearchVisible = true
        this.$nextTick(() => {
          document.getElementsByName('search')[0].focus()
        })
      }
    }
  }
}
</script>
