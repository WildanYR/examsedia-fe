<script setup>
import FormInput from '../components/FormInput.vue'
import PsiButton from '../components/PsiButton.vue'
import FormRadio from '../components/FormRadio.vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '../services/authService'
import { useAuthStore } from '../stores/auth'
import FromValidator from '../helpers/formValidation'

const jenis_kelamin = [
  {
    text: 'Laki-laki',
    value: 'laki-laki'
  },
  {
    text: 'Perempuan',
    value: 'perempuan'
  }
]

const router = useRouter()
const authStore = useAuthStore()
const loadingRegister = ref(false)
const formData = reactive({
  email: '',
  password: '',
  nama_lengkap: '',
  jenis_kelamin: '',
})
const formDataValidate = reactive({
  email: [],
  password: [],
  nama_lengkap: [],
  jenis_kelamin: [],
})
const handleRegister = () => {
  formDataValidate.email = new FromValidator(formData.email)
    .isRequired()
    .isEmail()
  formDataValidate.password = new FromValidator(formData.password)
    .isRequired()
    .min(8)
  formDataValidate.nama_lengkap = new FromValidator(
    formData.nama_lengkap
  ).isRequired()
  formDataValidate.jenis_kelamin = new FromValidator(
    formData.jenis_kelamin
  ).isRequired()
  if (
    formDataValidate.email.invalid ||
    formDataValidate.password.invalid ||
    formDataValidate.nama_lengkap.invalid ||
    formDataValidate.jenis_kelamin.invalid
  ) {
    return
  }
  loadingRegister.value = true
  console.log(formData)
  register(
    formData.email,
    formData.password,
    formData.nama_lengkap,
    formData.jenis_kelamin,
  )
    .then((data) => {
      authStore.userData.id = data.peserta.id
      authStore.userData.email = data.peserta.email
      authStore.userData.role = data.peserta.role
      router.push({ name: 'dashboard_peserta' })
    })
    .finally(() => {
      loadingRegister.value = false
    })
}
</script>

<template>
  <h1 class="mb-6 text-center text-4xl font-medium">Daftar Akun</h1>
  <div>
    <h2 class="mb-3 text-lg font-medium text-gray-500">Akun</h2>
    <div class="space-y-4">
      <form-input v-model="formData.email" :error-message="formDataValidate.email.errorMessage"
        label="Email"></form-input>
      <form-input v-model="formData.password" :error-message="formDataValidate.password.errorMessage" type="password"
        label="Kata Sandi"></form-input>
    </div>
    <h2 class="mt-6 mb-3 text-lg font-medium text-gray-500">Data Diri</h2>
    <div class="space-y-4">
      <form-input v-model="formData.nama_lengkap" :error-message="formDataValidate.nama_lengkap.errorMessage"
        label="Nama Lengkap"></form-input>
      <form-radio v-model="formData.jenis_kelamin" :error-message="formDataValidate.jenis_kelamin.errorMessage"
        label="Jenis Kelamin" :radio-options="jenis_kelamin" />
    </div>
    <div class="mt-6 space-y-4">
      <psi-button class="w-full" :loading="loadingRegister" @click="handleRegister">Daftar</psi-button>
      <div class="text-center">
        <router-link :to="{ name: 'login' }" class="text-blue-800 hover:text-blue-700">
          Sudah punya akun?
        </router-link>
      </div>
    </div>
  </div>
</template>
