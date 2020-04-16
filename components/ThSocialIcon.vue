<template>
  <component :is="icon" />
</template>
<script>
import Home from '~/assets/images/icon/Home.svg'
import Feed from '~/assets/images/icon/Feed.svg'
import List from '~/assets/images/icon/List.svg'
import Places from '~/assets/images/icon/Places.svg'
import Tags from '~/assets/images/icon/Tags.svg'
import Star from '~/assets/images/icon/Star.svg'
import Calendar from '~/assets/images/icon/Calendar.svg'
import Share from '~/assets/images/icon/Share.svg'
import Clock from '~/assets/images/icon/Clock.svg'
import MapPin from '~/assets/images/icon/MapPin.svg'

export default {
  name: 'ThSocialIcon',
  components: {
    Home,
    Feed,
    List,
    Places,
    Tags,
    Star,
    Calendar,
    Share,
    Clock,
    MapPin
  },
  props: {
    icon: {
      type: String,
      required: true,
      default: null
    }
  }
}
</script>
