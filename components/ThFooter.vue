<template>
  <div class="flex mb-4 block mt-8 pb-6 mx-5 text-left larger">
    <div class="w-1/2">
      <ul>
        <li>
          <nuxt-link to="/page/about">About Us</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/page/our-team">Our Team</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/page/privacy-policy">Privacy Policy</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/page/contact-us">Contact Us</nuxt-link>
        </li>
      </ul>
    </div>
    <div class="w-1/2 h-12">
      <ul>
        <li>Thingadoo</li>
        <li>185 Clinton Ave</li>
        <li>Cortland NY 13045</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
li {
  font-size: larger;
}
</style>
