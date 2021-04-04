<template>
    <div class="board">
        <component v-bind:is="currentTabComponent"></component>
    </div>
</template>

<script>
import Book from '@/components/main/Book.vue'
export default {
    data() {
        return {
            currentTabComponent: Book,
        }
    },
    components: {
        Book,
    }
}
</script>

<style scoped>
.board{
    position: relative;
    border:3px rgba(137, 207, 240, 0.8) solid;
    width: 900px;
    background-color: rgba(225, 225, 225, 0.5);
    height:670px;
}

</style>
