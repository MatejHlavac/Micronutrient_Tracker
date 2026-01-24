<script>
import foodsData from '@/data/foods.json'
import FoodCard from '@/components/FoodCard.vue'

export default {
    name: 'AddFoodView',

    components: {
        FoodCard
    },

    data() {
        return {
            foods: foodsData,
            selectedCategory: 'all'
        }
    },

    computed: {
        filteredFoods() {
            if (this.selectedCategory === 'all') {
                return this.foods
            }

            return this.foods.filter(food => food.category === this.selectedCategory)
        }
    },

    methods: {
        setCategory(category) {
            this.selectedCategory = category
        }
    }
}
</script>

<template>
    <div class = "add-food">
        <h1>Add Food</h1>

        <div class = "filters">
            <button v-for="category in ['all', 'vegetable', 'fruit', 'meat', 'fish']"
                :key = "category"
                @click = "setCategory(category)"
                :class = "['filter-button', {active: selectedCategory === category}]"
            >
            {{ category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1) }}
            </button>
        </div>

        <div class = "foods-list">
            <FoodCard v-for = "food in filteredFoods" :key = "food.id" :foodItem = "food" />
        </div>
    </div>

</template>

<style scoped>
.add-food {
	padding: 2rem;
}

.foods-list {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	gap: 1rem;
	margin-top: 2rem;
}

.filters {
	display: flex;
	gap: 0.5rem;
	margin-bottom: 2rem;
	flex-wrap: wrap;
}

.filter-button {
	padding: 0.5rem 1rem;
	background: #f5f5f5;
	border: 1px solid #ddd;
	border-radius: 4px;
	cursor: pointer;
	font-size: 0.9rem;
	transition: all 0.3s;
	text-transform: capitalize;
}

.filter-button:hover {
	background: #e0e0e0;
}

.filter-button.active {
	background: #42b983;
	color: white;
	border-color: #42b983;
}
</style>