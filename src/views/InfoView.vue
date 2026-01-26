<script>
import micronutrientsData from '@/data/micronutrients.json'
import NutrientInfoCard from '@/components/NutrientInfoCard.vue'

export default {
    name: 'InfoView',

    components: {
        NutrientInfoCard
    },

	data() {
		return {
			micronutrients: micronutrientsData,
			openedCards: {}
		}
	},

    methods: {
        toggleCard(nutrientId) {
            this.openedCards[nutrientId] = !this.openedCards[nutrientId]
        },
        isOpen(nutrientId) {
			return this.openedCards[nutrientId] || false
		}
    }
}
</script>
        
<template>
    <div class = "info">
        <h2 class="info-title">Micronutrient Information</h2>

        <div class = "nutrients-list">
            <NutrientInfoCard
                v-for = "nutrient in micronutrients"
                :key = "nutrient.id"
                :nutrient = "nutrient"
                :isOpen = "isOpen(nutrient.id)"
                @toggle = "toggleCard(nutrient.id)"
            />
        </div>
    </div>
        
</template>
        
<style scoped>
.info {
	padding: 2rem;
	padding-top: 0.5rem;
}

.info-title {
	text-align: center;
	margin-bottom: 2rem;
}

.nutrients-list {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin-top: 2rem;
	align-items: center;
}
</style>