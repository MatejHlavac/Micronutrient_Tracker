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
        <div class = "card-header">
            <h3>{{ nutrient.name }}</h3>
            <span class = "arrow" @click = "toggle">{{ isOpen ? '▲' : '▼' }}</span>
        </div>

        <div v-if="isOpen" class="card-content">
            <p class="info-text" v-html="nutrient.description"></p>
        </div>
    </div>
</template>

<style scoped>
.nutrient-info-card {
	border: 1px solid #ddd;
	border-radius: 8px;
	background: white;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	margin-bottom: 1rem;
}

.card-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
	cursor: pointer;
}

.card-header h3 {
	margin: 0;
	font-size: 1.2rem;
}

.arrow {
	font-size: 1rem;
	color: #666;
}

.card-content {
	padding: 1rem;
	border-top: 1px solid #e0e0e0;
}

.info-text {
	margin: 0;
	color: #666;
	line-height: 1.6;
}
</style>