<template>
  <div>
    <h2 class="text-2xl mb-5">Edit</h2>
    <ThResourceForm
      v-if="resourceItem"
      :resource="resourceItem"
      :submit-mode="'edit'"
    ></ThResourceForm>
  </div>
</template>

<script>
import ThResourceForm from '@/components/ThResourceForm'
export default {
  components: {
    ThResourceForm
  },
  async asyncData({ params, store, env, error }) {
    const resource = await store.dispatch('resource/getById', {
      id: params.slug
    })
    return { resource }
  },
  data() {
    return {
      resourceItem: {}
    }
  },
  created() {
    this.resourceItem = Object.assign(
      {},
      this.$store.getters['resource/detail']
    )
  }
}
</script>
