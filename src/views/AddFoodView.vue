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
			searched: '',
			isSorted: null,
			categoryDropdownOpen: false,
			micronutrientDropdownOpen: false
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

		displayedFoods() {
			return this.sortFood(this.search(this.filteredFoods))
		}

		
    },

    methods: {
        setCategory(category) {
            this.selectedCategory = category
            this.$nextTick(() => this.$refs.categoryDropdown?.blur())
        },

		setMicro(micronutrient) {
			this.selectedMicro = micronutrient
			this.$nextTick(() => this.$refs.micronutrientDropdown?.blur())
		},

		search(items) {
			const query = this.searched.toLowerCase()

			if (!query) {
				return items
			} 

			return items.filter(item => 
				item.name.toLowerCase().startsWith(query)
			)
		},

		sortFood(items) {
			if (this.isSorted) {
				return [...items].sort((a, b) => a.name.localeCompare(b.name, 'sk'))
			}

			return items
		},

		toggleSort() {
			this.isSorted = !this.isSorted
		},

		maybeCloseCategoryDropdown(e) {
			if (this.categoryDropdownOpen) {
				document.activeElement?.blur()
				e.preventDefault()
			}
		},

		maybeCloseMicronutrientDropdown(e) {
			if (this.micronutrientDropdownOpen) {
				document.activeElement?.blur()
				e.preventDefault()
			}
		}
    }
}
</script>

<template>
    <div class = "add-food">
        <div class = "filters">
			<div ref="categoryDropdown" class="filter-dropdown" tabindex="0" @focusin="categoryDropdownOpen = true" @focusout="categoryDropdownOpen = false">
				<button type="button" class="filter-dropdown-trigger category-trigger" @mousedown="maybeCloseCategoryDropdown($event)">
					Category: {{ selectedCategory === 'all' ? 'All' : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) }} ▼
				</button>
				<div class="filter-dropdown-content category-dropdown-content">
					<button v-for="category in ['all', 'vegetable', 'fruit', 'meat', 'fish']"
						:key = "category"
						@click = "setCategory(category)"
						:class = "['category-filter-button', {active: selectedCategory === category}]"
					>
					{{ category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1) }}
					</button>
				</div>
			</div>
			<div ref="micronutrientDropdown" class="filter-dropdown" tabindex="0" @focusin="micronutrientDropdownOpen = true" @focusout="micronutrientDropdownOpen = false">
				<button type="button" class="filter-dropdown-trigger micronutrient-trigger" @mousedown="maybeCloseMicronutrientDropdown($event)">
					Micronutrient: {{ selectedMicro === 'all' ? 'All' : (micronuts.find(m => m.id === selectedMicro)?.name ?? selectedMicro) }} ▼
				</button>
				<div class="filter-dropdown-content micronutrient-dropdown-content">
					<button v-for="micronutrient in micronutrientIds"
						:key = "micronutrient"
						@click = "setMicro(micronutrient)"
						:class = "['micronutrient-filter-button', {active: selectedMicro === micronutrient}]"
					>
					{{ micronutrient === 'all' ? 'All' : (micronuts.find(m => m.id === micronutrient)?.name ?? micronutrient) }}
					</button>
				</div>
			</div>
			<button @click="toggleSort" :class="['sort-button', {active: isSorted}]">A-Z</button>
        </div>
		<div class="search-bar">
			<input type="text" v-model="searched" placeholder="Food name...">
		</div>

        <div v-if = "displayedFoods.length > 0" class = "foods-list">
            <FoodCard v-for = "food in displayedFoods" :key = "food.id" :foodItem = "food" />
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
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	margin-bottom: 2rem;
}

.filter-dropdown {
	position: relative;
	display: inline-block;
	outline: none;
}

.filter-dropdown:has(.category-trigger) {
	width: 12.5rem;
}

.filter-dropdown:has(.micronutrient-trigger) {
	width: 16rem;
}

.filter-dropdown:focus-within .filter-dropdown-content {
	display: flex;
}

.filter-dropdown-trigger {
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
	border-top: none;
	border-left: 2px solid #b8b84d;
	border-right: 2px solid #b8b84d;
	border-bottom: 2px solid #b8b84d;
	width: 100%;
	box-sizing: border-box;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.category-trigger {
	min-width: 12.5rem;
}

.micronutrient-trigger {
	min-width: 16rem;
}

.filter-dropdown-content {
	display: none;
	position: absolute;
	top: 100%;
	left: 0;
	margin-top: 2px;
	min-width: 100%;
	flex-direction: column;
	gap: 0.35rem;
	padding: 0.35rem;
	background: var(--color-background);
	border-top: none;
	border-left: 2px solid #b8b84d;
	border-right: 2px solid #b8b84d;
	border-bottom: 2px solid #b8b84d;
	border-radius: 2px;
	box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.15);
	z-index: 10;
	max-height: 280px;
	overflow-y: auto;
}

.micronutrient-dropdown-content {
	max-height: 240px;
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
	text-align: left;
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

.sort-button {
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
	border-right: 2px solid #b8b84d;
	border-bottom: 2px solid #b8b84d;
	border-top: none;
	border-left: none;
}

.sort-button:hover {
	box-shadow: 1px 1px 0 #b8b84d, 2px 2px 4px rgba(0, 0, 0, 0.1);
	transform: translate(1px, 1px);
}

.sort-button.active {
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

	.filter-dropdown-trigger,
	.sort-button {
		font-size: 0.7rem;
		padding: 0.4rem 0.8rem;
	}

	.category-filter-button,
	.micronutrient-filter-button {
		font-size: 0.7rem;
		padding: 0.4rem 0.8rem;
	}
}
</style>