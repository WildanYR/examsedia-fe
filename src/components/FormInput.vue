<script setup>
import { computed, ref } from 'vue'
import FormErrorMessage from './FormErrorMessage.vue'
import { EyeIcon, EyeOffIcon } from '@heroicons/vue/outline'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  modelValue: {
    type: String,
    default: ''
  },
  errorMessage: {
    type: Array
  },
  required: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])
const showPassword = ref(false)
const inputType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password'
  }
  return props.type
})

const mutateValue = (e) => {
  emit('update:modelValue', e.target.value)
}

const invalid = computed(() => {
  if (props.errorMessage?.length) {
    return true
  }
  return false
})
</script>

<template>
  <div>
    <div>
      <label for="name" class="block mb-1 text-sm font-medium text-gray-900">{{ label }}</label>
      <div class="relative">
        <input :type="inputType" :value="props.modelValue" :required="props.required"
          :placeholder="'Masukkan ' + label + '...'" @input="mutateValue"
          class="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:border-blue-600 focus:outline-none block w-full p-2.5"
          :class="invalid ? 'border-red-300' : 'border-gray-300'">
        <button v-if="props.type === 'password'"
          class="absolute right-2 top-2 block text-gray-400 transition-colors hover:text-blue-500"
          @click.prevent="showPassword = !showPassword">
          <component :is="showPassword ? EyeOffIcon : EyeIcon" class="h-6 w-6" />
        </button>
      </div>
    </div>
    <div v-if="invalid" class="ml-1 mt-1 space-y-1">
      <form-error-message :label="props.label" :messages="props.errorMessage" />
    </div>
  </div>
</template>
