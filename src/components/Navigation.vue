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
        background: #f5f5f5;
        padding: 1rem;
        border-bottom: 1px solid #ddd;
        display: flex;
        gap: 1rem;
        justify-content: center;
    }
    
    .navigation a {
        color: #333;
        text-decoration: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        transition: background 0.3s;
    }
    
    .navigation a:hover {
        background: #e0e0e0;
    }
    
    .navigation a.router-link-active {
        background: #42b983;
        color: white;
    }
    </style>