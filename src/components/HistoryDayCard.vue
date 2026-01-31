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
    padding: 0.5rem 1rem;
    background: #d3d363;
    border-radius: 2px;
    transition: all 0.2s;
    color: var(--color-text);
    cursor: pointer;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.8rem;
    font-weight: 500;
    box-shadow: 2px 2px 0 #b8b84d, 3px 3px 6px rgba(0, 0, 0, 0.15);
    transform: translate(0, 0);
    border-right: 2px solid #b8b84d;
    border-bottom: 2px solid #b8b84d;
    border-top: none;
    border-left: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    max-width: 280px;
}

.history-day-card:hover {
    box-shadow: 1px 1px 0 #b8b84d, 2px 2px 4px rgba(0, 0, 0, 0.1);
    transform: translate(1px, 1px);
}

.history-day-card:active {
    box-shadow: 0.5px 0.5px 0 #b8b84d, 1px 1px 2px rgba(0, 0, 0, 0.08);
    transform: translate(1.5px, 1.5px);
}

.day-name {
    margin: 0;
    font-size: 1rem;
    font-weight: 500;
    color: var(--color-text);
}

.day-full-date {
    margin: 0;
    font-size: 0.85rem;
    color: var(--color-text-secondary);
}
</style>