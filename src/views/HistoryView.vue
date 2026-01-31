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
        },

        sortedHistoryEntries() {
            return Object.entries(this.history).sort((a, b) => a[0].localeCompare(b[0]))
        },

        emptyContainersCount() {
            return Math.max(0, 7 - Object.keys(this.history).length)
        }
    }

}

</script>

<template>
    <div class="history-page">
        <h2 class="history-title">Your 7 days history</h2>
        <div class="history-cards">
            <div v-for="n in emptyContainersCount" :key="'empty-' + n" class="empty-container"><span class="empty-container-text">No data</span></div>
            <HistoryDayCard
                v-for="[dayKey, dayData] in sortedHistoryEntries"
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

.history-cards {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
}

.empty-container {
    width: 100%;
    max-width: 280px;
    min-height: 80px;
    border: 1px dashed var(--color-border);
    background: rgba(0, 0, 0, 0.04);
    border-radius: 2px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
}

.empty-container:hover .empty-container-text {
    color: rgba(0, 0, 0, 0.65);
}

.empty-container-text {
    color: rgba(0, 0, 0, 0.4);
    font-size: 1rem;
}
</style>