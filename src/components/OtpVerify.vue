<script lang="ts" setup>
import { onMounted, ref, defineEmits } from 'vue';
import axios from 'axios';


const inputRefs = ref<Array<HTMLInputElement | null>>([]);
onMounted(() => {
  inputRefs.value[0]?.focus();
});

const emit = defineEmits(['show-profile']);

const isProcessing = ref<boolean>(false);

const handleInput = (index: number) => { 

  const inputValue = inputRefs.value[index]?.value;
    if (inputValue && !/\d/.test(inputValue)) {
        inputRefs.value[index]!.value = ''
    } else if (index < inputRefs.value.length-1) {
        inputRefs.value[index]!.value = inputRefs.value[index]!.value.substring(0, 1);
        inputRefs.value[index + 1]?.focus();
    }

    const inputCode = inputRefs.value.map((input) => (input ? input.value : ""))
        .filter((value) => /^\d$/.test(value))
        .join("");
  if (inputCode.length === 4) { 
      verify(inputCode)
  }
}
const verify = (code: string) => { 
  isProcessing.value = true
  
  axios.post('api/verify', { code: code })
      .then((response) => { 
        if (response.data.valid) {
          console.log(response.data.token);
          localStorage.setItem('token', response.data.token);
          emit('show-profile',true); 
        } else { 
          alert('Error Code !!!!!!!!!!!!!!!!!!!!')
        }
        isProcessing.value = false
      })
}
const goBack = (index: number, event: KeyboardEvent) => {
    const isBackspace = event.key === 'Backspace';
    if (isBackspace) {
      event.preventDefault(); 
      if (index > 0) {
          inputRefs.value[index]!.value = '';
          inputRefs.value[index-1]!.value = '';
          inputRefs.value[index - 1]?.focus();
        }
    }
  }

const handlePaste = (event: ClipboardEvent) => { 
  event.preventDefault();
  const pastedData = event.clipboardData?.getData('text/plain') || '';
  const digits = pastedData.slice(0, 4).split('');
    digits.forEach((digit, index) => {
        if (/^\d$/.test(digit)) {
            inputRefs.value[index]?.focus();
            inputRefs.value[index]!.value = digit;
          if (index === inputRefs.value.length - 1) {
              console.log(inputRefs.value);
              const inputCode = inputRefs.value.map((input) => (input ? input.value : "")).join("");
              verify(inputCode)
            }
        }
    });
}

</script>

<template>
    <form>
      <div class="otp-container">
        <h3 class="otp-title" v-if="!isProcessing">Enter verification</h3>
        <h3 class="otp-title" v-else>Processing~~~~</h3>
        <div class="input-group" @paste="handlePaste" >
          <input  
            class="input" 
            maxlength="1" 
            type="tel"
            @input="handleInput(0)"
            @keydown="goBack(0, $event)"
            :ref="el => inputRefs[0] = el as HTMLInputElement" >
          <input 
            class="input"
            maxlength="1" 
            type="tel"
            @input="handleInput(1)"
            @keydown="goBack(1, $event)"
            :ref="el => inputRefs[1] = el as HTMLInputElement" >
          <input 
            class="input"
            maxlength="1" 
            type="tel"
            @input="handleInput(2)"
            @keydown="goBack(2, $event)"
            :ref="el => inputRefs[2] = el as HTMLInputElement" >
          <input 
            class="input"
            maxlength="1" 
            type="tel"
            @input="handleInput(3)"
            @keydown="goBack(3, $event)"
            :ref="el => inputRefs[3] = el as HTMLInputElement" >
        </div>
      </div>
    </form>
</template>
<style scoped>
.otp-container {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
}
.otp-title {
  font-size: 2rem;
}

.input-group {
  display: flex;
  gap: 1rem;
}

.input-group > .input {
  width: 8rem;
  height: 12rem;
  text-align: center;
  font-size: 2rem;
}

</style>
