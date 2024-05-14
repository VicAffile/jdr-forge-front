<script setup lang="ts">
type DiceResult = {
    quantity: number;
    type: {
        name: string;
        value: number;
    };
    rolls: number[];
    total: number;
}

const props = defineProps<{
    diceResults: DiceResult[];
    handleClose: () => void;
}>();
</script>

<template>
    <div class="modal" v-if="props.diceResults.length">
        <div class="modal__container">
            <div class="modal__content">
                <div class="modal__content-header">
                    <h2 class="modal__content-title">
                        Results
                    </h2>
                    <div @click="handleClose" class="modal__content-close">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
                <div class="modal__content-results">
                    <div class="modal__content-result" v-for="result in props.diceResults" :key="result.type.name">
                        <p>
                            {{ result.quantity }}x{{ result.type.name }} = {{ result.total }}
                        </p>
                    </div>
                </div>
                <!-- Total -->
                <div class="modal__content-result-title">
                    Total: {{ props.diceResults.reduce((acc, curr) => acc + curr.total, 0) }}
                </div>
            </div>
            <div class="modal__background" @click="handleClose"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.modal {
    width: 100%;
    height: 100vh;

    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
}

.modal__container {
    width: 100%;
    height: 100%;

    position: relative;
}

.modal__content-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.modal__content-close {
    width: 24px;
    height: 24px;

    background-color: #000000;

    border-radius: 4px;

    cursor: pointer;

    svg {
        width: 100%;
        height: 100%;

        fill: #fff;
    }
}

.modal__content {
    width: 100%;
    max-width: 300px;

    position: absolute;
    z-index: 1001;
    top: 50%;
    left: 50%;

    padding: 20px;

    background-color: white;

    border-radius: 5px;
    transform: translate(-50%, -50%);

    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

    h2 {
        margin-bottom: 10px;

        color: #000;

        font-size: 2rem;
    }

    ul {
        display: flex;
        flex-direction: column;
        gap: 10px;

        list-style: none;
    }

    p {
        color: #000;
    }
}

.modal__content-result-title {
    margin-top: 20px;

    color: #000;

    font-size: 1.5rem;
}

.modal__background {
    width: 100%;
    height: 100%;

    position: absolute;
    top: 0;
    left: 0;

    background-color: rgba(0, 0, 0, 0.5);
}
</style>