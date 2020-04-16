<template>
  <div class="flex flex-no-wrap">
    <div class="w-1/2 flex-initial mr-8">
      <ThCollectionDetail
        :collection="collection"
        :user-is-owner="userIsOwner"
        @hideCollectionDetail="this.$parent.hideCollection"
        @loadItem="this.$parent.loadDetailById"
      ></ThCollectionDetail>
    </div>
    <div v-if="showOverview" class="w-1/2 bg-dark flex-initial">
      <ThCollectionOverview
        :collection="collection"
        :user-is-owner="userIsOwner"
      ></ThCollectionOverview>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ThCollectionDetail from '@/components/ThCollectionDetail'
import ThCollectionOverview from '@/components/ThCollectionOverview'
export default {
  components: {
    ThCollectionDetail,
    ThCollectionOverview
  },
  props: {
    showOverview: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters({
      display: 'ui/display',
      breakpoints: 'ui/breakpoints',
      pageState: 'categories/display'
    })
  },
  data() {
    return {
      collection: {},
      userIsOwner: false
    }
  },
  created() {
    this.$api
      .$get(`/collections/${this.$route.params.slug}`)
      .then((response) => {
        this.collection = response
        this.userIsOwner = this.collection.admin_ids.includes(
          this.$store.$auth.user.id
        )
      })
  }
}
</script>

<style></style>
