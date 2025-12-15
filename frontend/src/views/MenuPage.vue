<template>
    <div class="min-h-screen bg-gradient-to-br from-background-beige via-secondary-sage/5 to-background-beige">
        <div class="relative bg-gradient-to-r from-primary-green via-primary-green/95 to-primary-green overflow-hidden">
            <div class="absolute inset-0 opacity-10">
                <div class="absolute inset-0" style="background-image: radial-gradient(circle at 25px 25px, rgba(255,255,255,0.1) 2px, transparent 2px); background-size: 50px 50px;"></div>
            </div>
            
            <div class="relative container mx-auto px-6 py-16 text-center">
                <div class="max-w-4xl mx-auto">
                    <h1 class="font-display text-4xl md:text-6xl font-bold text-background-beige mb-4 leading-tight">
                        Daftar Menu
                        <span class="block text-accent-amber text-3xl md:text-5xl mt-2">Kedai Sepijak</span>
                    </h1>
                    <div class="mt-6 flex justify-center">
                        <div class="bg-background-beige/10 backdrop-blur-sm rounded-full px-6 py-2 border border-background-beige/20">
                            <span class="text-background-beige font-medium text-sm">{{ menuItems.length }} Menu Tersedia</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="sticky top-0 z-20 bg-background-beige/95 backdrop-blur-md border-b border-primary-green/10 shadow-sm">
            <div class="container mx-auto px-6 py-4">
                <div class="flex flex-wrap justify-center gap-2 max-w-5xl mx-auto">
                    <button
                        v-for="category in categories"
                        :key="category"
                        @click="selectedCategory = category"
                        :class="[
                            'rounded-full px-4 py-2 text-xs md:text-sm font-bold transition-all duration-300',
                            selectedCategory === category
                                ? 'bg-primary-green text-background-beige shadow-md scale-105'
                                : 'bg-white text-primary-green hover:bg-primary-green/5 border border-primary-green/20'
                        ]"
                    >
                        {{ category }}
                    </button>
                </div>
            </div>
        </div>

        <div class="container mx-auto px-6 py-12">
            <div class="text-center mb-10" v-if="selectedCategory !== 'Semua'">
                <h2 class="text-2xl md:text-3xl font-bold text-primary-green mb-2">{{ selectedCategory }}</h2>
                <div class="w-16 h-1 bg-accent-amber mx-auto rounded-full"></div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                    v-for="(item, index) in filteredMenuItems"
                    :key="item.id"
                    class="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-primary-green/10 flex flex-col h-full"
                >
                    <div class="p-6 flex flex-col h-full">
                        <div class="mb-3">
                            <div class="flex justify-between items-start mb-2">
                                <span class="inline-block px-2 py-1 text-[10px] font-bold tracking-wider text-primary-green uppercase bg-primary-green/5 rounded-md">
                                    {{ item.category }}
                                </span>
                            </div>
                            <h3 class="font-bold text-lg text-primary-green group-hover:text-accent-amber transition-colors leading-tight">
                                {{ item.name }}
                            </h3>
                        </div>
                        
                        <p v-if="item.description" class="text-sm text-gray-500 mb-6 flex-grow leading-relaxed">
                            {{ item.description }}
                        </p>
                        
                        <div class="flex justify-between items-center pt-4 mt-auto border-t border-dashed border-gray-200">
                            <div>
                                <span class="text-lg font-bold text-primary-green">
                                    Rp {{ item.price.toLocaleString('id-ID') }}
                                </span>
                            </div>
                            <!-- <button class="bg-primary-green hover:bg-primary-green/90 text-background-beige px-5 py-2 rounded-lg font-medium text-sm transition-all duration-300 shadow-sm hover:shadow-md">
                                Pesan
                            </button> -->
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="filteredMenuItems.length === 0" class="text-center py-20 bg-white/50 rounded-2xl border border-dashed border-gray-300 mt-8">
                <h3 class="text-xl font-bold text-primary-green mb-2">Menu tidak ditemukan</h3>
                <p class="text-gray-500">Silakan pilih kategori lain.</p>
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
                'Semua', 'Manual Brew', 'Espresso', 'Signature Coffee', 
                'Premium Coffee Milk', 'Non Coffee Latte', 'Es Segar', 
                'Kopi Talua', 'Artisan Tea', 'Sparkling', 
                'Makanan Ringan', 'Makanan Utama'
            ],
            // Data Image dan Emoji sudah dihapus sesuai permintaan
            menuItems: [
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