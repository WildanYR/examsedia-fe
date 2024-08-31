<script setup>
import { TrashIcon, CheckCircleIcon } from '@heroicons/vue/solid'

const props = defineProps({
  active: {
    type: Boolean,
    default: true
  },
  label: {
    type: String,
    required: true
  },
  loadingSelect: {
    type: Boolean,
    default: false
  },
  loadingDelete: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['onSelected', 'onDelete'])
</script>

<template>
  <div class="flex rounded-lg border border-slate-300 w-full">
    <button @click="emit('onSelected')" class="flex justify-start items-center gap-2 px-3 py-2 flex-1 rounded-l-lg hover:bg-emerald-100">
      <check-circle-icon class="h-6 w-6 text-emerald-500" :class="props.active?'block':'hidden'"/>
      <p>{{ props.label }}</p>
    </button>
    <button @click="emit('onDelete')" class="px-2 py-1 hover:bg-pink-200 text-pink-500 rounded-r-lg bg-pink-100">
      <trash-icon class="h-5 w-5" />
    </button>
  </div>
  <!-- <div
    class="relative flex h-full w-full flex-col items-center justify-between rounded-xl p-6"
    :class="[props.active ? 'bg-blue-50' : 'bg-gray-50']"
  >
    <cube-icon
      class="h-36 w-36"
      :class="[props.active ? 'text-blue-500' : 'text-gray-500']"
    />
    <p class="mb-5 text-lg font-bold">{{ props.label }}</p>
    <div class="w-full">
      <psi-button
        class="w-full"
        :variant="props.active ? 'primary' : 'black'"
        :loading="props.loadingSelect"
        :disabled="props.loadingDelete || props.active"
        @click="emit('onSelected')"
        >Pilih</psi-button
      >
      <psi-button
        class="mt-2 w-full"
        variant="red"
        :loading="props.loadingDelete"
        :disabled="props.active || props.loadingSelect"
        @click="emit('onDelete')"
        >Hapus</psi-button
      >
    </div>
    <div
      class="absolute top-0 right-0 rounded-tr-xl rounded-bl-xl py-2 px-6 text-white"
      :class="[props.active ? 'bg-blue-600' : 'bg-gray-600']"
    >
      Sesi
    </div>
  </div> -->
</template>
