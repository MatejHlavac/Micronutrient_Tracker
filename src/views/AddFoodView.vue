<script>
import foodsData from '@/data/foods.json'

export default {
    name: 'AddFoodView',

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
            <div v-for="food in foods" :key = "food.id" class = "food-item">
                {{ food.name }}
            </div>
        </div>
    </div>

</template>

<style scoped>
.add-food {
	padding: 2rem;
}
</style>