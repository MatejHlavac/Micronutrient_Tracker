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
        }
    }
}
</script>

<template>
    <div class = "add-food">
        <h1>Add Food</h1>

        <div class = "foods-list">
            <FoodCard v-for = "food in foods" :key = "food.id" :foodItem = "food" />
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
</style>