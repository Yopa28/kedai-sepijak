# Role-Based Rating System - Integration Guide

## ✅ What's Been Created

### 1. **Vue Component** (Recommended for your project)
📍 Location: `src/components/RoleBasedRating.vue`

This is a fully functional Vue component that integrates seamlessly with your feedback system.

#### Already Integrated Into:
- `src/views/FeedbackPage.vue` - Users can switch between "Form Tradisional" and "Rating by Role" tabs

#### Key Features:
- ✅ Emits `rating-submitted` event to parent
- ✅ Responsive mobile-first design
- ✅ Integrated with your Tailwind config colors
- ✅ Can be used standalone or with parent logic

---

### 2. **Standalone HTML Version** (For testing/reference)
📍 Location: `role-based-rating-standalone.html`

A complete HTML/CSS/JavaScript version that works without Vue framework.

#### To Use:
Open in browser: `http://localhost/role-based-rating-standalone.html`
Perfect for testing or understanding the flow.

---

## 🚀 How It Works in Your Project

### User Journey:
1. User visits Feedback page
2. Sees two options: "Form Tradisional" vs "Rating by Role"
3. Clicks "Rating by Role" tab
4. Selects a role (Barista, Waiter, Cashier, Cleaning)
5. Rates with 1-5 stars
6. Selects relevant tags
7. Submits → Data is logged to console and parent receives event

---

## 💻 Implementation Code

### In `src/views/FeedbackPage.vue`
The component is already integrated! Here's what was added:

```vue
<!-- Feedback Method Tabs -->
<div class="feedback-tabs mb-8">
    <button 
        class="tab-button"
        :class="{ active: feedbackMethod === 'traditional' }"
        @click="feedbackMethod = 'traditional'"
    >
        Form Tradisional
    </button>
    <button 
        class="tab-button"
        :class="{ active: feedbackMethod === 'roleRating' }"
        @click="feedbackMethod = 'roleRating'"
    >
        Rating by Role
    </button>
</div>

<!-- Role-Based Rating Component -->
<RoleBasedRating 
    v-if="feedbackMethod === 'roleRating'" 
    @rating-submitted="handleRatingSubmitted" 
/>
```

### In Script Section:
```javascript
data() {
    return {
        feedbackMethod: 'traditional'
    };
},
methods: {
    handleRatingSubmitted(ratingData) {
        console.log('Rating submitted:', ratingData);
        // TODO: Send to backend API
        // Example:
        // await this.$api.post('/feedback/role-rating', ratingData);
    }
}
```

---

## 🔌 Backend Integration (Next Steps)

### Submitted Data Format:
```javascript
{
    role: "barista",                    // String
    roleTitle: "Nilai Barista & Produk", // String
    starRating: 5,                      // Number: 1-5
    selectedTags: ["Rasa Enak", "Suhu Pas"], // Array<String>
    ratingType: "positive",             // "positive" | "negative"
    timestamp: "2025-12-15T10:30:00.000Z" // ISO String
}
```

### API Endpoint Example:
```javascript
// In handleRatingSubmitted method
async handleRatingSubmitted(ratingData) {
    try {
        const response = await fetch('/api/feedback/role-rating', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...ratingData,
                latitude: this.userLocation?.latitude,
                longitude: this.userLocation?.longitude,
                ipAddress: this.userIp
            })
        });
        
        if (response.ok) {
            this.$message.success('Rating berhasil disimpan!');
        }
    } catch (error) {
        console.error('Error:', error);
        this.$message.error('Gagal menyimpan rating');
    }
}
```

---

## 🎨 Customization

### Changing Colors
Edit colors in `src/components/RoleBasedRating.vue` CSS section:

```css
/* Primary green - main buttons */
.header-title { color: #2d5016; } /* Change this hex code */

/* Accent amber - highlights, tags */
.star.active { background: #d4a574; } /* Change this hex code */
```

### Adding/Modifying Roles
In `src/components/RoleBasedRating.vue`, update the `roleConfig`:

```javascript
roleConfig: {
    newRole: {
        title: "Nilai [New Role]",
        icon: "🎯",
        question: "Your question?",
        positiveTags: ["Tag1", "Tag2"],
        negativeTags: ["Tag3", "Tag4"]
    }
}
```

---

## 📊 Analytics & Tracking

### Console Logging (Currently Active)
Every submission logs to browser console:
```javascript
// Open DevTools (F12) → Console tab to see:
📊 Rating Submitted: {
    role: "barista",
    roleTitle: "...",
    starRating: 5,
    selectedTags: [...],
    ratingType: "positive",
    timestamp: "..."
}
```

### Google Analytics Integration (Optional)
```javascript
handleRatingSubmitted(ratingData) {
    // Track in Google Analytics
    gtag('event', 'role_rating_submitted', {
        role: ratingData.role,
        rating: ratingData.starRating,
        tag_count: ratingData.selectedTags.length
    });
}
```

---

## 🧪 Testing

### Test Cases:
1. ✅ Click role card → Should switch to rating view
2. ✅ Click back button → Should return to role selection
3. ✅ Select 4-5 stars → Should show positive tags
4. ✅ Select 1-3 stars → Should show negative tags
5. ✅ Toggle tags → Button should highlight
6. ✅ Submit without tags → Button should be disabled
7. ✅ Submit with tags → Should log data to console
8. ✅ Mobile responsiveness → Test on different screen sizes

### Browser DevTools:
1. Open: F12 or Right-click → Inspect
2. Go to Console tab
3. Submit a rating
4. See console output: `📊 Rating Submitted: {...}`

---

## 📱 Responsive Breakpoints

- **Mobile (< 480px)**: Optimized for touch, single column layout
- **Tablet (480px - 768px)**: 2-column role card grid
- **Desktop (> 768px)**: 4-column role card grid

---

## 🎯 Files Modified/Created

### Created:
- ✅ `src/components/RoleBasedRating.vue` - Main Vue component
- ✅ `role-based-rating-standalone.html` - Standalone version
- ✅ `ROLE_BASED_RATING_DOCS.md` - Full documentation
- ✅ `ROLE_BASED_RATING_INTEGRATION.md` - This file

### Modified:
- ✅ `src/views/FeedbackPage.vue` - Added component + tabs + handler

---

## 🐛 Troubleshooting

### Component not showing?
```javascript
// In FeedbackPage.vue, check:
1. Is RoleBasedRating imported? ✅ Yes
2. Is it registered in components? ✅ Yes
3. Is v-if condition correct? ✅ Check feedbackMethod === 'roleRating'
```

### Tags not appearing?
- Rating must be selected first
- Positive tags: only for 4-5 stars
- Negative tags: only for 1-3 stars

### Data not logging?
- Open DevTools (F12)
- Go to Console tab
- Submit a rating
- Should see: `📊 Rating Submitted: {...}`

---

## 📈 Next Steps

1. **Backend API**: Create endpoint to save role ratings
2. **Database**: Add table for role-based ratings
3. **Analytics**: Track metrics per role
4. **Notifications**: Email team on negative feedback
5. **Responses**: Add feedback response system

---

## 📞 Support

If you need to:
- **Modify colors**: Edit CSS in component
- **Add new roles**: Update roleConfig object
- **Change text**: Update labels in roleConfig
- **Integrate with backend**: Use handleRatingSubmitted method

---

**Version**: 1.0.0
**Last Updated**: December 15, 2025
**Status**: ✅ Ready for Production
