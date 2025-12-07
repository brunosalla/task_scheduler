import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useErrorStore = defineStore('error', () => {
    const hasError = ref(false)
    const errorMessage = ref('')
    const errorDetails = ref('')

    function showError(message, details = '') {
        hasError.value = true
        errorMessage.value = message
        errorDetails.value = details
    }

    function clearError() {
        hasError.value = false
        errorMessage.value = ''
        errorDetails.value = ''
    }

    return {
        hasError,
        errorMessage,
        errorDetails,
        showError,
        clearError
    }
})
