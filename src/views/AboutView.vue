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
				<li><strong>Category Filtering</strong> - Easily filter foods by category (vegetables, fruits, meat, fish) or micronutrients by type (vitamins, minerals)</li>
				<li><strong>Automatic Tracking</strong> - Your daily and weekly statistics reset automatically</li>
			</ul>
		</section>

		<section class="section">
			<h2>How to Use</h2>
			<ol class="instructions-list">
				<li><strong>Add Foods</strong> - Go to the "FOODS" page and click the green "+" button on any food item to add it to your daily log</li>
				<li><strong>View Your Log</strong> - Check the "HOME" page to see all foods you've added today</li>
				<li><strong>Monitor Progress</strong> - Visit the "STATISTICS" page to see your weekly micronutrient statistics with visual progress bars</li>
				<li><strong>Learn More</strong> - Explore the "INFO" page to read detailed information about each micronutrient</li>
			</ol>
		</section>
	</div>
</template>

<style scoped>
.about {
	padding: 2rem;
	padding-top: 0.5rem;
	max-width: 800px;
	margin: 0 auto;
}

.header {
	text-align: center;
	margin-bottom: 3rem;
}

.header h1 {
	font-size: 2rem;
	margin-bottom: 1rem;
	color: var(--color-text);
}

.subtitle {
	font-size: 1.1rem;
	color: var(--color-text-secondary);
	line-height: 1.6;
}

.section {
	margin-bottom: 6rem;
}

.section h2 {
	font-size: 1.5rem;
	margin-bottom: 1rem;
	color: var(--color-text);
	border-bottom: 1px solid var(--color-border);
	padding-bottom: 0.5rem;
	text-align: center;
}

.section p {
	font-size: 1rem;
	line-height: 1.8;
	color: var(--color-text-secondary);
	margin-bottom: 1rem;
}

.features-list,
.instructions-list {
	margin: 0;
	padding-left: 1.5rem;
}

.features-list li,
.instructions-list li {
	font-size: 1rem;
	line-height: 1.8;
	color: var(--color-text-secondary);
	margin-bottom: 0.75rem;
}

.features-list li strong,
.instructions-list li strong {
	color: var(--color-text);
	font-weight: 600;
}
</style>