<script>
export default {
    name: 'Navigation'
}
</script>

<template>
    <nav class = "navigation">
        <div class = "nav-container">
            <RouterLink to = "/">HOME</RouterLink>
            <RouterLink to = "/add">FOODS</RouterLink>
            <RouterLink to = "/stats">STATISTICS</RouterLink>
            <RouterLink to = "/info">INFO</RouterLink>
            <RouterLink to = "/about">ABOUT</RouterLink>
        </div>
    </nav>
</template>

<style scoped>
.navigation {
	display: flex;
	justify-content: center;
	padding: 1rem;
}

.nav-container {
	background: #d3d363;
	border-radius: 10px;
	padding: 0.5rem;
	display: flex;
	gap: 0.5rem;
	justify-content: space-evenly;
	align-items: center;
}

.navigation a {
	color: var(--color-text);
	text-decoration: none;
	padding: 0.75rem 1.5rem;
	border-radius: 10px;
	transition: background 0.2s;
	flex: 1;
	text-align: center;
	font-weight: 500;
}

.navigation a:hover {
	background: #dedea3;
}

.navigation a.router-link-active {
	background: #e4e49f;
}
</style>