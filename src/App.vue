<script>
import { useNutritionStore } from './stores/nutritions';

export default {
	name: 'App',
	mounted() {
		const store = useNutritionStore()
		store.initialize()
	}
}
</script>




<template>
	<div id="app">
		<router-view />
	</div>
</template>




<style scoped>
#app {
	min-height: 100vh;
}
</style>