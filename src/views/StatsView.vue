<script>
import { useNutritionStore } from '@/stores/nutritions'
import micronutrientsData from '@/data/micronutrients.json'
import NutrientCard from '@/components/NutrientCard.vue'

export default {
    name: 'StatsView',
    components: {
        NutrientCard
    },

    computed: {
        store() {
            return useNutritionStore()
        },

        micronutrientsWithStats() {
            return micronutrientsData.map(nutrient => {
                const currentValue = this.store.weeklyStats[nutrient.id] || 0
                const maxValue = nutrient.maxValue
                const percentage = Math.min((currentValue / maxValue) * 100, 100)

                return {
                    id: nutrient.id,
                    name: nutrient.name,
                    type: nutrient.type,
                    currentValue: currentValue,
                    maxValue: maxValue,
                    percentage: percentage
                }
            })
        }
    }
}
</script>
    
<template>
    <div class = "stats">
        <h1>Weekly Stats</h1>

        <div class = "nutrients-grid">
            <NutrientCard
                v-for = "nutrient in micronutrientsWithStats"
                :key = "nutrient.id"
                :nutrient = "nutrient" 
            />
        </div>
    </div>
    
</template>
    
<style scoped>
.stats {
	padding: 2rem;
}

.nutrients-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	gap: 1rem;
	margin-top: 2rem;
}
</style>