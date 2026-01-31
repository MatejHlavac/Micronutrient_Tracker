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
    <div v-if="food" class="food-card">
        <div class="food-content">
            <h3>{{ food.name }}</h3>
            <p class="category">{{ food.category }}</p>
            <div v-if="micronutrients.length > 0" class="micronutrients">
                <div class="micronutrients-list">
                    <span v-for="nutrient in micronutrients" :key="nutrient" class="nutrient-tag">
                        {{ nutrient }}
                    </span>
                </div>
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
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
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