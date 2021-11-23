<template>
<div><v-img
:src="require('~/assets/images/tucan.jpg')"
height="500"
>

    <h1>About Us</h1></v-img>
<h2>Contact Details</h2>
<div class="container">
    <div class=container>
        <p>icon</p>
    
        <div class=vcontainer>
        <h2>
        Call Us</h2><p>+33970406998</p>
    </div>
    </div>
    <div class=container>
        <p>icon</p>
    
        <div class=vcontainer>
        <h2>
        Email Us</h2><p>contact@harmonia-eko.ooo</p>
    </div>
    </div>
    </div>
    </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    setup() {
        
    },

})
</script>
<style scoped>
.container {
    display:flex;
    flex-direction: row;
    font-size: large;
    width: 50%;
    font-size: 1.7em;
}
.vcontainer {
    display:flex;
    flex-direction:column;
    font-size: large;
    width: 50%;
    font-size: 1em;
}
h1{
color:white;
font-size: 10em;
}
v-img{
align-items:bottom;
display:flex;
}
h2{
    text-align:center;
}
</style>
