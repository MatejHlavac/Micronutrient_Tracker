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
			return this.nutrient.percentage < 20
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
	border: 1px solid #ddd;
	border-radius: 8px;
	padding: 1rem;
	background: white;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nutrient-card h3 {
	margin: 0;
	font-size: 1.2rem;
    color: #000;
	text-align: center;
}

.progress-container {
	width: 100%;
	height: 30px;
	background: #e0e0e0;
	border: 1px solid #000;
	border-radius: 15px;
	overflow: hidden;
	position: relative;
	margin-top: 1rem;
}

.progress-bar {
	height: 100%;
	background: #42b983;
	border-radius: 15px;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: width 0.3s ease;
}

.progress-text {
	color: white;
	font-weight: bold;
	font-size: 0.85rem;
	text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.progress-text-container {
	color: #666;
	font-weight: bold;
	font-size: 0.85rem;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 1;
}
</style>