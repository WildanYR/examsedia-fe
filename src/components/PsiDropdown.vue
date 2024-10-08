<script setup>
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption
} from '@headlessui/vue'
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'
import { computed } from 'vue'
const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  modelValue: {
    type: String
  },
  label: {
    type: String
  },
  hideLabel: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelValue'])

const selectedText = computed(() => {
  if (!props.modelValue) {
    return `Pilih ${props.label}`
  }
  return props.items.find((item) => item.value === props.modelValue).text
})

const updateValue = (val) => {
  emit('update:modelValue', val)
}
</script>
<template>
  <div>
    <p class="ml-1 text-sm text-gray-500" :class="props.hideLabel ? 'hidden' : 'block'">{{ props.label }}</p>
    <Listbox :model-value="props.modelValue" @update:model-value="updateValue">
      <div class="relative mt-1">
        <ListboxButton
          class="relative w-full cursor-default rounded-lg bg-gray-50 py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm border text-gray-900 focus:border-blue-600 border-gray-300">
          <span class="block truncate">{{ selectedText }}</span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </ListboxButton>

        <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
          leave-to-class="opacity-0">
          <ListboxOptions
            class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <ListboxOption v-for="item in props.items" v-slot="{ active, selected }" :key="item.text"
              :value="item.value" as="template">
              <li :class="[
                active ? 'bg-blue-100 text-blue-900' : 'text-gray-900',
                'relative cursor-default select-none py-2 pl-10 pr-4'
              ]">
                <span :class="[
                  selected ? 'font-medium' : 'font-normal',
                  'block truncate'
                ]">{{ item.text }}</span>
                <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>
