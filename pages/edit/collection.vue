<template>
  <div>
    <h2 class="text-2xl mb-5">Edit</h2>
    <ThCollectionForm
      v-if="collection"
      :collection="collection"
      :submit-mode="'edit'"
    ></ThCollectionForm>
  </div>
</template>

<script>
import ThCollectionForm from '@/components/ThCollectionForm'
export default {
  components: {
    ThCollectionForm
  },
  data() {
    return {
      collection: {}
    }
  },
  mounted() {
    this.$api
      .$get(`/collections/${this.$route.params.slug}`)
      .then((response) => {
        this.collection = response
      })
  }
}
</script>
