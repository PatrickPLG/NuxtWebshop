<script lang="ts">
const user = ref({ name: '', email: '', phone: '', address: '' });
</script>

<template>
    <div class="p-fluid space-y-4">
        <div class="field">
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <IconField>
                <InputIcon class="pi pi-user" />
                <InputText id="name" v-model="user.name" class="pl-10 w-full" />
            </IconField>
            <small v-if="!user.name" class="p-error">Name is required.</small>
        </div>
        <div class="field">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <IconField>
                <InputIcon class="pi pi-envelope" />
                <InputText id="email" v-model="user.email" class="pl-10 w-full" />
            </IconField>
            <small v-if="!user.email" class="p-error">Email is required.</small>
        </div>
        <div class="field">
            <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
            <IconField>
                <InputIcon class="pi pi-phone" />
                <InputMask id="phone" v-model="user.phone" mask="(999) 999-9999" class="pl-10 w-full" />
            </IconField>
            <small v-if="!user.phone" class="p-error">Phone is required.</small>
        </div>
        <div class="field">
            <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
            <IconField>
                <InputIcon class="pi pi-home" />
                <InputText id="address" v-model="user.address" class="pl-10 w-full" />
            </IconField>
            <small v-if="!user.address" class="p-error">Address is required.</small>
        </div>
    </div>
</template>