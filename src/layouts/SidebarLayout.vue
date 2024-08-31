<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { MenuIcon, UserIcon, LogoutIcon } from '@heroicons/vue/outline'
import { UserIcon as UserIconSolid } from '@heroicons/vue/solid'
import PsiModal from '../components/PsiModal.vue'
import PsiButton from '../components/PsiButton.vue'
import { useAuthStore } from '../stores/auth'
import { logout } from '../services/authService'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const showSidebar = ref(false)
const showNavbarModal = ref(false)
const loadingLogout = ref(false)

const navs = computed(() => {
  return route.meta.navs
    .filter((item) => !item.hidden)
    .map((item) => ({
      ...item,
      active: item.name === route.matched[1].name
    }))
})
const activeNav = computed(() =>
  route.meta.navs.find((item) => item.name === route.matched[1].name)
)

const closeSidebar = () => {
  showSidebar.value = false
}

const handleLogout = () => {
  loadingLogout.value = true
  logout()
    .then(() => {
      localStorage.removeItem('token')
      authStore.resetState()
      router.push({ name: 'login' })
    })
    .finally(() => {
      loadingLogout.value = false
    })
}
onMounted(() => {
  if (window.screen.width >= 768) {
    showSidebar.value = true
  }
})
</script>

<template>
  <div class="flex min-h-screen text-gray-900 antialiased">
    <!-- Sidebar -->
    <Transition enter-active-class="transition-opacity" enter-from-class="opacity-0" enter-to-class="opacity-100"
      leave-active-class="transition-opacity" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-show="showSidebar" aria-hidden="true" class="fixed inset-0 z-10 bg-black bg-opacity-50 md:hidden"
        @click="closeSidebar"></div>
    </Transition>
    <aside :class="[
      'fixed inset-y-0 z-10 h-screen flex-shrink-0 transform transition-transform',
      showSidebar ? 'translate-x-0' : '-translate-x-full'
    ]">
      <div class="flex h-full w-64 flex-col bg-slate-100">
        <div class="flex-shrink-0 px-4 py-2">
          <img loading="lazy" src="../assets/logo.png" alt="logo examsedia" class="pointer-events-none mx-auto w-44" />
        </div>

        <nav aria-label="Main" class="mt-5 flex flex-1 flex-col gap-y-2 overflow-y-hidden p-2 hover:overflow-y-auto">
          <router-link v-for="(nav, i) in navs" :key="i" :to="{ name: nav.name }" :class="[
            'flex items-center gap-3 rounded-lg  p-3 text-sm font-medium ',
            nav.active && 'bg-primary text-white'
          ]">
            <component :is="nav.icon" class="h-5 w-5" />
            <p>{{ nav.label }}</p>
          </router-link>
        </nav>

        <div class="flex-shrink-0 p-4 md:hidden">
          <button
            class="w-full rounded-lg bg-blue-100 py-2 text-blue-700 focus:outline-none focus:ring focus:ring-blue-300 active:bg-blue-600 active:text-white"
            @click="closeSidebar">
            <ChevronDoubleLeftIcon class="mx-auto h-5 w-5" />
          </button>
        </div>
        <p class="my-2 text-center text-sm text-gray-500">v{{ appVersion }}</p>
      </div>
    </aside>
    <!-- Content -->
    <div :class="['flex flex-1 flex-col gap-6 p-4', showSidebar && 'md:ml-64']">
      <div class="flex w-full items-center justify-between rounded-xl bg-white py-2 px-3">
        <div class="flex items-center gap-3">
          <button
            class="rounded-md bg-blue-50 p-2 text-blue-700 hover:bg-blue-100 focus:outline-none focus:ring focus:ring-blue-300 active:bg-blue-600 active:text-white"
            @click="showSidebar = !showSidebar">
            <menu-icon class="h-4 w-4" />
          </button>
          <p class="hidden text-lg font-medium text-gray-600 md:block">
            {{ activeNav.label }}
          </p>
        </div>
        <img loading="lazy" src="../assets/logo.png" alt="logo ppt metamorfosa"
          class="pointer-events-none h-6 md:hidden" />
        <button
          class="rounded-md bg-blue-50 p-2 text-blue-700 focus:outline-none focus:ring focus:ring-blue-300 active:bg-blue-600 active:text-white md:hidden"
          @click="showNavbarModal = true">
          <user-icon class="h-4 w-4" />
        </button>
        <div class="hidden items-center justify-between gap-3 md:flex">
          <div class="flex items-center justify-center gap-2">
            <div class="rounded-full bg-pink-100 p-2 text-pink-700">
              <user-icon-solid class="h-4 w-4" />
            </div>
            <p class="text-sm font-medium">{{ authStore.userData.email }}</p>
          </div>
          <psi-button variant="red-light" size="sm" :loading="loadingLogout" @click="handleLogout">
            <logout-icon class="inline h-4 w-4" />
          </psi-button>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
  <psi-modal :show-modal="showNavbarModal" title="Opsi User" :hide-title="true" @close-modal="showNavbarModal = false">
    <div class="flex flex-col items-center gap-2">
      <p class="text-sm text-gray-400">Akun</p>
      <div class="rounded-full bg-pink-100 p-4 text-pink-700">
        <user-icon-solid class="h-7 w-7" />
      </div>
      <p class="font-medium">{{ authStore.userData.email }}</p>
      <psi-button variant="red-outline" :loading="loadingLogout" @click="emit('onLogout')">
        keluar
        <logout-icon class="inline h-5 w-5" />
      </psi-button>
    </div>
  </psi-modal>
</template>
