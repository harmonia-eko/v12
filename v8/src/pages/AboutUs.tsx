import React from 'react'
import Navbar from '../components/Navbar'

export default function AboutUs() {
    return (
        <div className='w-100' style={{backgroundImage:'url(/assets/images/crabs.jpg)',height:'100vh',backgroundSize:'auto 100%',backgroundRepeat:'no-repeat'}}>
            <Navbar/>
            <h1>About Us</h1>
            <div >
                <div>
                    <h2>We work hard to soothe our planet's fever with quality and affordable offsets.<br/>We designed an hybrid CO2 offset marketplace with both fiat and blockchain integration, enabling optimal user experience and overall reliability</h2>
                </div>
            <div>We see<strong>exotic CO2e offsets.</strong>
                <br/>We see their potential.<br/><br/>To succeed in the climate fight we must <strong>widen our range of action.<br/><br/>This is what we do.</strong><br/><br/>As a bonus, we aim to provide <strong>seamless blockchain integration</strong> to enhance <strong>safety, reliability and scalability</strong>;<br/><br/>And superior customer service 💪.</div>
            </div>
        </div>
    )
}
