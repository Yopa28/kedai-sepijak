import { ref } from 'vue'

/**
 * Helper utilities for formatting and validation
 */
export function useHelpers() {
  const notificationTimeout = ref(null)

  /**
   * Format date to readable string
   */
  function formatDate(dateString, includeTime = false) {
    if (!dateString) return '-'

    const date = new Date(dateString)

    if (isNaN(date.getTime())) return '-'

    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }

    if (includeTime) {
      options.hour = '2-digit'
      options.minute = '2-digit'
    }

    return date.toLocaleDateString('id-ID', options)
  }

  /**
   * Format relative time (e.g., "2 jam yang lalu")
   */
  function formatRelativeTime(dateString) {
    if (!dateString) return '-'

    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffSec = Math.floor(diffMs / 1000)
    const diffMin = Math.floor(diffSec / 60)
    const diffHour = Math.floor(diffMin / 60)
    const diffDay = Math.floor(diffHour / 24)

    if (diffSec < 60) {
      return 'baru saja'
    } else if (diffMin < 60) {
      return `${diffMin} menit yang lalu`
    } else if (diffHour < 24) {
      return `${diffHour} jam yang lalu`
    } else if (diffDay < 7) {
      return `${diffDay} hari yang lalu`
    } else {
      return formatDate(dateString)
    }
  }

  /**
   * Format currency (Rupiah)
   */
  function formatCurrency(amount) {
    if (amount === null || amount === undefined) return 'Rp 0'

    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  /**
   * Format number with thousand separator
   */
  function formatNumber(number) {
    if (number === null || number === undefined) return '0'
    return new Intl.NumberFormat('id-ID').format(number)
  }

  /**
   * Format percentage
   */
  function formatPercentage(value, decimals = 1) {
    if (value === null || value === undefined) return '0%'
    return `${parseFloat(value).toFixed(decimals)}%`
  }

  /**
   * Generate rating stars array
   */
  function getRatingStars(rating, maxRating = 5) {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 1; i <= maxRating; i++) {
      if (i <= fullStars) {
        stars.push({ type: 'full', key: i })
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push({ type: 'half', key: i })
      } else {
        stars.push({ type: 'empty', key: i })
      }
    }

    return stars
  }

  /**
   * Get badge variant by status
   */
  function getBadgeVariant(status) {
    const variants = {
      'active': 'success',
      'inactive': 'danger',
      'cuti': 'warning',
      'pending': 'warning',
      'completed': 'success',
      'cancelled': 'danger',
      'pelayanan': 'primary',
      'makanan': 'success',
      'tempat': 'info',
      'harga': 'warning',
      'lainnya': 'secondary'
    }

    return variants[status?.toLowerCase()] || 'secondary'
  }

  /**
   * Get color by rating
   */
  function getColorByRating(rating) {
    if (rating >= 4.5) return '#10b981' // green
    if (rating >= 3.5) return '#f59e0b' // yellow
    if (rating >= 2.5) return '#f97316' // orange
    return '#ef4444' // red
  }

  /**
   * Validate email
   */
  function validateEmail(email) {
    if (!email) return true // Optional field
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  /**
   * Validate phone (Indonesia format)
   */
  function validatePhone(phone) {
    if (!phone) return true // Optional field
    const re = /^(\+62|62|0)[0-9]{9,13}$/
    return re.test(phone.replace(/[\s-]/g, ''))
  }

  /**
   * Validate required field
   */
  function validateRequired(value) {
    if (typeof value === 'string') {
      return value.trim().length > 0
    }
    return value !== null && value !== undefined && value !== ''
  }

  /**
   * Truncate text
   */
  function truncateText(text, maxLength = 100) {
    if (!text) return ''
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  /**
   * Capitalize first letter
   */
  function capitalize(text) {
    if (!text) return ''
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  /**
   * Get initials from name
   */
  function getInitials(name) {
    if (!name) return ''

    const parts = name.trim().split(' ')

    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase()
    }

    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
  }

  /**
   * Check if date is expired
   */
  function isExpired(dateString) {
    if (!dateString) return false
    const date = new Date(dateString)
    const now = new Date()
    return date < now
  }

  /**
   * Get days until expiry
   */
  function getDaysUntilExpiry(dateString) {
    if (!dateString) return 0

    const date = new Date(dateString)
    const now = new Date()
    const diffTime = date - now
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return diffDays
  }

  /**
   * Debounce function
   */
  function debounce(func, wait = 300) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  /**
   * Copy to clipboard
   */
  async function copyToClipboard(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
        return { success: true }
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea')
        textarea.value = text
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()

        try {
          document.execCommand('copy')
          document.body.removeChild(textarea)
          return { success: true }
        } catch (err) {
          document.body.removeChild(textarea)
          return { success: false, error: 'Gagal menyalin ke clipboard' }
        }
      }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  /**
   * Download data as JSON
   */
  function downloadJSON(data, filename = 'data.json') {
    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
    URL.revokeObjectURL(url)
  }

  /**
   * Export data to CSV
   */
  function exportToCSV(data, filename = 'export.csv') {
    if (!data || !data.length) return

    const headers = Object.keys(data[0])
    const csvContent = [
      headers.join(','),
      ...data.map(row =>
        headers.map(header => {
          const value = row[header] || ''
          return `"${value}"`
        }).join(',')
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
    URL.revokeObjectURL(url)
  }

  /**
   * Generate random color
   */
  function getRandomColor() {
    const colors = [
      '#8B4513', '#D2691E', '#CD853F', '#DEB887',
      '#F4A460', '#D2B48C', '#BC8F8F', '#A0522D',
      '#6B4423', '#C19A6B', '#826644', '#B5651D'
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  /**
   * Generate unique ID
   */
  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2)
  }

  /**
   * Parse query string
   */
  function parseQueryString(query) {
    const params = new URLSearchParams(query)
    const result = {}

    for (const [key, value] of params) {
      result[key] = value
    }

    return result
  }

  /**
   * Build query string
   */
  function buildQueryString(params) {
    const query = new URLSearchParams()

    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
        query.append(key, params[key])
      }
    })

    return query.toString()
  }

  /**
   * Sleep/delay function
   */
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * Get shift label
   */
  function getShiftLabel(shift) {
    const labels = {
      'pagi': 'Pagi (06:00 - 14:00)',
      'siang': 'Siang (14:00 - 22:00)',
      'malam': 'Malam (22:00 - 06:00)',
      'full': 'Full Day'
    }
    return labels[shift] || shift
  }

  /**
   * Get category label
   */
  function getCategoryLabel(category) {
    const labels = {
      'pelayanan': 'Pelayanan',
      'makanan': 'Makanan',
      'tempat': 'Tempat',
      'harga': 'Harga',
      'lainnya': 'Lainnya',
      'menu_baru': 'Menu Baru',
      'event': 'Event',
      'promo': 'Promo',
      'umum': 'Umum'
    }
    return labels[category] || category
  }

  return {
    // Formatting
    formatDate,
    formatRelativeTime,
    formatCurrency,
    formatNumber,
    formatPercentage,
    truncateText,
    capitalize,
    getInitials,

    // Rating & Colors
    getRatingStars,
    getColorByRating,
    getBadgeVariant,

    // Validation
    validateEmail,
    validatePhone,
    validateRequired,

    // Date utilities
    isExpired,
    getDaysUntilExpiry,

    // Utilities
    debounce,
    copyToClipboard,
    downloadJSON,
    exportToCSV,
    getRandomColor,
    generateId,
    sleep,

    // Query string
    parseQueryString,
    buildQueryString,

    // Labels
    getShiftLabel,
    getCategoryLabel
  }
}
