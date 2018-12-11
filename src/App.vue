<template>
    <div id="app">
        <Status></Status>
    </div>
</template>

<script>
    import Status from './components/Status.vue'

    export default {
        name: 'app',
        components: {
            Status
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 0px;
    }
</style>
