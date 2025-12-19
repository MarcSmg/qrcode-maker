import React from 'react'
import { ChevronDown, CircleQuestionMark } from 'lucide-react'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header';
import '../styles/Landing.css'

function Landing() {

    const navigate = useNavigate();
    const handleNavigation = (link) => {
        navigate(link);
    }


    return (
        <>
            <div className='landing'>

                <Header />
                <section className='hero-sect'>
                    <h1>Créer une Passerelle Fluide entre le <span style={{color:"#0B67EE",}}>Réel</span> & le <span style={{color:"#0B67EE",}}>Virtuel</span></h1>
                    <p></p>
                    <div></div>
                    <div></div>
                </section>
                <section className='feat-sect'>

                </section>
                <section className='about-sect'>

                </section>
                <div>
                    <Button label='Go to dashboard' bgColor='#eff045' textColor='#000f45' radius='full' icon={"ChevronDown"} onClick={() => handleNavigation("/dashboard")} />
                </div>
            </div>
        </>
    )
}

export default Landing
