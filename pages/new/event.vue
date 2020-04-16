<template>
  <div>
    <h2 class="text-2xl mb-5">Create an Event</h2>
    <ThEventForm :event="event" :submit-mode="'save'"></ThEventForm>
  </div>
</template>

<script>
import ThEventForm from '@/components/ThEventForm'
export default {
  components: {
    ThEventForm
  },
  data() {
    return {
      event: {
        title: '',
        description: '',
        date: '',
        start_time: '',
        end_time: '',
        capacity: '',
        event_mode: 'Virtual',
        reach: 'Local',
        virtual_host: 'Online',
        virtual_url: '',
        virtual_password: '',
        requires_rsvp: false,
        audience_mode: 'Watching',
        has_fee: false,
        ticket_url: '',
        event_url: '',
        image_url: '',
        url_attachments: [],
        address: '',
        price: '',
        has_age_restriction: false,
        ages: '21+'
      }
    }
  }
}
</script>
