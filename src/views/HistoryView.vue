<script>
import { useNutritionStore } from '@/stores/nutritions.js'
import HistoryDayCard from '@/components/HistoryDayCard.vue'

export default {
    name: 'HistoryView',

    components: {
        HistoryDayCard
    },

    computed: {
        store() {
            return useNutritionStore()
        },

        history() {
            return this.store.weeklyHistory || {}
        }
    }

}

</script>

<template>
    <div class="history-page">
        <h2 class="history-title">Your 7 days history</h2>
        <div v-if="Object.keys(history).length === 0" class="empty-history">
            Looks like your history is empty...
        </div>
        <div v-else class="history-cards">
        <HistoryDayCard v-for="(dayData, dayKey) in history" 
            :key="dayKey"
            :dayData="dayData"
            :dayKey="dayKey">
        </HistoryDayCard>
    </div>
    </div>
</template>

<style scoped>
.history-page {
    padding: 2rem;
    padding-top: 0.5rem;
}

.history-title {
    text-align: center;
    margin-bottom: 2rem;
}

.empty-history {
    text-align: center;
    font-size: 1.1rem;
}

.history-cards {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
}
</style>