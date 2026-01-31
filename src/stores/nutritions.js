import { defineStore } from "pinia"
import foodsData from '@/data/foods.json'


export const useNutritionStore = defineStore('nutrition', {

    state() {
        return {
            dailyFoods: [],
            dailyStats: {}, 
            weeklyStats: {}, 
            lastActiveDate: null,
            lastActiveWeek: null, 
            weeklyHistory: {}

        }
    },

    actions: {
        addFood(foodId) {
            this.dailyFoods.push(foodId)
            
            const food = foodsData.find(food => food.id === foodId)

            if (food && food.micronutrients) {
                this.updateDailyStats()
                this.addToWeeklyStats(food.micronutrients)
            }

            this.saveToLocalStorage()
        },




        removeFood(foodId) {
            const index = this.dailyFoods.findIndex(id => id === foodId)

            if (index !== -1) {
                const food = foodsData.find(food => food.id === foodId)

                if (food && food.micronutrients) {
                    this.removeFromWeeklyStats(food.micronutrients)
                }

                this.dailyFoods.splice(index, 1)
                this.updateDailyStats()
            }

            this.saveToLocalStorage()
        },





        updateDailyStats() {
            this.dailyStats = {}
            
            this.dailyFoods.forEach(foodId => {
                const food = foodsData.find(f => f.id === foodId)
                
                if (food && food.micronutrients) {
                    Object.keys(food.micronutrients).forEach(nutrientId => {
                        const points = food.micronutrients[nutrientId]
                        
                        if (this.dailyStats[nutrientId]) {
                            this.dailyStats[nutrientId] += points
                        } else {
                            this.dailyStats[nutrientId] = points
                        }
                    })
                }
            })
        },




        addToWeeklyStats(micronutrients) {
            Object.keys(micronutrients).forEach(nutrientId => {
                const points = micronutrients[nutrientId]

                if (this.weeklyStats[nutrientId]) {
                    this.weeklyStats[nutrientId] += points
                } else {
                    this.weeklyStats[nutrientId] = points
                }
            })
        },




        removeFromWeeklyStats(micronutrients) {
            Object.keys(micronutrients).forEach(nutrientId => {
                const points = micronutrients[nutrientId]
                
                if (this.weeklyStats[nutrientId]) {
                    this.weeklyStats[nutrientId] -= points
                    if (this.weeklyStats[nutrientId] <= 0) {
                        delete this.weeklyStats[nutrientId]
                    }
                }
            })
        },



        
        saveToLocalStorage() {
            const data = {
                dailyFoods: this.dailyFoods,
                dailyStats: this.dailyStats,
                weeklyStats: this.weeklyStats,
                lastActiveDate: this.lastActiveDate,
                lastActiveWeek: this.lastActiveWeek,
                weeklyHistory: this.weeklyHistory
            }

            localStorage.setItem('nutritionStore', JSON.stringify(data))
        },


        loadFromLocalStorage() {
            const savedData = localStorage.getItem('nutritionStore')

            if (savedData) {
                const data = JSON.parse(savedData)

                this.dailyFoods = data.dailyFoods || []
                this.dailyStats = data.dailyStats || {}
                this.weeklyStats = data.weeklyStats || {}
                this.lastActiveDate = data.lastActiveDate || null
                this.lastActiveWeek = data.lastActiveWeek || null
                this.weeklyHistory = data.weeklyHistory || {}
            }
        },


        initialize() {
            this.loadFromLocalStorage()

            const today = new Date().toISOString().split('T')[0]

            if (this.lastActiveDate !== today) {
                if (this.lastActiveDate !== null) {
                    this.weeklyHistory[this.lastActiveDate] = this.historyItem
                    if (Object.keys(this.weeklyHistory).length > 7) {
                        const oldestKey = Object.keys(this.weeklyHistory).sort()[0]
                        delete this.weeklyHistory[oldestKey]
                    }
                }
                this.dailyFoods = []
                this.dailyStats = {}
                this.lastActiveDate = today
            }

            const currWeek = this.getWeekKey(new Date())
            if (this.lastActiveWeek !== currWeek) {
                this.weeklyStats = {}
                this.lastActiveWeek = currWeek
            }

            this.saveToLocalStorage()
        },



        getWeekKey(date) {
            const d = new Date(date)
            const dayInMil = 86400000
            d.setHours(0, 0, 0, 0)
            d.setDate(d.getDate() + 4 - (d.getDay() || 7))
            const yearStart = new Date(d.getFullYear(), 0, 1)
            const weekNum = Math.ceil((((d - yearStart) / dayInMil) + 1 ) / 7)
            return `${d.getFullYear()}-W${weekNum.toString().padStart(2, '0')}`
 
        }
    },

    getters: {
        historyItem() {
            return { foods: [...this.dailyFoods], stats: { ...this.dailyStats } }
        }
    }


})