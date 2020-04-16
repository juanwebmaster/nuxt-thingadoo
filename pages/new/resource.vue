<template
  ><div>
    <h3 class="border-b border-dark-80 pb-4 text-2xl mb-5 text-green-500">
      Add a Resource
    </h3>
    <ThResourceForm
      :resource="resourceItem"
      :submit-mode="'save'"
    ></ThResourceForm>
  </div>
</template>

<script>
import ThResourceForm from '@/components/ThResourceForm'
export default {
  components: {
    ThResourceForm
  },
  data() {
    return {
      resourceItem: {
        title: '',
        description: '',
        reach: 'Local',
        image_url: '',
        url_attachments: []
      }
    }
  }
}
</script>
