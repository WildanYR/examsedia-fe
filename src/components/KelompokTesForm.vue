<script setup>
import FormInput from './FormInput.vue'
import PsiEditor from './PsiEditor.vue'

const props = defineProps({
  nama: {
    type: String,
    default: ''
  },
  waktu: {
    type: String,
    default: ''
  },
  sortIndex: {
    type: String,
    default: '0'
  },
  petunjuk: {
    type: String,
    default: ''
  },
  errorNama: {
    type: Array
  },
  errorWaktu: {
    type: Array
  },
  errorPetunjuk: {
    type: Array
  }
})
const emit = defineEmits([
  'update:nama',
  'update:waktu',
  'update:petunjuk',
  'update:sortIndex'
])

const onUpdateTime = (value) => {
  emit('update:waktu', value)
}
</script>

<template>
  <div class="space-y-6">
    <form-input label="Nama" :model-value="props.nama" :error-message="props.errorNama"
      @update:model-value="(e) => emit('update:nama', e)" />
    <form-input label="Waktu (detik)" type="number" :model-value="props.waktu" :error-message="props.errorWaktu"
      @update:model-value="onUpdateTime" />
    <form-input label="Urutan" type="number" :model-value="props.sortIndex"
      @update:model-value="(e) => emit('update:sortIndex', e)" />
    <psi-editor label="Petunjuk" :model-value="props.petunjuk" :error-message="props.errorPetunjuk"
      @update:model-value="(e) => emit('update:petunjuk', e)" />
  </div>
</template>
