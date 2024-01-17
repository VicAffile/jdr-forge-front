<script setup lang="ts">
    // Script for rolling dice (4, 6, 8, 10, 12, 20, 100);

    import { ref } from 'vue';

    const dice = ref(0);
    const diceType = ref(0);

    const rollDice = () => {
        dice.value = Math.floor(Math.random() * diceType.value) + 1;
    }

    
</script>

<template>
    <main>
        <h1>
            Roll a dice
        </h1>

        <select v-model="diceType">
            <option value="4">D4</option>
            <option value="6">D6</option>
            <option value="8">D8</option>
            <option value="10">D10</option>
            <option value="12">D12</option>
            <option value="20">D20</option>
            <option value="100">D100</option>
        </select>

        <button @click="rollDice">Roll</button>

        <p v-if="dice">You rolled a {{ dice }}</p>
        
    </main>
</template> 