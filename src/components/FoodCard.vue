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
            const store = useNutritionStore()
            store.addFood(this.foodItem.id)
        }
    }
}
</script>

<template>
    <div class = "food-card">
        <h3>{{ foodItem.name }}</h3>
        <p class = "category">{{ foodItem.category }}</p>
        <button @click = "addFood()" class = "add-button">Add</button>
    </div>
</template>

<style scoped>
.food-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
    
.food-card h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.2rem;
}
    
.food-card .category {
	margin: 0;
	color: #666;
	font-size: 0.9rem;
	text-transform: capitalize;
}

.add-button {
	margin-top: 0.5rem;
	padding: 0.5rem 1rem;
	background: #42b983;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-size: 0.9rem;
	transition: background 0.3s;
}

.add-button:hover {
	background: #35a372;
}
</style>