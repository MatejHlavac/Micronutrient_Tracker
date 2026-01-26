<script>

import { useNutritionStore } from '@/stores/nutritions';
import foodsData from '@/data/foods.json'
import DailyFoodCard from '@/components/DailyFoodCard.vue';

export default {
	name: 'HomeView',

	components: {
		DailyFoodCard
	},

	computed: {
		store() {
			return useNutritionStore()
		},

		weekday() {
			const today = new Date()
			const options = { weekday: 'long' }
			return today.toLocaleDateString('en-US', options)
		},

		currentDate() {
			const today = new Date()
			const month = today.toLocaleDateString('en-US', { month: 'short' })
			const day = today.toLocaleDateString('en-US', { day: 'numeric' })
			const year = today.toLocaleDateString('en-US', { year: 'numeric' })
			return `${month} ${day} ${year}`
		},

		dailyFoodsList() {
			const counts = {}

			this.store.dailyFoods.forEach(foodId => {
				if (counts[foodId]) {
					counts[foodId]++
				} else {
					counts[foodId] = 1
				}
			})

			return Object.keys(counts).map(foodId => {
				const food = foodsData.find(f => f.id === foodId)
				return {
					id: foodId,
					name: food.name,
					count: counts[foodId]
				}
			})
		}
	}
}
</script>

<template>
	<div class="home">
		<div v-if = "dailyFoodsList.length === 0" class = "empty-state">
			<p class="empty-text">Looks like you haven't added any foods today...</p>
			<p class="empty-subtext">time to change it!</p>
			<RouterLink to="/add" class="add-food-button">Add Food</RouterLink>
		</div>

		<div v-else class = "daily-foods">
			<h2 class="foods-title">Today's Foods</h2>
			<div class = "foods-grid">
				<DailyFoodCard
					v-for = "item in dailyFoodsList"
					:key = "item.id"
					:foodItem = "item" 
				/>
			</div>
		</div>

		<div class="date-header">
			<span class="weekday">{{ weekday }}</span>
			<span class="date">{{ currentDate }}</span>
		</div>
	</div>
</template>

<style scoped>
.home {
	padding: 2rem;
	padding-top: 0.5rem;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}

.date-header {
	margin-top: auto;
	padding-top: 2rem;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
}

.weekday {
	font-size: 1.5rem;
	font-weight: 400;
}

.date {
	font-size: 1.5rem;
	font-weight: 400;
	margin-left: 3rem;
}

.empty-state {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-top: 4rem;
	text-align: center;
}

.empty-text {
	font-size: 1.5rem;
	margin: 0;
	margin-bottom: 0.5rem;
}

.empty-subtext {
	font-size: 1.5rem;
	margin: 0;
	margin-bottom: 1.5rem;
}

.add-food-button {
	padding: 0.75rem 1.5rem;
	background: #d3d363;
	border-radius: 4px;
	transition: all 0.2s;
	color: var(--color-text);
	text-decoration: none;
	font-weight: 500;
	box-shadow: 2px 2px 0 #b8b84d, 3px 3px 6px rgba(0, 0, 0, 0.15);
	transform: translate(0, 0);
	border-right: 2px solid #b8b84d;
	border-bottom: 2px solid #b8b84d;
}

.add-food-button:hover {
	box-shadow: 1px 1px 0 #b8b84d, 2px 2px 4px rgba(0, 0, 0, 0.1);
	transform: translate(1px, 1px);
}

.add-food-button:active {
	box-shadow: 0.5px 0.5px 0 #b8b84d, 1px 1px 2px rgba(0, 0, 0, 0.08);
	transform: translate(1.5px, 1.5px);
}

.foods-title {
	text-align: center;
	margin-bottom: 2rem;
}

.foods-grid {
	display: grid;
	grid-template-columns: repeat(3, 280px);
	gap: 1rem;
	margin-top: 1rem;
	max-width: 900px;
	margin-left: auto;
	margin-right: auto;
	justify-content: center;
}

@media (max-width: 1024px) {
	.foods-grid {
		grid-template-columns: repeat(2, 280px);
	}
}

@media (max-width: 768px) {
	.home {
		padding: 1rem;
		padding-top: 0.5rem;
	}

	.date-header {
		flex-direction: column;
		gap: 0.5rem;
	}

	.weekday,
	.date {
		font-size: 1.2rem;
		margin-left: 0;
	}

	.empty-text,
	.empty-subtext {
		font-size: 1.2rem;
	}

	.foods-grid {
		grid-template-columns: 1fr;
		max-width: 100%;
	}

	.foods-grid .daily-food-card {
		max-width: 100%;
	}
}
</style>