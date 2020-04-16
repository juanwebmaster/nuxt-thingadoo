<template>
  <div>
    <h3 class="border-b border-dark-80 pb-4 text-2xl mb-5 text-green-500">
      Add a Collection
    </h3>
    <ThCollectionForm
      v-if="collection"
      :collection="collection"
      :submit-mode="'save'"
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
      image: '',
      collection: {
        title: '',
        description: '',
        public: false,
        collaborative: false,
        reach: 'Local'
      }
    }
  }
}
</script>
