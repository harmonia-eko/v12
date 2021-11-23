<template>
<div><v-img
:src="require('~/assets/images/crabs.jpg')"
height="500"
>
{{/*this needs to be aligned bottom of the img*/}}
    <h1>About Us</h1></v-img>

<div class="container"><div><h2>We work hard to soothe our planet's fever with quality and affordable offsets.</h2>
    </div ><div>We see <strong>exotic CO2e offsets.</strong><br/>

We see their potential.<br/><br/>

To succeed in the climate fight we must <strong>widen our range of action.
<br/><br/>This is what we do.</strong><br/><br/>


As a bonus, we aim to provide <strong>seamless blockchain integration</strong> to enhance <strong>safety, reliability and scalability</strong>;<br/><br/>

And superior customer service 💪.</div>
    </div></div>
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
h1{
color:white;
font-size: 10em;
}
v-img{
align-items:bottom;
display:flex;
}

</style>
