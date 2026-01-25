<script>
import { useNutritionStore } from '@/stores/nutritions'
import foodsData from '@/data/foods.json'
import micronutrientsData from '@/data/micronutrients.json'

export default {
    name: 'DailyFoodCard',
    props: {
        foodItem: {
            type: Object,
            required: true
        }
    },

	computed: {
		store() {
			return useNutritionStore()
		},

		food() {
			return foodsData.find(f => f.id === this.foodItem.id)
		},

		micronutrients() {
			if (!this.food || !this.food.micronutrients) {
				return []
			}

			return Object.keys(this.food.micronutrients).map(nutrientId => {
				const nutrient = micronutrientsData.find(n => n.id === nutrientId)
				return {
					name: nutrient ? nutrient.name : nutrientId,
					points: this.food.micronutrients[nutrientId]
				}
			})
		}
	},

	methods: {
		removeFood() {
			this.store.removeFood(this.foodItem.id)
		}
	}
}
</script>

<template>
    <div class = "daily-food-card">
        <h3>{{ foodItem.name }}</h3>
        <p class = "count">{{ foodItem.count }}x</p>
        <button @click="removeFood()" class="remove-button">X</button>
        <div v-if="micronutrients.length > 0" class="micronutrients">
            <p class="micronutrients-label">Contains:</p>
            <div class="micronutrients-list">
                <span v-for="nutrient in micronutrients" :key="nutrient.name" class="nutrient-tag">
                    {{ nutrient.name }}
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.daily-food-card {
	border: 1px solid var(--color-border);
	padding: 1rem;
	background: var(--color-background);
	position: relative;
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 280px;
	min-height: 200px;
}

.daily-food-card h3 {
	margin: 0;
	font-size: 1.2rem;
	color: var(--color-text);
}

.count {
	margin: 0.5rem 0;
	color: var(--color-text-secondary);
	font-size: 1rem;
	font-weight: bold;
}

.micronutrients {
	margin-top: auto;
	padding-top: 1rem;
	border-top: 1px solid var(--color-border);
}

.micronutrients-label {
	margin: 0 0 0.5rem 0;
	font-size: 0.8rem;
	color: var(--color-text-secondary);
	font-weight: 500;
}

.micronutrients-list {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
}

.nutrient-tag {
	font-size: 0.75rem;
	color: var(--color-text);
	padding: 0.25rem 0.5rem;
	border: 1px solid var(--color-border);
	background: #e4e49f;
}

.remove-button {
	position: absolute;
	top: 0.5rem;
	right: 0.5rem;
	padding: 0;
	width: 1.5rem;
	height: 1.5rem;
	background: #d3d363;
	border-radius: 2px;
	transition: all 0.2s;
	color: var(--color-text);
	cursor: pointer;
	font-size: 0.9rem;
	font-weight: 500;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 1px 1px 0 #b8b84d, 2px 2px 4px rgba(0, 0, 0, 0.1);
	transform: translate(0, 0);
	border-right: 1px solid #b8b84d;
	border-bottom: 1px solid #b8b84d;
	border-top: none;
	border-left: none;
}

.remove-button:hover {
	box-shadow: 0.5px 0.5px 0 #b8b84d, 1px 1px 2px rgba(0, 0, 0, 0.08);
	transform: translate(0.5px, 0.5px);
}

.remove-button:active {
	box-shadow: 0.25px 0.25px 0 #b8b84d, 0.5px 0.5px 1px rgba(0, 0, 0, 0.05);
	transform: translate(0.75px, 0.75px);
}
</style>