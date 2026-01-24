<script>
import { useNutritionStore } from '@/stores/nutritions'

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
        <button @click="removeFood()" class="remove-button">Remove</button>
    </div>
</template>

<style scoped>
.daily-food-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
    
.daily-food-card h3 {
    margin: 0;
    font-size: 1.2rem;
}

.count {
	margin: 0.5rem 0;
	color: #666;
	font-size: 1rem;
	font-weight: bold;
}

.remove-button {
	margin-top: 0.5rem;
	padding: 0.5rem 1rem;
	background: #dc3545;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-size: 0.9rem;
	transition: background 0.3s;
}

.remove-button:hover {
	background: #c82333;
}
</style>