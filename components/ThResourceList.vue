<template>
  <perfect-scrollbar
    ref="resourceList"
    class="bg-dark-80 min-h-full rounded-tl-md rounded-tr-md overflow-y-scroll"
  >
    <div>
      <component
        :is="componentName"
        v-for="resource in resources"
        :id="resource.id"
        :key="`resource-item-${resource.id}`"
        :title="resource.title"
        :description="resource.snippet"
        :slug="resource.slug"
        :image="
          resource.url_attachments[0]
            ? resource.url_attachments[0].image_url
            : ''
        "
        :page-type="
          resource.url_attachments[0]
            ? resource.url_attachments[0].link_type
            : 'website'
        "
        @showDetail="$emit('showDetail')"
      />
    </div>
  </perfect-scrollbar>
</template>
<script>
import ThResourceListItem from './ThResourceListItem'
import ThMobileResourceListItem from './ThMobileResourceListItem'

export default {
  name: 'TheResourceList',
  components: {
    ThResourceListItem,
    ThMobileResourceListItem
  },
  props: {
    resources: {
      type: Array,
      default: null
    },
    componentName: {
      type: String,
      default: 'ThEventListItem'
    }
  }
}
</script>
