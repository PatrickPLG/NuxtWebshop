<script setup>
import { ref } from 'vue';
import Dialog from 'primevue/dialog';
import { useAuthStore } from '~/stores/auth';
const visible = ref(false);
const username = ref('');
const password = ref('');
const authStore = useAuthStore();
function handleLogin() {
    if (authStore.errorMessage == null) {
        authStore.login(username.value, password.value);
        authStore.errorMessage = null;
        visible.value = false;
    }
}
function handleRegister() {
    authStore.register(username.value, password.value);
    authStore.errorMessage = null;
    visible.value = false;
}

// If the modal is not visible set errormessage to null everytime it closes
onMounted(() => {
    if (!visible.value) {
        authStore.errorMessage = null;
    }
})

defineExpose({ visible });
</script>

<template>
    <Dialog v-model:visible="visible" pt:root:class="!border-0 !bg-transparent" pt:mask:class="backdrop-blur-sm">
        <template #container="{ closeCallback }">
            <div class="flex flex-col px-8 py-8 gap-6 rounded-2xl" style="background: rgb(255 255 255);">
                <div v-if="authStore.errorMessage">
                    <Message severity="error">{{ authStore.errorMessage }}</Message>
                </div>
                <div class="inline-flex flex-col gap-2">
                    <label for="username" class="text-black font-semibold">Username</label>
                    <InputText id="username" v-model="username" class="!bg-white !border-1 !p-4 !text-primary-50 w-80">
                    </InputText>
                </div>
                <div class="inline-flex flex-col gap-2">
                    <label for="password" class="text-black font-semibold">Password</label>
                    <InputText id="password" v-model="password" class="!bg-white !border-1  !p-4 !text-primary-50 w-80"
                        type="password">
                    </InputText>
                </div>
                <div class="flex items-center gap-4">
                    <Button label="Register" @click="handleRegister" text
                        class="!bg-green-500 !text-white !p-4 w-full !border hover:!bg-green-800 hover:!text-white"></Button>
                    <Button label="Sign-In" @click="handleLogin" text
                        class="!bg-green-500 !text-white !p-4 w-full !border hover:!bg-green-800 hover:!text-white"></Button>
                </div>
                <div class="flex items-center gap-4">
                    <Button label="Cancel" @click="closeCallback" text
                        class="!bg-green-900 !text-white !p-4 w-full !border hover:!bg-green-500 hover:!text-white"></Button>
                </div>
            </div>
        </template>
    </Dialog>
</template>