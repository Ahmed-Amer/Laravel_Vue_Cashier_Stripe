<template>
    <div class="container">
        <app-navbar></app-navbar>
        <router-view></router-view>
    </div>
</template>

<script>
import Navbar from './Navbar.vue';
    export default {
        components:{
            appNavbar : Navbar
        }
    }
</script>
