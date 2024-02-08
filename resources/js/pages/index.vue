<script setup>

import {useI18n} from "vue-i18n";
import LandingLayout from "@/layouts/LandingLayout.vue";
import VButton from "@/components/base/buttons/V-Button.vue";
import {onMounted} from "vue";
import useApi from "@/composable/useApi";

const { t } = useI18n()
const api = useApi()

onMounted(()=>{
    api.get('management/data')
})
</script>

<template>
    <LandingLayout>
        <VButton color="primary">as</VButton>
        <div>{{t('m_money_organization')}}</div>
    </LandingLayout>
</template>

<style scoped>

</style>
