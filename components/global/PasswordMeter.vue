<template>
    <Password v-model="input" :strength-meter-only="true" class="mt-n5"/>
</template>

<script>
import Password from 'vue-password-strength-meter'

export default {
    name: 'PasswordMeter',
    components:{
        Password
    },
    props: ['input']
}
</script>