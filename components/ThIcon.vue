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
import Back from '~/assets/images/icon/Back.svg'
import LeftArrow from '~/assets/images/icon/LeftArrow.svg'
import Cross from '~/assets/images/icon/Cross.svg'
import Music from '~/assets/images/icon/Music.svg'
import Stage from '~/assets/images/icon/Theater.svg'
import Family from '~/assets/images/icon/Family Fun.svg'
import Wellness from '~/assets/images/icon/Wellness.svg'
import Sports from '~/assets/images/icon/Sports.svg'
import Food from '~/assets/images/icon/Food.svg'
import Classes from '~/assets/images/icon/Lessons.svg'
import Arts from '~/assets/images/icon/Exhibits.svg'
import More from '~/assets/images/icon/More.svg'

import Add from '~/assets/images/icon/Add.svg'
import Plus from '~/assets/images/icon/Plus.svg'
import Menu from '~/assets/images/icon/Menu.svg'
import Bookmark from '~/assets/images/icon/Bookmark.svg'
import Find from '~/assets/images/icon/Find.svg'
import Search from '~/assets/images/icon/Search.svg'
export default {
  name: 'ThIcon',
  components: {
    Home,
    Feed,
    List,
    Places,
    Tags,
    Star,
    Calendar,
    Share,
    Stage,
    Clock,
    Cross,
    Music,
    MapPin,
    LeftArrow,
    Family,
    Wellness,
    Sports,
    Food,
    Classes,
    Arts,
    More,
    Back,
    Add,
    Plus,
    Menu,
    Bookmark,
    Find,
    Search
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
