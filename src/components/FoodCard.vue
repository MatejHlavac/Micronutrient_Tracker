<script>
export default {
    name: 'FoodCard',
    props: {
        foodItem: {
            type: Object, 
            required: true
        }
    }
}
</script>

<template>
    <div class = "food-card">
        <h3>{{ foodItem.name }}</h3>
        <p class = "category">{{ foodItem.category }}</p>
    </div>
</template>

<style scoped>
    .food-card {
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 1rem;
        background: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .food-card h3 {
        margin: 0 0 0.5rem 0;
        font-size: 1.2rem;
    }
    
    .food-card .category {
        margin: 0;
        color: #666;
        font-size: 0.9rem;
        text-transform: capitalize;
    }
    </style>