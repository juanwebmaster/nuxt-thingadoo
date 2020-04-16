<template>
  <div
    class="Envet__item flex p-5 pl-0 hover:bg-dark transition duration-500 ease-in-out cursor-pointer border-b border-dark-90"
    @click="$emit('loadEvent', id, 'resource')"
  >
    <div class="flex w-full justify-between">
      <div>
        <h3 class="text-xl text-white block">
          {{ title }}
          <div v-if="admin">
            <button @click="$emit('deleteFromCollection', id, 'Resource')">
              remove
            </button>
          </div>
        </h3>
      </div>

      <p>{{ description }}</p>
      <ThEventCover :image="image" class="rounded-md ml-4" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'ThCollectionResourceItem',
  props: {
    id: {
      type: Number,
      default: 0,
      required: true
    },
    title: {
      type: String,
      default: null,
      required: true
    },
    descriotion: {
      type: String,
      default: null,
      required: true
    },
    admin: {
      type: Boolean,
      default: false
    },
    image: {
      type: String,
      default: ''
    }
  }
}
</script>
