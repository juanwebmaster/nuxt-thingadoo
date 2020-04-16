<template>
  <div>
    <h2 class="text-2xl mb-5">Edit your event</h2>
    <ThEventForm
      v-if="eventItem"
      :event="eventItem"
      :submit-mode="'edit'"
    ></ThEventForm>
  </div>
</template>

<script>
import ThEventForm from '@/components/ThEventForm'
export default {
  components: {
    ThEventForm
  },
  async asyncData({ params, store, env, error }) {
    // eslint-disable-next-line no-console
    console.log(params.slug)
    const event = await store.dispatch('event/getById', { id: params.slug })
    return { event }
  },
  data() {
    return {
      eventItem: {}
    }
  },
  created() {
    this.eventItem = Object.assign({}, this.$store.getters['event/detail'])
    this.eventItem.date = this.eventItem.start_time.split('T')[0]
    this.eventItem.start_time = this.$moment(this.eventItem.start_time).format(
      'hh:mm'
    )
    if (this.eventItem.end_time) {
      this.eventItem.end_time = this.$moment(this.eventItem.end_time).format(
        'hh:mm'
      )
    } else {
      this.eventItem.end_time = ''
    }
  }
}
</script>
