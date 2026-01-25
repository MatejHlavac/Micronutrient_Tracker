<script>
import { useNutritionStore } from '@/stores/nutritions'
import micronutrientsData from '@/data/micronutrients.json'
import NutrientCard from '@/components/NutrientCard.vue'

export default {
    name: 'StatsView',
    components: {
        NutrientCard
    },

    data() {
        return {
            selectedCategory: 'all'
        }
    },

    computed: {
        store() {
            return useNutritionStore()
        },

        micronutrientsWithStats() {
            const allNutrients = micronutrientsData.map(nutrient => {
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

            if (this.selectedCategory === 'all') {
                return allNutrients
            }

            return allNutrients.filter(nutrient => nutrient.type === this.selectedCategory)
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
    <div class = "stats">
        <h1>Weekly Stats</h1>

        <div class="filters">
			<button 
				v-for="category in ['all', 'vitamin', 'mineral']"
				:key="category"
				@click="setCategory(category)"
				:class="['filter-button', { active: selectedCategory === category }]"
			>
				{{ category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1) }}
			</button>
		</div>

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

.filters {
	display: flex;
	gap: 0.5rem;
	margin-bottom: 2rem;
	flex-wrap: wrap;
}

.filter-button {
	padding: 0.5rem 1rem;
	background: #f5f5f5;
	border: 1px solid #ddd;
	border-radius: 4px;
	cursor: pointer;
	font-size: 0.9rem;
	transition: all 0.3s;
	text-transform: capitalize;
}

.filter-button:hover {
	background: #e0e0e0;
}

.filter-button.active {
	background: #42b983;
	color: white;
	border-color: #42b983;
}
</style>