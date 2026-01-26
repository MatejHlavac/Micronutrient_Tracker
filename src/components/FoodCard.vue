<script>
import { useNutritionStore } from '@/stores/nutritions';
import foodsData from '@/data/foods.json'
import micronutrientsData from '@/data/micronutrients.json'

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
    }
}
</script>

<template>
    <div class = "food-card">
        <div class="food-content">
            <h3>{{ foodItem.name }}</h3>
            <p class = "category">{{ foodItem.category }}</p>
            <div v-if="micronutrients.length > 0" class="micronutrients">
                <div class="micronutrients-list">
                    <span v-for="nutrient in micronutrients" :key="nutrient.name" class="nutrient-tag">
                        {{ nutrient.name }}
                    </span>
                </div>
            </div>
        </div>
        <div class="buttons-container">
            <p v-if = "addedCount > 0" class = "added-count">Added: {{ addedCount }}x</p>
            <div class="buttons">
                <button @click = "addFood()" class = "add-button">+</button>
                <button v-if="addedCount > 0" @click = "removeFood()" class = "remove-button">-</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.food-card {
	border: 1px solid var(--color-border);
	padding: 1rem;
	background: var(--color-background);
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.food-content {
	flex: 1;
}

.food-card h3 {
	margin: 0 0 0.5rem 0;
	font-size: 1.4rem;
	color: var(--color-text);
}

.food-card .category {
	margin: 0;
	color: var(--color-text-secondary);
	font-size: 0.9rem;
	text-transform: capitalize;
}

.buttons-container {
	display: flex;
	flex-direction: row;
	gap: 1rem;
	align-items: center;
	justify-content: center;
}

.added-count {
	margin: 0;
	color: var(--color-text);
	font-weight: bold;
	font-size: 0.9rem;
}

.buttons {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	align-items: center;
}

.add-button {
	padding: 0;
	width: 1.5rem;
	height: 1.5rem;
	background: #7BC87B;
	border-radius: 2px;
	transition: all 0.2s;
	color: var(--color-text);
	cursor: pointer;
	font-size: 1rem;
	font-weight: 500;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 1px 1px 0 #5BA85B, 2px 2px 4px rgba(0, 0, 0, 0.1);
	transform: translate(0, 0);
	border-right: 1px solid #5BA85B;
	border-bottom: 1px solid #5BA85B;
	border-top: none;
	border-left: none;
}

.add-button:hover {
	box-shadow: 0.5px 0.5px 0 #5BA85B, 1px 1px 2px rgba(0, 0, 0, 0.08);
	transform: translate(0.5px, 0.5px);
}

.add-button:active {
	box-shadow: 0.25px 0.25px 0 #5BA85B, 0.5px 0.5px 1px rgba(0, 0, 0, 0.05);
	transform: translate(0.75px, 0.75px);
}

.remove-button {
	padding: 0;
	width: 1.5rem;
	height: 1.5rem;
	background: #e07a7a;
	border-radius: 2px;
	transition: all 0.2s;
	color: var(--color-text);
	cursor: pointer;
	font-size: 1.2rem;
	font-weight: 500;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 1px 1px 0 #c55a5a, 2px 2px 4px rgba(0, 0, 0, 0.1);
	transform: translate(0, 0);
	border-right: 1px solid #c55a5a;
	border-bottom: 1px solid #c55a5a;
	border-top: none;
	border-left: none;
}

.remove-button:hover {
	box-shadow: 0.5px 0.5px 0 #c55a5a, 1px 1px 2px rgba(0, 0, 0, 0.08);
	transform: translate(0.5px, 0.5px);
}

.remove-button:active {
	box-shadow: 0.25px 0.25px 0 #c55a5a, 0.5px 0.5px 1px rgba(0, 0, 0, 0.05);
	transform: translate(0.75px, 0.75px);
}

.micronutrients {
	margin-top: 0.5rem;
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
</style>