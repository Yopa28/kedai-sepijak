<template>
    <div
        class="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-100 px-4 py-8"
    >
        <div class="max-w-md w-full">
            <!-- Login Card -->
            <div
                class="bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in"
            >
                <!-- Header -->
                <div
                    class="bg-gradient-to-r from-[#1E4D3B] to-[#1E4D3B] px-8 py-10 text-center"
                >
                    <div
                        class="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-slow"
                    >
                        <svg
                            class="w-12 h-12 text-[#1E4D3B]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                    </div>
                    <h2 class="text-3xl font-bold text-white mb-2">
                        Kedai Sepijak
                    </h2>
                    <p class="text-green-100">Admin Dashboard</p>
                </div>

                <!-- Body -->
                <div class="px-8 py-8">
                    <!-- Alert -->
                    <div
                        v-if="error"
                        class="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 animate-shake"
                    >
                        <svg
                            class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        <div class="flex-1">
                            <p class="text-sm text-red-800 font-medium">
                                {{ error }}
                            </p>
                        </div>
                        <button
                            @click="clearError"
                            class="text-red-400 hover:text-red-600"
                        >
                            <svg
                                class="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>

                    <!-- Login Form -->
                    <form @submit.prevent="handleLogin" class="space-y-6">
                        <!-- Username -->
                        <div>
                            <label
                                for="username"
                                class="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Username
                            </label>
                            <input
                                v-model="credentials.username"
                                id="username"
                                type="text"
                                required
                                autocomplete="username"
                                class="block w-full pl-3 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E4D3B] focus:border-transparent transition-all"
                                placeholder="Masukkan username"
                                :disabled="loading"
                            />
                        </div>

                        <!-- Password -->
                        <div>
                            <label
                                for="password"
                                class="block text-sm font-semibold text-gray-700 mb-2"
                                >Password</label
                            >
                            <input
                                v-model="credentials.password"
                                id="password"
                                :type="showPassword ? 'text' : 'password'"
                                required
                                autocomplete="current-password"
                                class="block w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E4D3B] focus:border-transparent transition-all"
                                placeholder="Masukkan password"
                                :disabled="loading"
                            />
                        </div>

                        <!-- Remember Me -->
                        <div class="flex items-center">
                            <input
                                v-model="rememberMe"
                                id="remember-me"
                                type="checkbox"
                                class="h-4 w-4 text-[#1E4D3B] focus:ring-[#1E4D3B] border-gray-300 rounded"
                                :disabled="loading"
                            />
                            <label
                                for="remember-me"
                                class="ml-2 block text-sm text-gray-700"
                            >
                                Ingat saya
                            </label>
                        </div>

                        <!-- Submit Button -->
                        <button
                            type="submit"
                            :disabled="loading"
                            class="w-full bg-[#1E4D3B] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#173c2e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E4D3B] transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            <span v-if="!loading">Login</span>
                            <span v-else>Memproses...</span>
                        </button>
                    </form>

                    <!-- Info -->
                    <div
                        class="mt-6 bg-green-50 border border-green-200 rounded-lg p-4"
                    >
                        <div class="flex items-start gap-3">
                            <svg
                                class="w-5 h-5 text-[#1E4D3B] flex-shrink-0 mt-0.5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <div class="text-sm text-[#1E4D3B]">
                                <p class="font-medium mb-1">
                                    Default Credentials:
                                </p>
                                <p><strong>Username:</strong> admin</p>
                                <p><strong>Password:</strong> admin123</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="bg-gray-50 px-8 py-4 text-center border-t">
                    <p class="text-sm text-gray-600">
                        <svg
                            class="w-4 h-4 inline"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        &copy; 2025 Kedai Sepijak. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

// State
const credentials = ref({
    username: "",
    password: "",
});
const rememberMe = ref(false);
const showPassword = ref(false);
const loading = ref(false);
const error = ref(null);

// Methods
async function handleLogin() {
    if (!credentials.value.username || !credentials.value.password) {
        error.value = "Username dan password harus diisi";
        return;
    }

    loading.value = true;
    error.value = null;

    try {
        const result = await authStore.login(
            credentials.value.username,
            credentials.value.password,
        );

        if (result.success) {
            // Login berhasil, redirect ke dashboard
            router.push("/admin/dashboard");
        } else {
            error.value =
                result.message ||
                "Login gagal. Periksa username dan password Anda.";
        }
    } catch (err) {
        error.value = err.message || "Terjadi kesalahan saat login";
        console.error("Login error:", err);
    } finally {
        loading.value = false;
    }
}

function clearError() {
    error.value = null;
}
</script>

<style scoped>
@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes bounce-slow {
    0%,
    100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
}

@keyframes shake {
    0%,
    100% {
        transform: translateX(0);
    }
    10%,
    30%,
    50%,
    70%,
    90% {
        transform: translateX(-5px);
    }
    20%,
    40%,
    60%,
    80% {
        transform: translateX(5px);
    }
}

.animate-fade-in {
    animation: fade-in 0.5s ease-out;
}

.animate-bounce-slow {
    animation: bounce-slow 2s ease-in-out infinite;
}

.animate-shake {
    animation: shake 0.5s ease-in-out;
}
</style>
