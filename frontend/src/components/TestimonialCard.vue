<template>
  <div 
    :class="[
      'flex flex-col items-center justify-center gap-4 rounded-xl bg-white p-8 shadow-lg transition-transform',
      isCenter ? 'relative md:scale-110 md:z-10 shadow-2xl' : 'hover:scale-105'
    ]"
  >
    <img 
      :alt="`Avatar of ${testimonial.name}`" 
      class="absolute -top-10 h-20 w-20 rounded-full object-cover ring-4"
      :class="isCenter ? 'ring-accent-amber' : 'ring-secondary-sage'"
      :src="testimonial.avatar"
    />
    <div class="flex text-accent-amber pt-10">
      <span 
        v-for="star in fullStars" 
        :key="`full-${star}`"
        class="material-symbols-outlined"
      >
        star
      </span>
      <span 
        v-if="hasHalfStar"
        class="material-symbols-outlined"
      >
        star_half
      </span>
    </div>
    <p class="text-text-charcoal/80">"{{ testimonial.text }}"</p>
    <h4 class="font-bold text-primary-green">- {{ testimonial.name }}</h4>
  </div>
</template>

<script>
export default {
  name: 'TestimonialCard',
  props: {
    testimonial: {
      type: Object,
      required: true
    },
    isCenter: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    fullStars() {
      return Math.floor(this.testimonial.rating)
    },
    hasHalfStar() {
      return this.testimonial.rating % 1 !== 0
    }
  }
}
</script>