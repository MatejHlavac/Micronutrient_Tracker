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
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
	margin-top: 2rem;
}

.foods-list .food-card {
	max-width: 55%;
	width: 100%;
}

.filters {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;
	margin-bottom: 2rem;
	flex-wrap: wrap;
}

.filter-button {
	padding: 0.5rem 1rem;
	background: #d3d363;
	border-radius: 2px;
	transition: all 0.2s;
	text-transform: capitalize;
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
}

.filter-button:first-child {
	margin-right: 1rem;
}

.filter-button:hover {
	box-shadow: 1px 1px 0 #b8b84d, 2px 2px 4px rgba(0, 0, 0, 0.1);
	transform: translate(1px, 1px);
}

.filter-button:active {
	box-shadow: 0.5px 0.5px 0 #b8b84d, 1px 1px 2px rgba(0, 0, 0, 0.08);
	transform: translate(1.5px, 1.5px);
}

.filter-button.active {
	background: #e4e49f;
}

@media (max-width: 768px) {
	.add-food {
		padding: 1rem;
	}

	.foods-list .food-card {
		max-width: 100%;
	}

	.filter-button {
		font-size: 0.7rem;
		padding: 0.4rem 0.8rem;
	}

	.filter-button:first-child {
		margin-right: 0.5rem;
	}
}
</style>