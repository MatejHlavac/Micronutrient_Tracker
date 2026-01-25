<script>
export default {
	name: 'AboutView'
}
</script>

<template>
	<div class="about">
		<div class="header">
			<h1>Micronutrient Tracker</h1>
			<p class="subtitle">Track your daily food intake and monitor your weekly micronutrient statistics to maintain a balanced and healthy diet.</p>
		</div>

		<section class="section">
			<h2>About This App</h2>
			<p>Micronutrient Tracker helps you monitor your daily intake of essential vitamins and minerals. By tracking the foods you consume each day, you can ensure you're meeting your weekly nutritional goals and maintaining optimal health.</p>
		</section>

		<section class="section">
			<h2>Features</h2>
			<ul class="features-list">
				<li><strong>Daily Food Logging</strong> - Add foods to your daily log and track what you eat</li>
				<li><strong>Weekly Statistics</strong> - View your weekly micronutrient intake with visual progress bars</li>
				<li><strong>Micronutrient Information</strong> - Learn about essential vitamins and minerals and their benefits</li>
				<li><strong>Category Filtering</strong> - Easily filter foods by category (vegetables, fruits, meat, fish)</li>
				<li><strong>Automatic Tracking</strong> - Your daily and weekly statistics reset automatically</li>
			</ul>
		</section>

		<section class="section">
			<h2>How to Use</h2>
			<ol class="instructions-list">
				<li><strong>Add Foods</strong> - Go to the "Add Food" page and click "Add" on any food item to include it in your daily log</li>
				<li><strong>View Your Log</strong> - Check the "Home" page to see all foods you've added today</li>
				<li><strong>Monitor Progress</strong> - Visit the "Stats" page to see your weekly micronutrient statistics</li>
				<li><strong>Learn More</strong> - Explore the "Info" page to read detailed information about each micronutrient</li>
			</ol>
		</section>
	</div>
</template>

<style scoped>
.about {
	padding: 2rem;
}
</style>