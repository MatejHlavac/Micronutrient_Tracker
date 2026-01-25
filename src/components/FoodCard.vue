<script>
import { useNutritionStore } from '@/stores/nutritions';

export default {
    name: 'FoodCard',
    props: {
        foodItem: {
            type: Object, 
            required: true
        }
    },

    methods: {
        addFood() {
            this.store.addFood(this.foodItem.id)
        },

        removeFood() {
            this.store.removeFood(this.foodItem.id)
        }
    },

    computed: {
        store() {
            return useNutritionStore()
        },
        
        addedCount() {
            return this.store.dailyFoods.filter(id => id === this.foodItem.id).length
        }
    }
}
</script>

<template>
    <div class = "food-card">
        <h3>{{ foodItem.name }}</h3>
        <p class = "category">{{ foodItem.category }}</p>
        <p v-if = "addedCount > 0" class = "added-count">Added: {{ addedCount }}x</p>
        <button @click = "addFood()" class = "add-button">Add</button>
        <button v-if="addedCount > 0" @click = "removeFood()" class = "remove-button">Remove</button>
    </div>
</template>

<style scoped>
.food-card {
	border: 1px solid var(--color-border);
	padding: 1rem;
	background: var(--color-background);
}

.food-card h3 {
	margin: 0 0 0.5rem 0;
	font-size: 1.2rem;
	color: var(--color-text);
}

.food-card .category {
	margin: 0;
	color: var(--color-text-secondary);
	font-size: 0.9rem;
	text-transform: capitalize;
}

.add-button {
	margin-top: 0.5rem;
	padding: 0.5rem 1rem;
	background: rgba(255, 255, 255, 0.4);
	backdrop-filter: blur(20px) saturate(180%);
	color: var(--color-text);
	border: 1px solid rgba(0, 0, 0, 0.2);
	border-radius: 12px;
	cursor: pointer;
	font-size: 0.9rem;
	transition: all 0.2s;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.add-button:hover {
	background: rgba(255, 255, 255, 0.6);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.added-count {
	margin: 0.5rem 0;
	color: var(--color-text);
	font-weight: bold;
	font-size: 0.9rem;
}

.remove-button {
	margin-top: 0.5rem;
	margin-left: 0.5rem;
	padding: 0.5rem 1rem;
	background: rgba(255, 255, 255, 0.4);
	backdrop-filter: blur(20px) saturate(180%);
	color: var(--color-text);
	border: 1px solid rgba(0, 0, 0, 0.2);
	border-radius: 12px;
	cursor: pointer;
	font-size: 0.9rem;
	transition: all 0.2s;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.remove-button:hover {
	background: rgba(255, 255, 255, 0.6);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>