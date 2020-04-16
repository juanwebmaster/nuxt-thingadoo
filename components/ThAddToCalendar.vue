<template>
  <div>
    <button class="btn" @click="addToGoogle">
      <ThIcon icon="Calendar" class="w-6 h-6 lg:mr-4" />
      <span class="hidden lg:block">Add to Calendar</span>
    </button>
  </div>
</template>

<script>
import ThIcon from './ThIcon'
export default {
  name: 'ThAddToCalendar',
  components: {
    ThIcon
  },
  props: {
    title: {
      type: String,
      default: null,
      required: true
    },
    details: {
      type: String,
      default: null,
      required: true
    },
    location: {
      type: String,
      default: null,
      required: true
    },
    startDate: {
      type: String,
      default: null,
      required: true
    },
    endDate: {
      type: String,
      default: null,
      required: true
    }
  },
  computed: {
    googleUrl() {
      return encodeURI(
        [
          'https://www.google.com/calendar/render',
          '?action=TEMPLATE',
          '&text=' + this.title,
          '&dates=' + this.startDate,
          '/' + this.endDate,
          '&details=' + this.details,
          '&location=' + this.location,
          '&sprop=&sprop=name:'
        ].join('')
      )
    },
    iCal() {
      return encodeURI(
        'data:text/calendar;charset=utf8,' +
          [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'BEGIN:VEVENT',
            'URL:' + this.url,
            'DTSTART:' + this.startDate,
            'DTEND:' + this.endDate,
            'SUMMARY:' + (this.title || ''),
            'DESCRIPTION:' + (this.details || ''),
            'LOCATION:' + (this.location || ''),
            'END:VEVENT',
            'END:VCALENDAR'
          ].join('\n')
      )
    }
  },
  methods: {
    addToGoogle() {
      // const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=500,height=700,left=0,top=0`
      window.open(this.googleUrl, 'Add to Google', {})
    }
  }
}
</script>

<style>
.btn {
  @apply p-4 flex bg-dark-70 border border-dark-80 mr-5 rounded-md transition duration-500 ease-in-out;

  :hover {
    @apply bg-dark-80;
  }
}
</style>
