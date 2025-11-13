import { ref, computed } from 'vue'

// Default restaurant coordinates (HARUS DIGANTI dengan koordinat sebenarnya!)
const RESTAURANT_LAT = -6.2088
const RESTAURANT_LNG = 106.8456
const FEEDBACK_RADIUS_METERS = 100

export function useGeolocation() {
  // State
  const currentPosition = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const permissionStatus = ref(null)
  const distance = ref(null)

  // Computed
  const hasLocation = computed(() => currentPosition.value !== null)

  const isWithinRadius = computed(() => {
    if (!currentPosition.value || distance.value === null) return false
    return distance.value <= FEEDBACK_RADIUS_METERS
  })

  const latitude = computed(() => currentPosition.value?.coords?.latitude || null)
  const longitude = computed(() => currentPosition.value?.coords?.longitude || null)
  const accuracy = computed(() => currentPosition.value?.coords?.accuracy || null)

  /**
   * Calculate distance between two coordinates using Haversine formula
   * Returns distance in meters
   */
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371000 // Earth radius in meters
    const φ1 = (lat1 * Math.PI) / 180
    const φ2 = (lat2 * Math.PI) / 180
    const Δφ = ((lat2 - lat1) * Math.PI) / 180
    const Δλ = ((lon2 - lon1) * Math.PI) / 180

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return R * c // Distance in meters
  }

  /**
   * Check if geolocation is supported
   */
  function isGeolocationSupported() {
    return 'geolocation' in navigator
  }

  /**
   * Get current position
   */
  function getCurrentPosition(options = {}) {
    return new Promise((resolve, reject) => {
      if (!isGeolocationSupported()) {
        const err = new Error('Geolocation tidak didukung oleh browser Anda')
        error.value = err.message
        reject(err)
        return
      }

      loading.value = true
      error.value = null

      const defaultOptions = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
        ...options
      }

      navigator.geolocation.getCurrentPosition(
        // Success callback
        (position) => {
          currentPosition.value = position

          // Calculate distance from restaurant
          distance.value = calculateDistance(
            RESTAURANT_LAT,
            RESTAURANT_LNG,
            position.coords.latitude,
            position.coords.longitude
          )

          loading.value = false
          resolve({
            success: true,
            position,
            distance: distance.value,
            isWithinRadius: distance.value <= FEEDBACK_RADIUS_METERS
          })
        },
        // Error callback
        (err) => {
          loading.value = false

          let errorMessage = 'Gagal mendapatkan lokasi'

          switch(err.code) {
            case err.PERMISSION_DENIED:
              errorMessage = 'Izin akses lokasi ditolak. Mohon aktifkan GPS dan izinkan akses lokasi.'
              break
            case err.POSITION_UNAVAILABLE:
              errorMessage = 'Informasi lokasi tidak tersedia.'
              break
            case err.TIMEOUT:
              errorMessage = 'Waktu permintaan lokasi habis.'
              break
            default:
              errorMessage = 'Terjadi kesalahan saat mendapatkan lokasi.'
          }

          error.value = errorMessage
          reject(new Error(errorMessage))
        },
        defaultOptions
      )
    })
  }

  /**
   * Watch position (continuous tracking)
   */
  function watchPosition(callback, options = {}) {
    if (!isGeolocationSupported()) {
      error.value = 'Geolocation tidak didukung oleh browser Anda'
      return null
    }

    const defaultOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
      ...options
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        currentPosition.value = position

        // Calculate distance
        distance.value = calculateDistance(
          RESTAURANT_LAT,
          RESTAURANT_LNG,
          position.coords.latitude,
          position.coords.longitude
        )

        if (callback) {
          callback({
            success: true,
            position,
            distance: distance.value,
            isWithinRadius: distance.value <= FEEDBACK_RADIUS_METERS
          })
        }
      },
      (err) => {
        error.value = err.message
        if (callback) {
          callback({
            success: false,
            error: err.message
          })
        }
      },
      defaultOptions
    )

    return watchId
  }

  /**
   * Clear watch
   */
  function clearWatch(watchId) {
    if (watchId && isGeolocationSupported()) {
      navigator.geolocation.clearWatch(watchId)
    }
  }

  /**
   * Check permission status
   */
  async function checkPermission() {
    if (!navigator.permissions) {
      return null
    }

    try {
      const result = await navigator.permissions.query({ name: 'geolocation' })
      permissionStatus.value = result.state
      return result.state
    } catch (err) {
      console.error('Permission check error:', err)
      return null
    }
  }

  /**
   * Request location permission
   */
  async function requestPermission() {
    try {
      await getCurrentPosition()
      return true
    } catch (err) {
      return false
    }
  }

  /**
   * Validate if current location is within radius
   */
  function validateLocation() {
    if (!currentPosition.value) {
      return {
        valid: false,
        message: 'Lokasi belum terdeteksi'
      }
    }

    if (distance.value === null) {
      return {
        valid: false,
        message: 'Jarak belum dihitung'
      }
    }

    if (distance.value > FEEDBACK_RADIUS_METERS) {
      return {
        valid: false,
        message: `Anda harus berada dalam radius ${FEEDBACK_RADIUS_METERS}m dari Kedai Sepijak`,
        distance: Math.round(distance.value),
        maxDistance: FEEDBACK_RADIUS_METERS
      }
    }

    return {
      valid: true,
      message: 'Lokasi valid',
      distance: Math.round(distance.value),
      maxDistance: FEEDBACK_RADIUS_METERS
    }
  }

  /**
   * Format distance to readable string
   */
  function formatDistance(meters) {
    if (meters === null || meters === undefined) return '-'

    if (meters < 1000) {
      return `${Math.round(meters)} meter`
    } else {
      return `${(meters / 1000).toFixed(2)} km`
    }
  }

  /**
   * Get restaurant coordinates
   */
  function getRestaurantCoordinates() {
    return {
      latitude: RESTAURANT_LAT,
      longitude: RESTAURANT_LNG
    }
  }

  /**
   * Get feedback radius
   */
  function getFeedbackRadius() {
    return FEEDBACK_RADIUS_METERS
  }

  /**
   * Reset state
   */
  function reset() {
    currentPosition.value = null
    error.value = null
    distance.value = null
    permissionStatus.value = null
  }

  /**
   * Clear error
   */
  function clearError() {
    error.value = null
  }

  return {
    // State
    currentPosition,
    loading,
    error,
    permissionStatus,
    distance,

    // Computed
    hasLocation,
    isWithinRadius,
    latitude,
    longitude,
    accuracy,

    // Methods
    isGeolocationSupported,
    getCurrentPosition,
    watchPosition,
    clearWatch,
    checkPermission,
    requestPermission,
    validateLocation,
    calculateDistance,
    formatDistance,
    getRestaurantCoordinates,
    getFeedbackRadius,
    reset,
    clearError
  }
}
