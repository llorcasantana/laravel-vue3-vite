<script setup>

import {useI18n} from "vue-i18n";
import LandingLayout from "@/layouts/LandingLayout.vue";

const { t } = useI18n()
</script>

<template>
    <LandingLayout>
        <div><button class="button">{{t('m_money_organization')}}</button></div>
    </LandingLayout>
</template>

<style scoped>

</style>
