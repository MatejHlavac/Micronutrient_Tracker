<script>

export default {
    name: 'HistoryDayCard',

    props: {
        dayData: {
            type: Object,
            required: true
        },

        dayKey: {
            type: Object,
            required: true
        }
    },

    computed: {
        date() {
            return new Date(this.dayKey + 'T00:00:00')
        },

        dayInWeek() {
            const formatter = new Intl.DateTimeFormat('en-US', {weekday: 'long'}) 
            return formatter.format(this.date)
        },

        fullDate() {
            const formatter = new Intl.DateTimeFormat('en-US', {day: 'numeric', month: 'numeric', year: 'numeric'})
            return formatter.format(this.date)
        }
    },

    methods: {
        showDayContent() {
            this.$emit('show-content', this.dayKey)
        }
    }
}
</script>

<template>
    <div class="history-day-card" @click="showDayContent">
        <div class="day-name">{{ dayInWeek }}</div>
        <div class="day-full-date">{{ fullDate }}</div>
    </div>
</template>

<style scoped>
.history-day-card {
    border: 1px solid var(--color-border);
    padding: 1rem;
    background: #e4e49f;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    max-width: 280px;
    box-shadow: 2px 2px 0 #b8b84d, 3px 3px 6px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    border-top: none;
    border-left: none;
    border-right: 2px solid #b8b84d;
    border-bottom: 2px solid #b8b84d;
}

.day-name {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--color-text);
}

.day-full-date {
    margin: 0;
    font-size: 1rem;
    color: var(--color-text-secondary);
}
</style>