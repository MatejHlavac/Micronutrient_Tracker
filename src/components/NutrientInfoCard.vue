<script>
export default {
    name: 'NutrientInfoCard',
    props: {
        nutrient: {
            type: Object,
            required: true
        },

        isOpen: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        toggle() {
            this.$emit('toggle')
        }
    }
}

</script>

<template>
    <div class = "nutrient-info-card">
        <div class = "card-header" @click = "toggle">
            <h3>{{ nutrient.name }}</h3>
            <span class = "arrow">{{ isOpen ? '▲' : '▼' }}</span>
        </div>

        <div v-if="isOpen" class="card-content">
            <p class="info-text" v-html="nutrient.description"></p>
        </div>
    </div>
</template>

<style scoped>
.nutrient-info-card {
	border: 1px solid var(--color-border);
	background: #e4e49f;
	display: flex;
	flex-direction: column;
	width: 50%;
}

.card-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
	cursor: pointer;
	transition: background 0.2s;
}

.card-header:hover {
	background: #d3d363;
}

.card-header h3 {
	margin: 0;
	font-size: 1.2rem;
	color: var(--color-text);
}

.arrow {
	font-size: 1rem;
	color: var(--color-text);
}

.card-content {
	padding: 1rem;
	border-top: 1px solid var(--color-border);
}

.info-text {
	margin: 0;
	color: var(--color-text-secondary);
	line-height: 1.6;
}

@media (max-width: 768px) {
	.nutrient-info-card {
		width: 100%;
	}

	.card-header h3 {
		font-size: 1rem;
	}
}
</style>