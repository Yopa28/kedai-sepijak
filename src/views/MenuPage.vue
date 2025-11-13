<template>
    <div class="min-h-screen bg-gradient-to-br from-background-beige via-secondary-sage/5 to-background-beige">
        <!-- Hero Header with Parallax Effect -->
        <div class="relative bg-gradient-to-r from-primary-green via-primary-green/95 to-primary-green overflow-hidden">
            <!-- Background Pattern -->
            <div class="absolute inset-0 opacity-10">
                <div class="absolute inset-0" style="background-image: radial-gradient(circle at 25px 25px, rgba(255,255,255,0.1) 2px, transparent 2px); background-size: 50px 50px;"></div>
            </div>
            
            <div class="relative container mx-auto px-6 py-20 text-center">
                <div class="max-w-4xl mx-auto">
                    <h1 class="font-display text-5xl md:text-7xl font-bold text-background-beige mb-6 leading-tight">
                        Menu Lengkap
                        <span class="block text-accent-amber">Kedai Sepijak</span>
                    </h1>
                    <p class="text-xl md:text-2xl text-secondary-sage max-w-2xl mx-auto leading-relaxed">
                        Nikmati berbagai pilihan kopi artisan, makanan lezat, dan minuman segar yang dibuat dengan cinta
                    </p>
                    <div class="mt-8 flex justify-center">
                        <div class="bg-background-beige/10 backdrop-blur-sm rounded-full px-6 py-3 border border-background-beige/20">
                            <span class="text-background-beige font-medium">{{ menuItems.length }} Menu Tersedia</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Enhanced Categories Filter -->
        <div class="sticky top-0 z-20 bg-background-beige/95 backdrop-blur-md border-b border-primary-green/10 shadow-lg">
            <div class="container mx-auto px-6 py-6">
                <div class="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
                    <button
                        v-for="category in categories"
                        :key="category"
                        @click="selectedCategory = category"
                        :class="[
                            'rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 transform hover:scale-105 shadow-md',
                            selectedCategory === category
                                ? 'bg-primary-green text-background-beige shadow-primary-green/30 scale-105'
                                : 'bg-white text-primary-green hover:bg-primary-green/5 border border-primary-green/20'
                        ]"
                    >
                        {{ category }}
                    </button>
                </div>
            </div>
        </div>

        <!-- Enhanced Menu Items Grid -->
        <div class="container mx-auto px-6 py-16">
            <!-- Category Title -->
            <div class="text-center mb-12" v-if="selectedCategory !== 'Semua'">
                <h2 class="text-3xl md:text-4xl font-bold text-primary-green mb-4">{{ selectedCategory }}</h2>
                <div class="w-24 h-1 bg-accent-amber mx-auto rounded-full"></div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <div
                    v-for="(item, index) in filteredMenuItems"
                    :key="item.id"
                    class="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-primary-green/5"
                    :style="{ animationDelay: `${index * 50}ms` }"
                >
                    <!-- Image Container with Overlay -->
                    <div class="relative aspect-[4/3] bg-gradient-to-br from-primary-green/5 to-secondary-sage/10 overflow-hidden">
                        <img
                            v-if="item.image"
                            :src="item.image"
                            :alt="item.name"
                            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            loading="lazy"
                        />
                        <div v-else class="flex items-center justify-center h-full text-primary-green/40">
                            <div class="text-center">
                                <div class="text-6xl mb-3">{{ item.emoji || '🍽️' }}</div>
                                <p class="text-sm font-medium">{{ item.name }}</p>
                            </div>
                        </div>
                        
                        <!-- Gradient Overlay -->
                        <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <!-- Category Badge -->
                        <div class="absolute top-4 right-4">
                            <span class="bg-primary-green/90 backdrop-blur-sm text-background-beige text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                {{ item.category }}
                            </span>
                        </div>
                    </div>

                    <!-- Content -->
                    <div class="p-6">
                        <h3 class="font-bold text-xl text-primary-green mb-3 line-clamp-2 group-hover:text-primary-green/80 transition-colors">
                            {{ item.name }}
                        </h3>
                        
                        <p v-if="item.description" class="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                            {{ item.description }}
                        </p>
                        
                        <!-- Price and Action -->
                        <div class="flex justify-between items-center pt-4 border-t border-gray-100">
                            <div>
                                <span class="text-2xl font-bold text-primary-green">
                                    Rp {{ item.price.toLocaleString('id-ID') }}
                                </span>
                            </div>
                            <button class="bg-accent-amber hover:bg-accent-amber/90 text-primary-green px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-md">
                                Pesan
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-if="filteredMenuItems.length === 0" class="text-center py-20">
                <div class="text-6xl mb-4">🔍</div>
                <h3 class="text-2xl font-bold text-primary-green mb-2">Tidak ada menu ditemukan</h3>
                <p class="text-gray-600">Coba pilih kategori lain atau kembali ke semua menu</p>
            </div>
        </div>

        <!-- Enhanced Back to Home Section -->
        <div class="bg-gradient-to-r from-primary-green/5 via-secondary-sage/5 to-primary-green/5 py-16">
            <div class="container mx-auto px-6 text-center">
                <div class="max-w-md mx-auto">
                    <h3 class="text-2xl font-bold text-primary-green mb-4">Siap untuk memesan?</h3>
                    <p class="text-gray-600 mb-8">Kunjungi kedai kami atau hubungi untuk pemesanan</p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <router-link
                            to="/"
                            class="inline-flex items-center justify-center gap-2 bg-primary-green text-background-beige px-8 py-4 rounded-full font-bold hover:bg-primary-green/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            ← Kembali ke Beranda
                        </router-link>
                        <a
                            href="/#contact"
                            class="inline-flex items-center justify-center gap-2 bg-accent-amber text-primary-green px-8 py-4 rounded-full font-bold hover:bg-accent-amber/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            📞 Hubungi Kami
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MenuPage',
    data() {
        return {
            selectedCategory: 'Semua',
            categories: [
                'Semua',
                'Manual Brew',
                'Espresso',
                'Signature Coffee',
                'Premium Coffee Milk',
                'Non Coffee Latte',
                'Es Segar',
                'Kopi Talua',
                'Artisan Tea',
                'Sparkling',
                'Makanan Ringan',
                'Makanan Utama'
            ],
            menuItems: [
                // Manual Brew (Hot)
                { id: 1, name: 'Kopi Tubruk Robusta', price: 10000, category: 'Manual Brew', description: 'Kopi tubruk tradisional dengan cita rasa robusta yang kuat', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop&crop=center', emoji: '☕' },
                { id: 2, name: 'Kopi Tubruk Robusta Susu', price: 12000, category: 'Manual Brew', description: 'Kopi tubruk robusta dengan tambahan susu segar', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop&crop=center', emoji: '🥛' },
                { id: 3, name: 'Kopi Tubruk Robusta Butter', price: 13000, category: 'Manual Brew', description: 'Kopi tubruk robusta dengan sentuhan butter yang creamy', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop&crop=center', emoji: '🧈' },
                { id: 4, name: 'Vietnam Drip', price: 14000, category: 'Manual Brew', description: 'Kopi Vietnam drip dengan karakter unik dan aroma khas', image: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=400&h=300&fit=crop&crop=center', emoji: '🇻🇳' },
                
                // Espresso Based
                { id: 5, name: 'Espresso (R) 1 Shot', price: 8000, category: 'Espresso', description: 'Single shot espresso murni', image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=300&fit=crop&crop=center', emoji: '☕' },
                { id: 6, name: 'Espresso (HB) 1 Shot', price: 10000, category: 'Espresso', description: 'Single shot espresso house blend', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop&crop=center', emoji: '☕' },
                { id: 7, name: 'Americano (Hot)', price: 14000, category: 'Espresso', description: 'Espresso dengan air panas', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center', emoji: '☕' },
                { id: 8, name: 'Americano (Ice)', price: 15000, category: 'Espresso', description: 'Espresso dengan air dingin dan es', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&h=300&fit=crop&crop=center', emoji: '🧊' },
                { id: 9, name: 'Dirty Latte (Hot)', price: 15000, category: 'Espresso', description: 'Latte dengan shot espresso yang tidak tercampur', image: 'https://images.unsplash.com/photo-1485808191679-5760e38e9019?w=400&h=300&fit=crop&crop=center', emoji: '☕' },
                { id: 10, name: 'Dirty Latte (Ice)', price: 16000, category: 'Espresso', description: 'Dirty latte versi dingin dengan es', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop&crop=center', emoji: '🧊' },
                { id: 11, name: 'Cappucino (Hot)', price: 16000, category: 'Espresso', description: 'Cappuccino klasik dengan foam yang sempurna', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop&crop=center', emoji: '☕' },
                { id: 12, name: 'Cappucino (Ice)', price: 17000, category: 'Espresso', description: 'Cappuccino dingin dengan es', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop&crop=center', emoji: '🧊' },
                { id: 13, name: 'Moccachino (Hot)', price: 17000, category: 'Espresso', description: 'Kombinasi espresso, cokelat, dan susu panas', image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=400&h=300&fit=crop&crop=center', emoji: '🍫' },
                { id: 14, name: 'Moccachino (Ice)', price: 18000, category: 'Espresso', description: 'Moccachino dingin dengan es', image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400&h=300&fit=crop&crop=center', emoji: '🍫' },

                // Signature Coffee
                { id: 15, name: 'Sepijak Peachpresso', price: 18000, category: 'Signature Coffee', description: 'Signature coffee dengan rasa peach yang segar', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&crop=center', emoji: '🍑' },
                { id: 16, name: 'Sepijak Grapresso', price: 18000, category: 'Signature Coffee', description: 'Espresso dengan sentuhan grape yang unik', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop&crop=center', emoji: '🍇' },
                { id: 17, name: 'Sepijak Lycheepresso', price: 18000, category: 'Signature Coffee', description: 'Perpaduan espresso dengan lychee yang eksotis', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center', emoji: '🍈' },
                { id: 18, name: 'Sepijak Limepresso', price: 18000, category: 'Signature Coffee', description: 'Espresso dengan kesegaran lime', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop&crop=center', emoji: '🍋' },

                // Premium Coffee Milk
                { id: 19, name: 'Coconut Milky Coffela', price: 16000, category: 'Premium Coffee Milk', description: 'Kopi susu dengan kelapa yang creamy', image: 'https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=400&h=300&fit=crop&crop=center', emoji: '🥥' },
                { id: 20, name: 'Arenga Palmello Coffela', price: 17000, category: 'Premium Coffee Milk', description: 'Kopi susu dengan gula aren dan palm', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop&crop=center', emoji: '🌴' },
                { id: 21, name: 'Butterscotch Salt Coffela', price: 18000, category: 'Premium Coffee Milk', description: 'Kopi susu butterscotch dengan sentuhan garam', image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=400&h=300&fit=crop&crop=center', emoji: '🍯' },
                { id: 22, name: 'Pistachio Chocoffela', price: 18000, category: 'Premium Coffee Milk', description: 'Kopi susu pistachio dengan cokelat', image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400&h=300&fit=crop&crop=center', emoji: '🌰' },

                // Non Coffee Latte Series
                { id: 23, name: 'Thai Leaf Latte (Hot)', price: 16000, category: 'Non Coffee Latte', description: 'Latte teh Thailand hangat' },
                { id: 24, name: 'Thai Leaf Latte (Ice)', price: 17000, category: 'Non Coffee Latte', description: 'Latte teh Thailand dingin' },
                { id: 25, name: 'Green Thai Latte (Hot)', price: 16000, category: 'Non Coffee Latte', description: 'Latte teh hijau Thailand hangat' },
                { id: 26, name: 'Green Thai Latte (Ice)', price: 17000, category: 'Non Coffee Latte', description: 'Latte teh hijau Thailand dingin' },
                { id: 27, name: 'Choco Latte (Hot)', price: 16000, category: 'Non Coffee Latte', description: 'Latte cokelat hangat', image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=400&h=300&fit=crop&crop=center', emoji: '🍫' },
                { id: 28, name: 'Choco Latte (Ice)', price: 17000, category: 'Non Coffee Latte', description: 'Latte cokelat dingin', image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400&h=300&fit=crop&crop=center', emoji: '🍫' },
                { id: 29, name: 'Taro Latte (Hot)', price: 16000, category: 'Non Coffee Latte', description: 'Latte taro hangat', image: 'https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=400&h=300&fit=crop&crop=center', emoji: '🍠' },
                { id: 30, name: 'Taro Latte (Ice)', price: 17000, category: 'Non Coffee Latte', description: 'Latte taro dingin', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop&crop=center', emoji: '🍠' },
                { id: 31, name: 'Red Velvet Latte (Hot)', price: 17000, category: 'Non Coffee Latte', description: 'Latte red velvet hangat', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&crop=center', emoji: '❤️' },
                { id: 32, name: 'Red Velvet Latte (Ice)', price: 18000, category: 'Non Coffee Latte', description: 'Latte red velvet dingin', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop&crop=center', emoji: '❤️' },
                { id: 33, name: 'Matcha Latte (Hot)', price: 17000, category: 'Non Coffee Latte', description: 'Latte matcha hangat', image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&h=300&fit=crop&crop=center', emoji: '🍵' },
                { id: 34, name: 'Matcha Latte (Ice)', price: 18000, category: 'Non Coffee Latte', description: 'Latte matcha dingin', image: 'https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=400&h=300&fit=crop&crop=center', emoji: '🍵' },

                // Es Segar
                { id: 35, name: 'Es Kunir Sereh Jahe', price: 14000, category: 'Es Segar', description: 'Minuman segar kunyit, sereh, dan jahe', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop&crop=center', emoji: '🧊' },
                { id: 36, name: 'Es Aren Asem Jawa', price: 15000, category: 'Es Segar', description: 'Es segar gula aren dengan asam jawa', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop&crop=center', emoji: '🧊' },
                { id: 37, name: 'Es Lidah Buaya Khas Ponti', price: 15000, category: 'Es Segar', description: 'Es lidah buaya khas Pontianak', image: 'https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=400&h=300&fit=crop&crop=center', emoji: '🌿' },
                { id: 38, name: 'Es Teler Sepijak', price: 18000, category: 'Es Segar', description: 'Es teler khas Sepijak dengan berbagai buah segar', image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=300&fit=crop&crop=center', emoji: '🍹' },

                // Kopi Talua
                { id: 39, name: 'Kopi Talua', price: 17000, category: 'Kopi Talua', description: 'Kopi khas Minang dengan telur yang dikocok', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop&crop=center', emoji: '🥚' },

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
                { id: 62, name: 'Sandwich', price: 17000, category: 'Makanan Ringan', description: 'Sandwich segar dengan isian lengkap', image: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=400&h=300&fit=crop&crop=center', emoji: '🥪' },
                { id: 63, name: 'Tahu Cabe Garam', price: 18000, category: 'Makanan Ringan', description: 'Tahu goreng dengan bumbu cabe garam', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&crop=center', emoji: '🌶️' },
                { id: 64, name: 'Dimsum Goreng', price: 19000, category: 'Makanan Ringan', description: 'Dimsum goreng crispy', image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop&crop=center', emoji: '🥟' },
                { id: 65, name: 'Tahu Cireng', price: 17000, category: 'Makanan Ringan', description: 'Tahu isi cireng yang gurih', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&crop=center', emoji: '🍲' },
                { id: 66, name: 'Lumpia Sanur', price: 17000, category: 'Makanan Ringan', description: 'Lumpia khas Sanur dengan isian segar', image: 'https://images.unsplash.com/photo-1563379091339-03246963d96a?w=400&h=300&fit=crop&crop=center', emoji: '🌯' },
                { id: 67, name: 'Perkedel Sepijak', price: 19000, category: 'Makanan Ringan', description: 'Perkedel khas Sepijak', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&crop=center', emoji: '🥔' },
                { id: 68, name: 'Mendoan', price: 19000, category: 'Makanan Ringan', description: 'Tempe mendoan khas Purwokerto', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&crop=center', emoji: '🍲' },
                { id: 69, name: 'Fried Fries', price: 19000, category: 'Makanan Ringan', description: 'Kentang goreng crispy', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop&crop=center', emoji: '🍟' },

                // Makanan Utama
                { id: 70, name: 'Nasi Goreng Sepijak', price: 25000, category: 'Makanan Utama', description: 'Nasi goreng putih dengan bumbu racikan spesial, gurih asin, makin spesial kita menggunakan beras basmati', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop&crop=center', emoji: '🍚' },
                { id: 71, name: 'Nasi Goreng Klasik', price: 19000, category: 'Makanan Utama', description: 'Nasi goreng basic rasanya seperti nasi goreng bumbu rumahan yang selalu bikin rindu', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop&crop=center', emoji: '🍚' },
                { id: 72, name: 'Spaghetti Rebus Jowo', price: 22000, category: 'Makanan Utama', description: 'Salah satu menu signature kami, basic mie godog jowo yang dipadukan dengan spaghetti hingga tercipta rasa yang unik dan menarik', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop&crop=center', emoji: '🍝' },
                { id: 73, name: 'Telor 3D Sepijak', price: 14000, category: 'Makanan Utama', description: 'Salah satu menu khas sepijak, nasi hangat yang dibalut dengan telur dadar goreng yang dioles dengan bumbu khusu supaya makin nikmat', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop&crop=center', emoji: '🍳' },
                { id: 74, name: 'Ayam Bakar', price: 25000, category: 'Makanan Utama', description: 'Ayam bakar khas Sepijak yang dibakar dengan bumbu khas dapur kami, disajikan dengan kalian goreng dan sambel bawang', image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop&crop=center', emoji: '🍗' },
                { id: 75, name: 'Ayam Pop', price: 25000, category: 'Makanan Utama', description: 'Hidangan khas Minangkabau yang terkenal dengan dagingnya yang lembut, gurih, dan juicy. Ayam dimasak dengan bumbu rempah khas, hingga matang sempurna namun tetap berwarna putih. Disajikan dengan nasi, sambel lado tomat segar dan nasi hangat', image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop&crop=center', emoji: '🍗' },
                { id: 76, name: 'Bebek Hitam', price: 38000, category: 'Makanan Utama', description: 'Kuliner khas madura yang banyak diminati, gurih tempah bebek dengan bumbu hitam yang pekat dan sambel bawang sebagai pelengkap menjadi sajian yang menarik untuk dicoba', image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop&crop=center', emoji: '🦆' },
                { id: 77, name: 'Selat Solo Signature', price: 41000, category: 'Makanan Utama', description: 'Merupakan hidangan khas kota Solo perpaduan antara masakan Eropa dan Jawa. Hidangan ini berupa bistik daging sapi atau galantine yang disajikan dengan kuah encer yang manis, sayuran rebus dan kentang dan mayonese Jawa', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&crop=center', emoji: '🍽️' },
                { id: 78, name: 'Galantine', price: 35000, category: 'Makanan Utama', description: 'Hidangan khas solo olahan daging lembut berkuah gurih, disajikan dengan kentang, sayuran, dan saus, menghadirkan perpaduan rasa Jawa dan sentuhan Eropa yang memikat', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&crop=center', emoji: '🍲' },
                { id: 79, name: 'Sup Matahari', price: 25000, category: 'Makanan Utama', description: 'Sup tradisional khas kota Solo berisi cincangan ayam, sayuran, yang dibentuk menyerupai matahari dengan disiram kuah kaldu ayam yang light', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop&crop=center', emoji: '🍲' }
            ]
        }
    },
    computed: {
        filteredMenuItems() {
            if (this.selectedCategory === 'Semua') {
                return this.menuItems
            }
            return this.menuItems.filter(item => item.category === this.selectedCategory)
        }
    },
    mounted() {
        document.title = 'Menu Lengkap - Kedai Sepijak'
    }
}
</script>
