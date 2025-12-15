# Role-Based Rating System - Documentation

## Overview
The Role-Based Rating System is an interactive feedback component that allows customers to rate specific aspects of your cafe separately (Barista, Waiters, Cashier, Cleaning). The interface adapts dynamically based on the selected role and star rating.

## ✨ Features

### 1. **Two-View Architecture**
- **View A (Role Selection)**: Shows 4 beautiful cards for different roles
- **View B (Rating Interface)**: Dynamic interface based on selected role

### 2. **Smart Tag System**
- Positive tags appear when user rates 4-5 stars
- Negative tags appear when user rates 1-3 stars
- Tags are toggleable and highlight when selected
- At least 1 tag must be selected before submission

### 3. **Responsive Design**
- Mobile-first approach
- Works perfectly on phones, tablets, and desktops
- Touch-friendly star buttons

### 4. **Real-time Feedback**
- Console logs all submissions
- Emits events to parent component
- Data includes: role, rating, selected tags, timestamp

## 🚀 How to Use

### Installation
The component is located at: `src/components/RoleBasedRating.vue`

### Basic Usage
```vue
<template>
  <RoleBasedRating @rating-submitted="handleRatingSubmitted" />
</template>

<script>
import RoleBasedRating from '@/components/RoleBasedRating.vue';

export default {
  components: { RoleBasedRating },
  methods: {
    handleRatingSubmitted(ratingData) {
      console.log('Rating received:', ratingData);
      // Save to backend, show success message, etc.
    }
  }
}
</script>
```

### In Your FeedbackPage.vue
The component is already integrated with a tab system:

```vue
<!-- Users can switch between traditional form and role-based rating -->
<button @click="feedbackMethod = 'roleRating'">
  Use Role-Based Rating
</button>

<RoleBasedRating v-if="feedbackMethod === 'roleRating'" 
                 @rating-submitted="handleRatingSubmitted" />
```

## 📊 Data Structure

### Submitted Data Format
When a user submits a rating, you'll receive an object like this:

```javascript
{
  role: "barista",              // The selected role
  roleTitle: "Nilai Barista & Produk",  // Display title
  starRating: 5,                // 1-5 stars
  selectedTags: [               // Selected tag(s)
    "Rasa Enak",
    "Suhu Pas"
  ],
  ratingType: "positive",       // "positive" or "negative"
  timestamp: "2025-12-15T10:30:00.000Z"  // ISO timestamp
}
```

## 🎨 Configuration

### The roleConfig Object
```javascript
const roleConfig = {
  barista: {
    title: "Nilai Barista & Produk",
    icon: "☕",
    question: "Gimana rasa kopi dan minumanmu?",
    positiveTags: ["Rasa Enak", "Suhu Pas", "Latte Art Bagus", "Penyajian Cepat"],
    negativeTags: ["Hambar/Pahit", "Terlalu Manis", "Dingin", "Penyajian Lama", "Salah Menu"]
  },
  // ... other roles
}
```

### Customizing Roles
To add or modify roles, edit the `roleConfig` in `RoleBasedRating.vue`:

```javascript
data() {
  return {
    roleConfig: {
      myNewRole: {
        title: "My Role Title",
        icon: "🎯",
        question: "Your question here?",
        positiveTags: ["tag1", "tag2"],
        negativeTags: ["tag3", "tag4"]
      }
    }
  }
}
```

## 🔄 Integration with Backend

### Example: Saving to Database
```javascript
async handleRatingSubmitted(ratingData) {
  try {
    const response = await fetch('/api/feedback/role-rating', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ratingData)
    });
    
    if (response.ok) {
      // Show success message
      this.showSuccessMessage('Rating saved!');
    }
  } catch (error) {
    console.error('Error saving rating:', error);
  }
}
```

## 📱 Responsive Breakpoints

The component is fully responsive:
- **Mobile (< 480px)**: Single column layout, optimized touch targets
- **Tablet (480px - 768px)**: 2 columns for role cards
- **Desktop (> 768px)**: 4 columns for role cards

## 🎯 User Flow

1. User sees 4 role cards (Barista, Waiters, Cashier, Cleaning)
2. User clicks a role card → View switches to rating interface
3. User selects a star rating (1-5)
4. Based on rating, relevant tags appear (positive or negative)
5. User selects at least 1 tag
6. User clicks "Kirim Rating" button
7. Data is submitted and parent component receives the event
8. Interface returns to role selection for next feedback

## 🎨 Styling

### Color Scheme (Integrated with Your Site)
- **Primary Green**: #2d5016 (main buttons, headers)
- **Accent Amber**: #d4a574 (highlights, selected tags)
- **Light Background**: #f5f1e8 (page background)
- **White**: Cards and form backgrounds

### Customizing Colors
Edit the CSS variables in the component's `<style scoped>` section:

```css
.role-based-rating {
  background: linear-gradient(135deg, #f5f1e8 0%, #f0ebe3 100%);
  /* Change these hex codes to your preferred colors */
}
```

## ✅ Browser Support
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support

## 🐛 Troubleshooting

### Tags not appearing after selecting rating
- Make sure the rating (1-5 stars) is selected
- Positive tags show for 4-5 stars
- Negative tags show for 1-3 stars

### Component not showing in Vue
- Ensure it's imported in the parent component
- Check that `v-if` condition matches your data property
- Verify the component path is correct

### Data not being logged
- Check browser console (F12 → Console tab)
- Ensure `@rating-submitted` event handler is defined
- Look for any JavaScript errors in console

## 📈 Analytics Integration

To track submissions, you can add code like:
```javascript
handleRatingSubmitted(ratingData) {
  // Google Analytics
  gtag('event', 'role_rating_submitted', {
    role: ratingData.role,
    rating: ratingData.starRating,
    tags_count: ratingData.selectedTags.length
  });
}
```

## 🔐 Security Notes
- All data is validated on the frontend
- Implement backend validation before saving to database
- Sanitize user-selected tags before storing
- Consider rate-limiting to prevent spam

## 📝 Future Enhancements
- Add comment/notes field for detailed feedback
- Implement image upload for visual feedback
- Add analytics dashboard
- Implement feedback response system
- Add email notifications for negative feedback

---

**Last Updated**: December 15, 2025
**Component Version**: 1.0.0
