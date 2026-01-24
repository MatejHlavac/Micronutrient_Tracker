<script>
import { useNutritionStore } from './stores/nutritions';
import Navigation from './components/Navigation.vue'

export default {
	name: 'App',

	components: {
		Navigation,
	},

	mounted() {
		const store = useNutritionStore()
		store.initialize()
	}
}
</script>




<template>
	<div id="app">
		<Navigation />
		<router-view />
	</div>
</template>




<style scoped>
#app {
	min-height: 100vh;
}
</style>