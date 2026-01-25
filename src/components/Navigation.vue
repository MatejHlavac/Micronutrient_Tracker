<script>
export default {
    name: 'Navigation'
}
</script>

<template>
    <nav class = "navigation">
        <RouterLink to = "/">Home</RouterLink>
        <RouterLink to = "/add">Foods</RouterLink>
        <RouterLink to = "/stats">Statistics</RouterLink>
        <RouterLink to = "/info">Info</RouterLink>
        <RouterLink to = "/about">About</RouterLink>
    </nav>
</template>

<style scoped>
.navigation {
	background: var(--color-background);
	padding: 1rem;
	border-bottom: 1px solid var(--color-border);
	display: flex;
	gap: 1rem;
	justify-content: center;
}

.navigation a {
	color: var(--color-text);
	text-decoration: none;
	padding: 0.5rem 1rem;
	border: 1px solid rgba(0, 0, 0, 0.2);
	background: rgba(255, 255, 255, 0.4);
	backdrop-filter: blur(20px) saturate(180%);
	border-radius: 12px;
	transition: all 0.2s;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.navigation a:hover {
	background: rgba(255, 255, 255, 0.6);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.navigation a.router-link-active {
	background: rgba(0, 0, 0, 0.6);
	color: var(--color-background);
	backdrop-filter: blur(20px) saturate(180%);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
</style>