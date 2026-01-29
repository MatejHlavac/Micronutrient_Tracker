<script>
import foodsData from '@/data/foods.json'
import FoodCard from '@/components/FoodCard.vue'
import Micronutrients from '@/data/micronutrients.json'

export default {
    name: 'AddFoodView',

    components: {
        FoodCard
    },

    data() {
        return {
            foods: foodsData,
			micronuts: Micronutrients,
            selectedCategory: 'all',
			selectedMicro: 'all',
			searched: ''
        }
    },

    computed: {
        filteredFoods() {
            if (this.selectedCategory === 'all' && this.selectedMicro === 'all') {
                return this.foods
            } 
			else if (this.selectedCategory === 'all' && this.selectedMicro !== 'all') {
				return this.foods.filter(food => 
					Object.keys(food.micronutrients).some(micronutrient => micronutrient === this.selectedMicro))
			} 
			else if (this.selectedCategory !== 'all' && this.selectedMicro === 'all') {
				return this.foods.filter(food => 
					food.category === this.selectedCategory)
			} 
			else {
				return (this.foods.filter(food => 
					food.category === this.selectedCategory && 
					Object.keys(food.micronutrients).some(micronutrient => 
						micronutrient === this.selectedMicro)))
			}
        },

		micronutrientIds() {
			return ['all', ...this.micronuts.map(item => item.id)]
		},

		
    },

    methods: {
        setCategory(category) {
            this.selectedCategory = category
        },

		setMicro(micronutrient) {
			this.selectedMicro = micronutrient
		},

		search(items) {
			const query = this.searched.toLowerCase()

			if (!query) {
				return items
			} 

			return items.filter(item => 
				item.name.toLowerCase().startsWith(query)
			)
		}
    }
}
</script>

<template>
    <div class = "add-food">
        <div class = "filters">
			<div class = "category-filters">
				<button v-for="category in ['all', 'vegetable', 'fruit', 'meat', 'fish']"
					:key = "category"
					@click = "setCategory(category)"
					:class = "['category-filter-button', {active: selectedCategory === category}]"
				>
				{{ category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1) }}
				</button>
			</div>
			<div class = "micronutrient-filters">
				<button v-for="micronutrient in micronutrientIds"
					:key = "micronutrient"
					@click = "setMicro(micronutrient)"
					:class = "['micronutrient-filter-button', {active: selectedMicro === micronutrient}]"
				>
				{{ micronutrient === 'all' ? 'All' : (micronuts.find(m => m.id === micronutrient)?.name ?? micronutrient) }}
				</button>
			</div>
        </div>
		<div class="search-bar">
			<input type="text" v-model="searched" placeholder="Food name...">
		</div>

        <div v-if = "search(filteredFoods).length > 0" class = "foods-list">
            <FoodCard v-for = "food in search(filteredFoods)" :key = "food.id" :foodItem = "food" />
        </div>
		<div v-else class = "no-foods-text">
			<p>No foods found... change filters!</p>
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

.no-foods-text {
	text-align: center;
	margin-top: 6rem;
}

.no-foods-text p {
	font-size: 1.5rem;
	margin: 0;
}

.search-bar {
	display: flex;
	justify-content: center;
	margin-bottom: 2rem;
}

.search-bar input {
	width: 100%;
	max-width: 320px;
	padding: 0.5rem 1rem;
	font-family: "JetBrains Mono", monospace;
	font-size: 0.9rem;
	color: var(--color-text);
	background: #e4e49f;
	border-radius: 2px;
	border: 2px solid rgba(0, 0, 0, 0.15);
	border-right: 2px solid #b8b84d;
	border-bottom: 2px solid #b8b84d;
	box-shadow: 2px 2px 0 #b8b84d, 3px 3px 6px rgba(0, 0, 0, 0.1);
	transform: translate(0, 0);
	transition: box-shadow 0.2s, transform 0.2s;
}

.search-bar input::placeholder {
	color: rgba(0, 0, 0, 0.35);
}

.search-bar input:focus {
	outline: none;
	background: #e4e49f;
	box-shadow: 0.5px 0.5px 0 #b8b84d, 1px 1px 2px rgba(0, 0, 0, 0.08);
	transform: translate(1px, 1px);
}

.filters {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
	margin-bottom: 2rem;
}

.category-filters,
.micronutrient-filters {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;
	flex-wrap: wrap;
}

.category-filter-button,
.micronutrient-filter-button {
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

.category-filter-button:first-child,
.micronutrient-filter-button:first-child {
	margin-right: 1rem;
}

.category-filter-button:hover,
.micronutrient-filter-button:hover {
	box-shadow: 1px 1px 0 #b8b84d, 2px 2px 4px rgba(0, 0, 0, 0.1);
	transform: translate(1px, 1px);
}

.category-filter-button:active,
.micronutrient-filter-button:active {
	box-shadow: 0.5px 0.5px 0 #b8b84d, 1px 1px 2px rgba(0, 0, 0, 0.08);
	transform: translate(1.5px, 1.5px);
}

.category-filter-button.active,
.micronutrient-filter-button.active {
	background: #e4e49f;
}

@media (max-width: 768px) {
	.add-food {
		padding: 1rem;
	}

	.search-bar input {
		max-width: 100%;
		font-size: 0.85rem;
		padding: 0.45rem 0.75rem;
	}

	.foods-list .food-card {
		max-width: 100%;
	}

	.category-filter-button,
	.micronutrient-filter-button {
		font-size: 0.7rem;
		padding: 0.4rem 0.8rem;
	}

	.category-filter-button:first-child,
	.micronutrient-filter-button:first-child {
		margin-right: 0.5rem;
	}
}
</style>