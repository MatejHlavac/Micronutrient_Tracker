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
		<h1>Home</h1>

		<div v-if = "dailyFoodsList.length === 0" class = "empty-state">
			<p>No foods added today</p>
		</div>

		<div v-else class = "daily-foods">
			<h2>Today's Foods</h2>
			<div class = "foods-grid">
				<DailyFoodCard
					v-for = "item in dailyFoodsList"
					:key = "item.id"
					:foodItem = "item" 
				/>
			</div>
		</div>
	</div>
</template>

<style scoped>
.home {
	padding: 2rem;
}

.foods-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	gap: 1rem;
	margin-top: 1rem;
}
</style>