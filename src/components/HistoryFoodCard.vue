<script>
import { useNutritionStore } from '@/stores/nutritions'
import FoodsData from '@/data/foods.json'
import Micronutrients from '@/data/micronutrients.json'

export default {
    name: 'HistoryFoodCard',

    props: {
        foodId: {
            type: String,
            required: true
        }
    },

    computed: {
        store() {
            return useNutritionStore()
        },

        food() {
            return FoodsData.find(item => item.id === this.foodId)
        },

        micronutrients() {
            if (!this.food || !this.food.micronutrients) {
                return []
            }

            return Object.keys(this.food.micronutrients).map(micronutrientId => {
                const micronutrient = Micronutrients.find(micronutrientObj => micronutrientObj.id === micronutrientId)
                return micronutrient.name
            })
        }
    }
}
</script>

<template>
    <div v-if="food" class="food-content">
        <h3>{{ food.name }}</h3>
        <p class = "category">{{ food.category }}</p>
        <div v-if="micronutrients.length > 0" class="micronutrients">
            <div class="micronutrients-list">
                <span v-for="nutrient in micronutrients" :key="nutrient" class="nutrient-tag">
                    {{ nutrient }}
                </span>
            </div>
        </div>
    </div>
</template>