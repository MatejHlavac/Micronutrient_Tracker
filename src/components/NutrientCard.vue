<script>
export default {
    name: 'NutrientCard',

    props: {
        nutrient: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            isHovered: false
        }
    },

	computed: {
		progressColor() {
			const percentage = this.nutrient.percentage
			
			if (percentage <= 25) {
				return '#dc3545' 
			} else if (percentage <= 50) {
				return '#ff9800'
			} else if (percentage <= 75) {
				return '#ffc107' 
			} else {
				return '#28a745'
			}
		},
		showTextInContainer() {
			return this.nutrient.percentage < 25
		}
	},

    methods: {
        showPoints() {
            this.isHovered = true
        },
        hidePoints() {
            this.isHovered = false
        }
    }
}
</script>

<template>
    <div class = "nutrient-card">
        <h3>{{ nutrient.name }}</h3>
        
        <div class = "progress-container"
            @mouseenter = "showPoints()"
            @mouseleave = "hidePoints()"
        >
            <div class = "progress-bar" 
                :style = "{ 
                    width: nutrient.percentage + '%', 
                    background: progressColor
                }"
            >
                <span v-if = "!isHovered && !showTextInContainer" class = "progress-text">
                    {{ Math.round(nutrient.percentage) }}%
                </span>
                <span v-if = "isHovered && !showTextInContainer" class = "progress-text">
                    {{ nutrient.currentValue }} / {{ nutrient.maxValue }}
                </span>
            </div>
            <span v-if = "!isHovered && showTextInContainer" class = "progress-text-container">
                {{ Math.round(nutrient.percentage) }}%
            </span>
            <span v-if = "isHovered && showTextInContainer" class = "progress-text-container">
                {{ nutrient.currentValue }} / {{ nutrient.maxValue }}
            </span>
        </div>
    </div>
</template>

<style scoped>
.nutrient-card {
	border: 1px solid var(--color-border);
	padding: 1rem;
	background: var(--color-background);
}

.nutrient-card h3 {
	margin: 0;
	font-size: 1.2rem;
	color: var(--color-text);
	text-align: center;
}

.progress-container {
	width: 100%;
	height: 30px;
	background: var(--color-background);
	border: 1px solid var(--color-border);
	overflow: hidden;
	position: relative;
	margin-top: 1rem;
}

.progress-bar {
	height: 100%;
	border-radius: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: width 0.3s ease;
}

.progress-text {
	color: var(--color-text);
	font-weight: bold;
	font-size: 0.85rem;
}

.progress-text-container {
	color: var(--color-text);
	font-weight: bold;
	font-size: 0.85rem;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 1;
}
</style>