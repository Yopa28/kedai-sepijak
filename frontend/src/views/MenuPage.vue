<template>
    <div class="min-h-screen bg-background-beige font-body">
        <!-- ========================================
             HERO SECTION (Lebih menyatu dengan tema)
        ========================================= -->
        <div class="relative overflow-hidden bg-primary-green pt-24 pb-16">
            <!-- Ornamen Background -->
            <div class="absolute inset-0 opacity-[0.03] pointer-events-none" style="background-image: radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0); background-size: 24px 24px;"></div>
            
            <!-- Glow effect -->
            <div class="absolute -top-32 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-accent-amber/[0.08] blur-[100px] pointer-events-none"></div>
            
            <div class="relative container mx-auto px-6 text-center z-10">
                <div class="max-w-4xl mx-auto" data-aos="fade-up">
                    <h1 class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-background-beige mb-3 leading-tight tracking-tight">
                        Daftar Menu
                        <span class="block text-accent-amber mt-2">Kedai Sepijak</span>
                    </h1>
                    
                    <div class="mt-8 flex justify-center">
                        <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-5 py-2 border border-white/15">
                            <span class="w-2 h-2 rounded-full bg-accent-amber animate-pulse"></span>
                            <span class="text-background-beige/90 font-medium text-sm tracking-wide">{{ menuItems.length }} Menu Tersedia</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ========================================
             STICKY NAVIGATION & SEARCH BAR
        ========================================= -->
        <div class="sticky top-0 z-30 bg-background-beige/90 backdrop-blur-xl border-b border-primary-green/10 shadow-sm transition-all">
            <div class="container mx-auto px-4 sm:px-6 py-4">
                <div class="flex flex-col md:flex-row gap-4 items-center justify-between max-w-7xl mx-auto">
                    
                    <!-- Kategori Horizontal Scroll (Sembunyikan Scrollbar) -->
                    <div class="w-full md:w-2/3 overflow-x-auto hide-scrollbar scroll-smooth flex gap-2 pb-1 snap-x">
                        <button
                            v-for="category in categories"
                            :key="category"
                            @click="selectedCategory = category"
                            class="snap-start whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300"
                            :class="selectedCategory === category
                                ? 'bg-primary-green text-accent-amber shadow-md'
                                : 'bg-white text-primary-green/70 hover:bg-primary-green hover:text-white border border-primary-green/15'"
                        >
                            {{ category }}
                        </button>
                    </div>

                    <!-- Search Bar -->
                    <div class="w-full md:w-1/3 relative">
                        <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary-green/50 text-xl pointer-events-none">
                            search
                        </span>
                        <input 
                            v-model="searchQuery" 
                            type="text" 
                            placeholder="Cari menu favoritmu..." 
                            class="w-full bg-white border border-primary-green/15 rounded-full py-2.5 pl-11 pr-4 text-sm text-primary-green focus:outline-none focus:ring-2 focus:ring-accent-amber/50 focus:border-accent-amber transition-all shadow-sm"
                        >
                    </div>
                </div>
            </div>
        </div>

        <!-- ========================================
             MENU GRID
        ========================================= -->
        <div class="container mx-auto px-6 py-12 md:py-16 max-w-7xl">
            <!-- Header Kategori Aktif -->
            <div class="flex items-center gap-4 mb-10" v-if="selectedCategory !== 'Semua' || searchQuery">
                <h2 class="font-display text-2xl md:text-3xl font-bold text-primary-green">
                    {{ searchQuery ? 'Hasil Pencarian' : selectedCategory }}
                </h2>
                <div class="h-px flex-1 bg-gradient-to-r from-accent-amber/50 to-transparent"></div>
            </div>

            <TransitionGroup 
                tag="div" 
                name="list"
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
                <div
                    v-for="item in filteredMenuItems"
                    :key="item.id"
                    class="group relative bg-white rounded-2xl p-6 shadow-sm border border-primary-green/5 hover:shadow-[0_20px_40px_-15px_rgba(20,40,30,0.15)] transition-all duration-300 flex flex-col h-full hover:-translate-y-1 overflow-hidden"
                >
                    <!-- Aksen garis vertikal di sebelah kiri saat hover -->
                    <div class="absolute left-0 top-0 bottom-0 w-1 bg-accent-amber scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100"></div>

                    <div class="flex flex-col h-full z-10">
                        <div class="mb-4">
                            <!-- Label Kategori -->
                            <span class="inline-block px-2.5 py-1 text-[9px] font-bold tracking-[0.15em] text-accent-amber uppercase bg-primary-green rounded-md mb-3">
                                {{ item.category }}
                            </span>
                            
                            <h3 class="font-display font-bold text-lg text-primary-green group-hover:text-accent-amber transition-colors leading-snug">
                                {{ item.name }}
                            </h3>
                        </div>
                        
                        <p class="text-sm text-text-charcoal/60 mb-6 flex-grow leading-relaxed">
                            {{ item.description || 'Sajian spesial dari dapur Sepijak.' }}
                        </p>
                        
                        <!-- Harga dengan tipografi tegas -->
                        <div class="pt-4 mt-auto border-t border-dashed border-primary-green/15 flex justify-between items-center">
                            <span class="text-lg font-bold text-primary-green">
                                Rp {{ item.price.toLocaleString('id-ID') }}
                            </span>
                            
                            <!-- Ikon panah mikro interaksi -->
                            <span class="material-symbols-outlined text-primary-green/20 group-hover:text-accent-amber transition-colors duration-300 group-hover:translate-x-1">
                                arrow_forward
                            </span>
                        </div>
                    </div>
                </div>
            </TransitionGroup>

            <!-- Empty State yang lebih cantik -->
            <div v-if="filteredMenuItems.length === 0" class="text-center py-24 bg-white/40 rounded-3xl border border-dashed border-primary-green/20 mt-8 backdrop-blur-sm">
                <span class="material-symbols-outlined text-6xl text-primary-green/20 mb-4 block">
                    search_off
                </span>
                <h3 class="font-display text-2xl font-bold text-primary-green mb-2">Menu tidak ditemukan</h3>
                <p class="text-text-charcoal/60">Maaf, kami tidak dapat menemukan menu "{{ searchQuery }}".<br>Silakan coba kata kunci lain atau pilih kategori yang tersedia.</p>
                <button @click="resetFilter" class="mt-6 text-sm font-bold text-accent-amber hover:text-primary-green underline underline-offset-4 transition-colors">
                    Kembali ke Semua Menu
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const selectedCategory = ref('Semua');
const searchQuery = ref('');

const categories = [
    'Semua', 'Manual Brew', 'Espresso', 'Signature Coffee', 
    'Premium Coffee Milk', 'Non Coffee Latte', 'Es Segar', 
    'Kopi Talua', 'Artisan Tea', 'Sparkling', 
    'Makanan Ringan', 'Makanan Utama'
];

const menuItems = ref([
    // Manual Brew (Hot)
    { id: 1, name: 'Kopi Tubruk Robusta', price: 10000, category: 'Manual Brew', description: 'Kopi tubruk tradisional dengan cita rasa robusta yang kuat' },
    { id: 2, name: 'Kopi Tubruk Robusta Susu', price: 12000, category: 'Manual Brew', description: 'Kopi tubruk robusta dengan tambahan susu segar' },
    { id: 3, name: 'Kopi Tubruk Robusta Butter', price: 13000, category: 'Manual Brew', description: 'Kopi tubruk robusta dengan sentuhan butter yang creamy' },
    { id: 4, name: 'Vietnam Drip', price: 14000, category: 'Manual Brew', description: 'Kopi Vietnam drip dengan karakter unik dan aroma khas' },
    
    // Espresso Based
    { id: 5, name: 'Espresso (R) 1 Shot', price: 8000, category: 'Espresso', description: 'Single shot espresso murni' },
    { id: 6, name: 'Espresso (HB) 1 Shot', price: 10000, category: 'Espresso', description: 'Single shot espresso house blend' },
    { id: 7, name: 'Americano (Hot)', price: 14000, category: 'Espresso', description: 'Espresso dengan air panas' },
    { id: 8, name: 'Americano (Ice)', price: 15000, category: 'Espresso', description: 'Espresso dengan air dingin dan es' },
    { id: 9, name: 'Dirty Latte (Hot)', price: 15000, category: 'Espresso', description: 'Latte dengan shot espresso yang tidak tercampur' },
    { id: 10, name: 'Dirty Latte (Ice)', price: 16000, category: 'Espresso', description: 'Dirty latte versi dingin dengan es' },
    { id: 11, name: 'Cappucino (Hot)', price: 16000, category: 'Espresso', description: 'Cappuccino klasik dengan foam yang sempurna' },
    { id: 12, name: 'Cappucino (Ice)', price: 17000, category: 'Espresso', description: 'Cappuccino dingin dengan es' },
    { id: 13, name: 'Moccachino (Hot)', price: 17000, category: 'Espresso', description: 'Kombinasi espresso, cokelat, dan susu panas' },
    { id: 14, name: 'Moccachino (Ice)', price: 18000, category: 'Espresso', description: 'Moccachino dingin dengan es' },

    // Signature Coffee
    { id: 15, name: 'Sepijak Peachpresso', price: 18000, category: 'Signature Coffee', description: 'Signature coffee dengan rasa peach yang segar' },
    { id: 16, name: 'Sepijak Grapresso', price: 18000, category: 'Signature Coffee', description: 'Espresso dengan sentuhan grape yang unik' },
    { id: 17, name: 'Sepijak Lycheepresso', price: 18000, category: 'Signature Coffee', description: 'Perpaduan espresso dengan lychee yang eksotis' },
    { id: 18, name: 'Sepijak Limepresso', price: 18000, category: 'Signature Coffee', description: 'Espresso dengan kesegaran lime' },

    // Premium Coffee Milk
    { id: 19, name: 'Coconut Milky Coffela', price: 16000, category: 'Premium Coffee Milk', description: 'Kopi susu dengan kelapa yang creamy' },
    { id: 20, name: 'Arenga Palmello Coffela', price: 17000, category: 'Premium Coffee Milk', description: 'Kopi susu dengan gula aren dan palm' },
    { id: 21, name: 'Butterscotch Salt Coffela', price: 18000, category: 'Premium Coffee Milk', description: 'Kopi susu butterscotch dengan sentuhan garam' },
    { id: 22, name: 'Pistachio Chocoffela', price: 18000, category: 'Premium Coffee Milk', description: 'Kopi susu pistachio dengan cokelat' },

    // Non Coffee Latte Series
    { id: 23, name: 'Thai Leaf Latte (Hot)', price: 16000, category: 'Non Coffee Latte', description: 'Latte teh Thailand hangat' },
    { id: 24, name: 'Thai Leaf Latte (Ice)', price: 17000, category: 'Non Coffee Latte', description: 'Latte teh Thailand dingin' },
    { id: 25, name: 'Green Thai Latte (Hot)', price: 16000, category: 'Non Coffee Latte', description: 'Latte teh hijau Thailand hangat' },
    { id: 26, name: 'Green Thai Latte (Ice)', price: 17000, category: 'Non Coffee Latte', description: 'Latte teh hijau Thailand dingin' },
    { id: 27, name: 'Choco Latte (Hot)', price: 16000, category: 'Non Coffee Latte', description: 'Latte cokelat hangat' },
    { id: 28, name: 'Choco Latte (Ice)', price: 17000, category: 'Non Coffee Latte', description: 'Latte cokelat dingin' },
    { id: 29, name: 'Taro Latte (Hot)', price: 16000, category: 'Non Coffee Latte', description: 'Latte taro hangat' },
    { id: 30, name: 'Taro Latte (Ice)', price: 17000, category: 'Non Coffee Latte', description: 'Latte taro dingin' },
    { id: 31, name: 'Red Velvet Latte (Hot)', price: 17000, category: 'Non Coffee Latte', description: 'Latte red velvet hangat' },
    { id: 32, name: 'Red Velvet Latte (Ice)', price: 18000, category: 'Non Coffee Latte', description: 'Latte red velvet dingin' },
    { id: 33, name: 'Matcha Latte (Hot)', price: 17000, category: 'Non Coffee Latte', description: 'Latte matcha hangat' },
    { id: 34, name: 'Matcha Latte (Ice)', price: 18000, category: 'Non Coffee Latte', description: 'Latte matcha dingin' },

    // Es Segar
    { id: 35, name: 'Es Kunir Sereh Jahe', price: 14000, category: 'Es Segar', description: 'Minuman segar kunyit, sereh, dan jahe' },
    { id: 36, name: 'Es Aren Asem Jawa', price: 15000, category: 'Es Segar', description: 'Es segar gula aren dengan asam jawa' },
    { id: 37, name: 'Es Lidah Buaya Khas Ponti', price: 15000, category: 'Es Segar', description: 'Es lidah buaya khas Pontianak' },
    { id: 38, name: 'Es Teler Sepijak', price: 18000, category: 'Es Segar', description: 'Es teler khas Sepijak dengan berbagai buah segar' },

    // Kopi Talua
    { id: 39, name: 'Kopi Talua', price: 17000, category: 'Kopi Talua', description: 'Kopi khas Minang dengan telur yang dikocok' },

    // Artisan Tea Rempah & Artisan Tea Series
    { id: 40, name: 'Wedang Rempah Sereh Madu', price: 15000, category: 'Artisan Tea', description: 'Wedang rempah dengan sereh dan madu' },
    { id: 41, name: 'Wedang Teh Rempah Madu', price: 16000, category: 'Artisan Tea', description: 'Teh rempah dengan madu' },
    { id: 42, name: 'Wedang Kopi Rempah Madu', price: 16000, category: 'Artisan Tea', description: 'Kopi rempah dengan madu' },
    { id: 43, name: 'Wedang Jahe Rempah Madu', price: 16000, category: 'Artisan Tea', description: 'Jahe rempah dengan madu' },
    { id: 44, name: 'Wedang Jahe Rempah Madu Susu', price: 17000, category: 'Artisan Tea', description: 'Jahe rempah madu dengan susu' },
    { id: 45, name: 'Peach Tea (Hot)', price: 12000, category: 'Artisan Tea', description: 'Teh peach hangat' },
    { id: 46, name: 'Peach Tea (Ice)', price: 13000, category: 'Artisan Tea', description: 'Teh peach dingin' },
    { id: 47, name: 'Lemon Fruit Tea (Hot)', price: 13000, category: 'Artisan Tea', description: 'Teh buah lemon hangat' },
    { id: 48, name: 'Lemon Fruit Tea (Ice)', price: 14000, category: 'Artisan Tea', description: 'Teh buah lemon dingin' },
    { id: 49, name: 'Lychee Fruit Tea (Hot)', price: 13000, category: 'Artisan Tea', description: 'Teh buah lychee hangat' },
    { id: 50, name: 'Lychee Fruit Tea (Ice)', price: 14000, category: 'Artisan Tea', description: 'Teh buah lychee dingin' },
    { id: 51, name: 'Honey Lemongrass Tea (Hot)', price: 14000, category: 'Artisan Tea', description: 'Teh sereh madu hangat' },
    { id: 52, name: 'Honey Lemongrass Tea (Ice)', price: 15000, category: 'Artisan Tea', description: 'Teh sereh madu dingin' },
    { id: 53, name: 'Butterfly Tea Honey Lemon (Ice)', price: 15000, category: 'Artisan Tea', description: 'Teh butterfly dengan madu lemon' },
    { id: 54, name: 'Rosella Tea Honey Lemon (Ice)', price: 15000, category: 'Artisan Tea', description: 'Teh rosella dengan madu lemon' },
    { id: 55, name: 'Green Tea Honey Lemon (Ice)', price: 15000, category: 'Artisan Tea', description: 'Teh hijau dengan madu lemon' },

    // Sparkling Series
    { id: 56, name: 'Sunset Sparkling (Lime Rosella)', price: 15000, category: 'Sparkling', description: 'Minuman sparkling lime rosella' },
    { id: 57, name: 'Sunrise Sparkling (Lime Green)', price: 15000, category: 'Sparkling', description: 'Minuman sparkling lime hijau' },
    { id: 58, name: 'Purplemoon Sparkling (Lime Butterfly)', price: 15000, category: 'Sparkling', description: 'Minuman sparkling lime butterfly' },
    { id: 59, name: 'Tropical Sparkling (Lime Orange)', price: 16000, category: 'Sparkling', description: 'Minuman sparkling lime jeruk' },
    { id: 60, name: 'Red Savana Sparkling (Orange Rosella)', price: 16000, category: 'Sparkling', description: 'Minuman sparkling jeruk rosella' },
    { id: 61, name: 'Magenta Sparkling (Orange Butterfly)', price: 16000, category: 'Sparkling', description: 'Minuman sparkling jeruk butterfly' },

    // Makanan Ringan
    { id: 62, name: 'Sandwich', price: 17000, category: 'Makanan Ringan', description: 'Sandwich segar dengan isian lengkap' },
    { id: 63, name: 'Tahu Cabe Garam', price: 18000, category: 'Makanan Ringan', description: 'Tahu goreng dengan bumbu cabe garam' },
    { id: 64, name: 'Dimsum Goreng', price: 19000, category: 'Makanan Ringan', description: 'Dimsum goreng crispy' },
    { id: 65, name: 'Tahu Cireng', price: 17000, category: 'Makanan Ringan', description: 'Tahu isi cireng yang gurih' },
    { id: 66, name: 'Lumpia Sanur', price: 17000, category: 'Makanan Ringan', description: 'Lumpia khas Sanur dengan isian segar' },
    { id: 67, name: 'Perkedel Sepijak', price: 19000, category: 'Makanan Ringan', description: 'Perkedel khas Sepijak' },
    { id: 68, name: 'Mendoan', price: 19000, category: 'Makanan Ringan', description: 'Tempe mendoan khas Purwokerto' },
    { id: 69, name: 'Fried Fries', price: 19000, category: 'Makanan Ringan', description: 'Kentang goreng crispy' },

    // Makanan Utama
    { id: 70, name: 'Nasi Goreng Sepijak', price: 25000, category: 'Makanan Utama', description: 'Nasi goreng putih dengan bumbu racikan spesial, gurih asin, makin spesial kita menggunakan beras basmati' },
    { id: 71, name: 'Nasi Goreng Klasik', price: 19000, category: 'Makanan Utama', description: 'Nasi goreng basic rasanya seperti nasi goreng bumbu rumahan yang selalu bikin rindu' },
    { id: 72, name: 'Spaghetti Rebus Jowo', price: 22000, category: 'Makanan Utama', description: 'Salah satu menu signature kami, basic mie godog jowo yang dipadukan dengan spaghetti hingga tercipta rasa yang unik dan menarik' },
    { id: 73, name: 'Telor 3D Sepijak', price: 14000, category: 'Makanan Utama', description: 'Salah satu menu khas sepijak, nasi hangat yang dibalut dengan telur dadar goreng yang dioles dengan bumbu khusu supaya makin nikmat' },
    { id: 74, name: 'Ayam Bakar', price: 25000, category: 'Makanan Utama', description: 'Ayam bakar khas Sepijak yang dibakar dengan bumbu khas dapur kami, disajikan dengan kalian goreng dan sambel bawang' },
    { id: 75, name: 'Ayam Pop', price: 25000, category: 'Makanan Utama', description: 'Hidangan khas Minangkabau yang terkenal dengan dagingnya yang lembut, gurih, dan juicy. Ayam dimasak dengan bumbu rempah khas, hingga matang sempurna namun tetap berwarna putih. Disajikan dengan nasi, sambel lado tomat segar dan nasi hangat' },
    { id: 76, name: 'Bebek Hitam', price: 38000, category: 'Makanan Utama', description: 'Kuliner khas madura yang banyak diminati, gurih tempah bebek dengan bumbu hitam yang pekat dan sambel bawang sebagai pelengkap menjadi sajian yang menarik untuk dicoba' },
    { id: 77, name: 'Selat Solo Signature', price: 41000, category: 'Makanan Utama', description: 'Merupakan hidangan khas kota Solo perpaduan antara masakan Eropa dan Jawa. Hidangan ini berupa bistik daging sapi atau galantine yang disajikan dengan kuah encer yang manis, sayuran rebus dan kentang dan mayonese Jawa' },
    { id: 78, name: 'Galantine', price: 35000, category: 'Makanan Utama', description: 'Hidangan khas solo olahan daging lembut berkuah gurih, disajikan dengan kentang, sayuran, dan saus, menghadirkan perpaduan rasa Jawa dan sentuhan Eropa yang memikat' },
    { id: 79, name: 'Sup Matahari', price: 25000, category: 'Makanan Utama', description: 'Sup tradisional khas kota Solo berisi cincangan ayam, sayuran, yang dibentuk menyerupai matahari dengan disiram kuah kaldu ayam yang light' }
]);

// Logika Filter (Kategori + Search Bar)
const filteredMenuItems = computed(() => {
    let result = menuItems.value;

    // Filter by Category
    if (selectedCategory.value !== 'Semua') {
        result = result.filter(item => item.category === selectedCategory.value);
    }

    // Filter by Search Query
    if (searchQuery.value.trim() !== '') {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(item => 
            item.name.toLowerCase().includes(query) || 
            (item.description && item.description.toLowerCase().includes(query))
        );
    }

    return result;
});

const resetFilter = () => {
    selectedCategory.value = 'Semua';
    searchQuery.value = '';
};

onMounted(() => {
    document.title = 'Menu Lengkap - Kedai Sepijak';
});
</script>

<style scoped>
/* Utilitas untuk menyembunyikan scrollbar tapi tetap bisa di-scroll */
.hide-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
.hide-scrollbar::-webkit-scrollbar {
    display: none; /* Chrome, Safari and Opera */
}

/* Transisi halus untuk grid item */
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}
</style>