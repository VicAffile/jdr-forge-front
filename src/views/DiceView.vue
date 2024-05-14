<script setup lang="ts">
import ModalDiceResult from '@/components/ModalDiceResult.vue';

import { ref } from 'vue';

type DiceResult = {
    quantity: number;
    type: {
        name: string;
        value: number;
    };
    rolls: number[];
    total: number;
}

const diceTypes = ref([
    {
        name: 'D4',
        value: 4
    },
    {
        name: 'D6',
        value: 6
    },
    {
        name: 'D8',
        value: 8
    },
    {
        name: 'D10',
        value: 10
    },
    {
        name: 'D12',
        value: 12
    },
    {
        name: 'D20',
        value: 20
    },
    {
        name: 'D100',
        value: 100
    }
]);

const diceConfig = ref([
    {
        quantity: 1,
        type: diceTypes.value[0],
    }
]);

const diceResults = ref<DiceResult[]>([]);

const addRoll = () => {
    diceConfig.value.push({
        quantity: 1,
        type: diceTypes.value[0],
    });
}

const removeRoll = (index: number) => {
    diceConfig.value.splice(index, 1);
}

const rollDice = () => {
    if (diceConfig.value.length === 0) {
        alert('Veuillez ajouter au moins un dé');
    }

    const result = diceConfig.value.map((dice) => {
        const rolls = [];

        for (let i = 0; i < dice.quantity; i++) {
            rolls.push(Math.floor(Math.random() * dice.type.value) + 1);
        }

        return {
            ...dice,
            rolls,
            total: rolls.reduce((acc, curr) => acc + curr, 0)
        }
    });

    diceResults.value = result;
}

const handleClose = () => {
    diceResults.value = [];
}
</script>

<template>
    <main>
        <section class="dice-roller">
            <div class="dice-roller__container">
                <div class="dice-roller__config">
                    <h2 class="dice-roller__config-title">
                        Configurateur
                    </h2>
                    <div class="dice-roller__config-container">
                        <div class="dice-roller__config-table">
                            <div class="dice-roller__config-table-top">
                                <span>
                                    Quantité
                                </span>
                                <span>
                                    Les dés
                                </span>
                                <span>
                                    Action
                                </span>
                            </div>
                            <div v-for="dice, index in diceConfig" :key="index" class="dice-roller__config-table-row">
                                <input type="number" id="dice-quantity" v-model="dice.quantity" />
                                <select id="dice-type" v-model="dice.type">
                                    <option v-for="type, diceIndex in diceTypes" :key="diceIndex" :value="type">
                                        {{ type.name }}
                                    </option>
                                </select>
                                <div class="dice-roller__config-table-row-action">
                                    <button class="dice-roller__config-table-row-action--remove" @click="removeRoll(index)">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div class="dice-roller__config-table-row-actions">
                                <button @click="addRoll">
                                    Ajouter un dé
                                </button>
                                <button @click="rollDice">
                                    Lancer les dés
                                </button>
                            </div>
                        </div>
                        <div class="dice-roller__config-animation"></div>
                    </div>
                </div>
            </div>
        </section>
    </main>
    <ModalDiceResult :diceResults="diceResults" :handleClose="handleClose" />
</template>

<style lang="scss" scoped>
.dice-roller {
    padding: 50px 0;

    .dice-roller__container {
        width: 90%;
        max-width: 1200px;

        margin: 0 auto;
    }

    .dice-roller__config {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .dice-roller__config-title {
        font-size: 2.5rem;
    }

    .dice-roller__config-container {
        display: flex;
        gap: 50px;

        > * {
            flex: 1;
        }
    }

    .dice-roller__config-table {
        display: flex;
        flex-direction: column;
        gap: 10px;


    }

    .dice-roller__config-table-top {
        display: flex;
        gap: 10px;

        padding-bottom: 5px;

        border-bottom: 1px solid #fff;

        > * {
            flex: 1;

            &:not(:first-child) {
                padding-left: 20px;
            }
        }
    }

    .dice-roller__config-table-row {
        display: flex;
        gap: 10px;

        > * {
            width: calc(100% / 3);
            flex: 1;
        }

        input {
            padding: 5px;

            color: #000;
            background-color: #fff;

            border: 1px solid #ccc;
            border-radius: 5px;

            font-size: 1rem;
        }

        select {
            padding: 5px;

            color: #000;
            background-color: #fff;

            border: 1px solid #ccc;
            border-radius: 5px;

            & option {
                color: #000;
                background-color: #fff;
            }
        }

        select:focus {
            outline: none;
        }
    }

    .dice-roller__config-table-row-action {
        display: flex;
        align-items: center;
    }

    .dice-roller__config-table-row-action--remove {
        width: 30px;
        height: 30px;

        color: #fff;
        background-color: #ff0000;

        border: none;
        border-radius: 5px;

        padding: 5px;

        cursor: pointer;

        svg {
            width: 100%;
            height: 100%;
        }
    }

    .dice-roller__config-table-row-actions {
        display: flex;
        gap: 10px;

        button {
            padding: 10px;

            color: #fff;
            background-color: #000;

            border: none;
            border-radius: 5px;

            cursor: pointer;

            transition: background-color 0.3s;

            &:hover {
                background-color: #0c0c0c;
            }
        }
    }

    .dice-roller__config-animation {
        height: 500px;

        display: flex;
        align-items: center;
        justify-content: center;

        background-color: #ccc;
        border: 1px solid black;
    }
}
</style>