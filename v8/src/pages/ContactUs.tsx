import React from 'react'
import Navbar from '../components/Navbar'
export default function ContactUs() {
    return (
        <div className="w-100" style={{height:'100vh',backgroundImage:'url(/assets/images/tucan.jpg)',backgroundSize:'auto 100%'}}>
            <Navbar/>
            <h1>Contact Details</h1>
            <div >
                <div>
                    <p>icon</p>
                    <div>
                        <h2>Call Us</h2>
                        <p>+33970406998</p>
                    </div>
                </div>
                    <div >
                        <p>icon</p>
                        <div >
                            <h2>Email Us</h2>
                            <p>contact@harmonia-eko.ooo</p>
                        </div>
                    </div>
                </div>
        </div>
    )
}
