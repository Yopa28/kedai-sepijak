<template>
  <div class="role-based-rating">
    <!-- View A: Role Selection -->
    <div v-if="currentView === 'selection'" class="role-selection">
      <div class="selection-header">
        <h2 class="selection-title">Pilih Kategori Rating</h2>
        <p class="selection-subtitle">Mana yang ingin Anda nilai?</p>
      </div>

      <div class="roles-grid">
        <div
          v-for="(config, roleKey) in roleConfig"
          :key="roleKey"
          class="role-card"
          @click="selectRole(roleKey)"
        >
          <div class="role-icon">{{ config.icon }}</div>
          <h3 class="role-title">{{ config.title }}</h3>
          <p class="role-description">Berikan rating Anda</p>
          <div class="role-cta">Lanjut →</div>
        </div>
      </div>
    </div>

    <!-- View C: Success Screen -->
    <div v-if="currentView === 'success'" class="success-view">
      <div class="success-container">
        <div class="success-icon-wrapper">
          <div class="success-checkmark">✔</div>
        </div>
        <h2 class="success-headline">Terima Kasih!</h2>
        <p class="success-subtext">Masukan Kakak sangat berarti buat kemajuan kami.</p>
        <button class="menu-button" @click="goBack">Kembali ke Menu</button>
      </div>
    </div>

    <!-- View B: Rating Interface -->
    <div v-if="currentView === 'rating'" class="rating-interface">
      <!-- Back Button -->
      <button class="back-button" @click="goBack">
        <span class="back-icon">←</span> Kembali
      </button>

      <!-- Header -->
      <div class="rating-header">
        <div class="header-icon">{{ roleConfig[selectedRole].icon }}</div>
        <h2 class="header-title">{{ roleConfig[selectedRole].title }}</h2>
      </div>

      <!-- Question -->
      <div class="rating-question">
        <p>{{ roleConfig[selectedRole].question }}</p>
      </div>

      <!-- Staff Selection Section -->
      <div v-if="roleConfig[selectedRole].staff" class="staff-section">
        <p class="staff-label">Siapa yang melayani Kakak?</p>
        <div class="staff-grid">
          <button
            v-for="staffMember in roleConfig[selectedRole].staff"
            :key="staffMember"
            class="staff-button"
            :class="{ active: selectedStaff === staffMember }"
            @click="selectStaff(staffMember)"
          >
            {{ staffMember }}
          </button>
        </div>
        <input
          v-if="selectedStaff === 'Lainnya'"
          v-model="manualStaffInput"
          type="text"
          class="manual-staff-input"
          placeholder="Ketik nama (opsional)..."
        />
      </div>

      <!-- Star Rating -->
      <div class="star-rating">
        <div class="stars-container">
          <button
            v-for="(star, index) in 5"
            :key="index"
            class="star"
            :class="{ active: star <= selectedRating }"
            @click="selectRating(star)"
          >
            ★
          </button>
        </div>
        <div v-if="selectedRating > 0" class="rating-text">
          {{ getRatingText(selectedRating) }}
        </div>
      </div>

      <!-- Tags Area -->
      <div v-if="selectedRating > 0" class="tags-area">
        <p class="tags-label">
          {{
            selectedRating >= 4 ? "Apa yang bagus?" : "Apa yang perlu diperbaiki?"
          }}
        </p>
        <div class="tags-container">
          <button
            v-for="tag in currentTags"
            :key="tag"
            class="tag"
            :class="{ selected: selectedTags.includes(tag) }"
            @click="toggleTag(tag)"
          >
            {{ tag }}
          </button>
        </div>
      </div>

      <!-- Submit Button -->
      <button
        v-if="selectedRating > 0"
        class="submit-button"
        :disabled="selectedTags.length === 0"
        @click="submitRating"
      >
        Kirim Rating
      </button>
      <p v-if="selectedRating > 0 && selectedTags.length === 0" class="hint">
        Pilih minimal 1 tag untuk melanjutkan
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoleBasedRating",
  data() {
    return {
      currentView: "selection", // 'selection', 'rating', or 'success'
      selectedRole: null,
      selectedRating: 0,
      selectedTags: [],
      selectedStaff: null,
      manualStaffInput: "",
      successTimeout: null,
      roleConfig: {
        barista: {
          title: "Nilai Barista & Produk",
          icon: "☕",
          question: "Gimana rasa kopi dan minumanmu?",
          positiveTags: [
            "Rasa Enak",
            "Suhu Pas",
            "Latte Art Bagus",
            "Penyajian Cepat",
          ],
          negativeTags: [
            "Hambar/Pahit",
            "Terlalu Manis",
            "Dingin",
            "Penyajian Lama",
            "Salah Menu",
          ],
        },
        waiters: {
          title: "Nilai Pelayanan Waiters",
          icon: "💁‍♂️",
          question: "Seberapa membantu kakak pramusajinya?",
          positiveTags: ["Ramah Banget", "Gercep/Cepat", "Paham Menu", "Helpful"],
          negativeTags: ["Judes/Ketis", "Lambat", "Salah Antar", "Susah Dipanggil"],
          staff: ["Budi", "Siti", "Agus", "Lainnya"],
        },
        kasir: {
          title: "Nilai Transaksi Kasir",
          icon: "💸",
          question: "Gimana pengalaman bayar di kasir?",
          positiveTags: [
            "Proses Cepat",
            "Senyum/Sapa",
            "Penjelasan Jelas",
            "Struk Lengkap",
          ],
          negativeTags: ["Antrian Lama", "Tidak Ramah", "Kembalian Salah", "Ribet"],
          staff: ["Dani", "Rini", "Hendra", "Lainnya"],
        },
        cleaning: {
          title: "Nilai Kebersihan",
          icon: "🧹",
          question: "Apakah tempat kami nyaman dan bersih?",
          positiveTags: ["Meja Kinclong", "Toilet Wangi", "Lantai Bersih", "AC Dingin"],
          negativeTags: [
            "Meja Lengket",
            "Toilet Kotor/Bau",
            "Lantai Licin",
            "Ada Sampah",
          ],
        },
      },
    };
  },
  computed: {
    currentTags() {
      if (!this.selectedRole) return [];
      const config = this.roleConfig[this.selectedRole];
      return this.selectedRating >= 4 ? config.positiveTags : config.negativeTags;
    },
  },
  methods: {
    selectRole(roleKey) {
      this.selectedRole = roleKey;
      this.currentView = "rating";
      this.resetRating();
    },
    goBack() {
      this.currentView = "selection";
      this.selectedRole = null;
      this.resetRating();
    },
    selectRating(stars) {
      this.selectedRating = stars;
      this.selectedTags = []; // Reset tags when rating changes
    },
    selectStaff(staffMember) {
      this.selectedStaff = staffMember;
      // Clear manual input when switching to other staff
      if (staffMember !== "Lainnya") {
        this.manualStaffInput = "";
      }
    },
    toggleTag(tag) {
      const index = this.selectedTags.indexOf(tag);
      if (index > -1) {
        this.selectedTags.splice(index, 1);
      } else {
        this.selectedTags.push(tag);
      }
    },
    getRatingText(rating) {
      const texts = {
        1: "Sangat Buruk",
        2: "Buruk",
        3: "Cukup",
        4: "Bagus",
        5: "Sangat Bagus!",
      };
      return texts[rating] || "";
    },
    submitRating() {
      const resultData = {
        role: this.selectedRole,
        roleTitle: this.roleConfig[this.selectedRole].title,
        starRating: this.selectedRating,
        selectedTags: this.selectedTags,
        selectedStaff: this.selectedStaff || null,
        manualStaffName: this.selectedStaff === "Lainnya" ? this.manualStaffInput : null,
        ratingType:
          this.selectedRating >= 4 ? "positive" : "negative",
        timestamp: new Date().toISOString(),
      };

      console.log("📊 Rating Submitted:", resultData);
      
      // Emit event for parent component
      this.$emit("rating-submitted", resultData);
      
      // Show success view
      this.currentView = "success";
      
      // Auto-reset after 3 seconds
      this.successTimeout = setTimeout(() => {
        this.resetForm();
      }, 3000);
    },
    resetRating() {
      this.selectedRating = 0;
      this.selectedTags = [];
      this.selectedStaff = null;
      this.manualStaffInput = "";
    },
    resetForm() {
      // Clear all form data
      this.selectedRole = null;
      this.selectedRating = 0;
      this.selectedTags = [];
      this.selectedStaff = null;
      this.manualStaffInput = "";
      // Return to role selection view
      this.currentView = "selection";
      // Clear any pending timeout
      if (this.successTimeout) {
        clearTimeout(this.successTimeout);
        this.successTimeout = null;
      }
    },
  },
  beforeUnmount() {
    // Clean up timeout on component unmount
    if (this.successTimeout) {
      clearTimeout(this.successTimeout);
    }
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.role-based-rating {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f1e8 0%, #f0ebe3 100%);
  padding: 2rem 1rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

/* ============ VIEW A: ROLE SELECTION ============ */

.role-selection {
  max-width: 1200px;
  margin: 0 auto;
}

.selection-header {
  text-align: center;
  margin-bottom: 3rem;
  animation: slideDown 0.6s ease-out;
}

.selection-title {
  font-size: 2rem;
  font-weight: 700;
  color: #2d5016;
  margin-bottom: 0.5rem;
}

.selection-subtitle {
  font-size: 1.1rem;
  color: #6b8e4f;
}

.roles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.role-card {
  background: white;
  border-radius: 1.5rem;
  padding: 2rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border: 2px solid transparent;
  text-align: center;
}

.role-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 35px rgba(45, 80, 22, 0.15);
  border-color: #d4a574;
}

.role-icon {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  display: inline-block;
}

.role-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #2d5016;
  margin-bottom: 0.5rem;
}

.role-description {
  font-size: 0.95rem;
  color: #8b9b7f;
  margin-bottom: 1.5rem;
}

.role-cta {
  display: inline-block;
  color: #d4a574;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.role-card:hover .role-cta {
  transform: translateX(4px);
}

/* ============ VIEW C: SUCCESS SCREEN ============ */

.success-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  animation: fadeInView 0.5s ease-out;
}

.success-container {
  text-align: center;
  background: white;
  padding: 3rem 2rem;
  border-radius: 2rem;
  max-width: 500px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  animation: slideUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.success-icon-wrapper {
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}

.success-checkmark {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #2d5016 0%, #1f3610 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  animation: successPulse 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.success-headline {
  font-size: 2.2rem;
  font-weight: 700;
  color: #2d5016;
  margin-bottom: 1rem;
  animation: fadeInText 0.6s ease-out 0.2s both;
}

.success-subtext {
  font-size: 1.1rem;
  color: #6b8e4f;
  line-height: 1.6;
  margin-bottom: 2rem;
  animation: fadeInText 0.6s ease-out 0.4s both;
}

.menu-button {
  background: linear-gradient(135deg, #d4a574 0%, #c89860 100%);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 1rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(212, 165, 116, 0.3);
  animation: fadeInText 0.6s ease-out 0.6s both;
}

.menu-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(212, 165, 116, 0.4);
}

.menu-button:active {
  transform: translateY(0);
}

/* ============ VIEW B: RATING INTERFACE ============ */

.rating-interface {
  max-width: 700px;
  margin: 0 auto;
  animation: slideUp 0.5s ease-out;
}

.back-button {
  background: white;
  border: 2px solid #2d5016;
  color: #2d5016;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
  font-size: 1rem;
}

.back-button:hover {
  background: #2d5016;
  color: white;
  transform: translateX(-4px);
}

.back-icon {
  margin-right: 0.5rem;
}

.rating-header {
  text-align: center;
  margin-bottom: 2.5rem;
  background: white;
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.header-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: inline-block;
}

.header-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2d5016;
}

.rating-question {
  text-align: center;
  margin-bottom: 2.5rem;
  background: linear-gradient(135deg, #6b8e4f 0%, #5a7a43 100%);
  padding: 2rem;
  border-radius: 1.5rem;
  color: white;
  box-shadow: 0 4px 15px rgba(107, 142, 79, 0.2);
}

.rating-question p {
  font-size: 1.3rem;
  font-weight: 500;
  line-height: 1.6;
}

/* ============ STAFF SECTION ============ */

.staff-section {
  background: white;
  padding: 2rem;
  border-radius: 1.5rem;
  margin-bottom: 2.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  animation: slideUp 0.4s ease-out;
}

.staff-label {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d5016;
  margin-bottom: 1rem;
  text-align: center;
}

.staff-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.staff-button {
  background: #f5f1e8;
  border: 2px solid #d4a574;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  cursor: pointer;
  font-weight: 500;
  color: #2d5016;
  transition: all 0.3s ease;
  font-size: 0.95rem;
}

.staff-button:hover {
  background: #ede8dd;
  transform: translateY(-2px);
}

.staff-button.active {
  background: #d4a574;
  color: white;
  border-color: #d4a574;
  box-shadow: 0 4px 12px rgba(212, 165, 116, 0.3);
}

.manual-staff-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #d4a574;
  border-radius: 0.75rem;
  font-size: 0.95rem;
  font-family: inherit;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.manual-staff-input:focus {
  outline: none;
  border-color: #2d5016;
  box-shadow: 0 0 0 3px rgba(45, 80, 22, 0.1);
}

.star-rating {
  text-align: center;
  margin-bottom: 2.5rem;
}

.stars-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.star {
  background: white;
  border: 3px solid #d4a574;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 1.8rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  color: #d4a574;
  display: flex;
  align-items: center;
  justify-content: center;
}

.star:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 15px rgba(212, 165, 116, 0.3);
}

.star.active {
  background: #d4a574;
  color: white;
  transform: scale(1.15);
  box-shadow: 0 6px 20px rgba(212, 165, 116, 0.4);
}

.rating-text {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2d5016;
  animation: fadeIn 0.3s ease;
}

.tags-area {
  background: white;
  padding: 2rem;
  border-radius: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  animation: slideUp 0.4s ease-out;
}

.tags-label {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d5016;
  margin-bottom: 1rem;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tag {
  background: #f5f1e8;
  border: 2px solid #d4a574;
  padding: 0.75rem 1.25rem;
  border-radius: 2rem;
  cursor: pointer;
  font-weight: 500;
  color: #2d5016;
  transition: all 0.3s ease;
  font-size: 0.95rem;
}

.tag:hover {
  background: #ede8dd;
  transform: translateY(-2px);
}

.tag.selected {
  background: #d4a574;
  color: white;
  border-color: #d4a574;
  box-shadow: 0 4px 12px rgba(212, 165, 116, 0.3);
}

.submit-button {
  width: 100%;
  background: linear-gradient(135deg, #2d5016 0%, #1f3610 100%);
  color: white;
  padding: 1.2rem 2rem;
  border: none;
  border-radius: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(45, 80, 22, 0.3);
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(45, 80, 22, 0.4);
}

.submit-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.hint {
  text-align: center;
  color: #d4a574;
  font-size: 0.95rem;
  margin-top: 1rem;
  font-weight: 500;
}

/* ============ ANIMATIONS ============ */

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInView {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInText {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes successPulse {
  0% {
    transform: scale(0) rotateZ(-45deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.1) rotateZ(0);
  }
  100% {
    transform: scale(1) rotateZ(0);
    opacity: 1;
  }
}

/* ============ RESPONSIVE DESIGN (MOBILE FIRST) ============ */

@media (max-width: 768px) {
  .success-container {
    padding: 2rem 1.5rem;
  }

  .success-headline {
    font-size: 1.8rem;
  }

  .success-subtext {
    font-size: 1rem;
  }

  .menu-button {
    padding: 0.9rem 1.8rem;
    font-size: 0.95rem;
  }

  .role-based-rating {
    padding: 1rem 0.75rem;
  }

  .selection-title {
    font-size: 1.5rem;
  }

  .selection-subtitle {
    font-size: 1rem;
  }

  .roles-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .role-card {
    padding: 1.5rem;
  }

  .rating-header {
    padding: 1.5rem;
  }

  .header-title {
    font-size: 1.4rem;
  }

  .rating-question {
    padding: 1.5rem;
  }

  .rating-question p {
    font-size: 1.1rem;
  }

  .staff-section {
    padding: 1.5rem;
  }

  .staff-grid {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 0.5rem;
  }

  .staff-button {
    padding: 0.6rem 0.9rem;
    font-size: 0.85rem;
  }

  .manual-staff-input {
    font-size: 0.9rem;
  }

  .stars-container {
    gap: 0.75rem;
  }

  .star {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
  }

  .tags-area {
    padding: 1.5rem;
  }

  .tags-container {
    gap: 0.5rem;
  }

  .tag {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }

  .submit-button {
    padding: 1rem 1.5rem;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .success-view {
    padding: 1rem 0.75rem;
  }

  .success-container {
    padding: 2rem 1rem;
    border-radius: 1.5rem;
  }

  .success-icon-wrapper {
    margin-bottom: 1.5rem;
  }

  .success-checkmark {
    width: 80px;
    height: 80px;
    font-size: 2.5rem;
  }

  .success-headline {
    font-size: 1.6rem;
    margin-bottom: 0.75rem;
  }

  .success-subtext {
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
  }

  .menu-button {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }

  .role-based-rating {
    padding: 0.75rem 0.5rem;
  }

  .selection-header {
    margin-bottom: 2rem;
  }

  .selection-title {
    font-size: 1.3rem;
  }

  .roles-grid {
    gap: 0.75rem;
  }

  .role-card {
    padding: 1.2rem 1rem;
  }

  .role-icon {
    font-size: 2.5rem;
    margin-bottom: 0.75rem;
  }

  .role-title {
    font-size: 1.1rem;
  }

  .role-description {
    font-size: 0.85rem;
  }

  .stars-container {
    gap: 0.5rem;
  }

  .star {
    width: 45px;
    height: 45px;
    font-size: 1.2rem;
  }

  .rating-text {
    font-size: 1.1rem;
  }

  .tags-label {
    font-size: 1rem;
  }

  .tag {
    padding: 0.5rem 0.8rem;
    font-size: 0.8rem;
  }

  .staff-section {
    padding: 1.2rem 1rem;
    gap: 0.8rem;
  }

  .staff-label {
    font-size: 0.95rem;
  }

  .staff-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.4rem;
  }

  .staff-button {
    padding: 0.5rem 0.7rem;
    font-size: 0.8rem;
  }

  .manual-staff-input {
    font-size: 0.85rem;
    padding: 0.6rem 0.9rem;
  }
}
</style>
