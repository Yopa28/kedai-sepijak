<template>
  <div class="group flex flex-col gap-4 overflow-hidden rounded-xl bg-background-beige/95 p-4 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
    <img 
      class="aspect-[4/3] w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105" 
      :alt="item.alt" 
      :src="item.image"
    />
    <div class="flex justify-between items-center">
      <h3 class="font-body text-lg font-semibold text-text-charcoal">{{ item.name }}</h3>
      <p class="font-body font-bold text-primary-green">{{ formatPrice(item.price) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuCard',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatPrice(price) {
      return `Rp${price.toLocaleString('id-ID')}`
    }
  }
}
</script>