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
        <h2 class="stats-title">Weekly Stats</h2>

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
	padding-top: 0.5rem;
}

.stats-title {
	text-align: center;
	margin-bottom: 2rem;
}

.nutrients-grid {
	display: grid;
	grid-template-columns: repeat(4, 250px);
	gap: 1rem;
	margin-top: 2rem;
	justify-content: center;
}

.filters {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;
	margin-bottom: 2rem;
	flex-wrap: wrap;
}

.filter-button {
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

.filter-button:first-child {
	margin-right: 1rem;
}

.filter-button:hover {
	box-shadow: 1px 1px 0 #b8b84d, 2px 2px 4px rgba(0, 0, 0, 0.1);
	transform: translate(1px, 1px);
}

.filter-button:active {
	box-shadow: 0.5px 0.5px 0 #b8b84d, 1px 1px 2px rgba(0, 0, 0, 0.08);
	transform: translate(1.5px, 1.5px);
}

.filter-button.active {
	background: #e4e49f;
}
</style>