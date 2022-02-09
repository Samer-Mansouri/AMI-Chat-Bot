import React from 'react'
import FadeIn from 'react-fade-in';
import Comp from '../Components/Comp';


function Home() {


    return (
        <>
        <div className="banner p-5">
            <div className="myText mt-5 mb-5">                        
                    <FadeIn transitionDuration="1000">
                        <h1 style={{color:"#dc2039"}} className="mb-3">Bienvenue,</h1>
                        <h5>Ceci est notre nouvelle Appliaction Web, <br/> qui se résume en un ChatBot qui va répondre a tout vos questions.</h5>
                        <h6 className="mt-4">Le but principale de cet Application est d'améliorer notre expérience client.</h6>
                    </FadeIn>
            </div>
        </div>
        
        <div className="mt-5 container" >
        <hr className="mb-4" style={{color:"#dc2039"}}/>
        <FadeIn  transitionDuration="1000">
            <h3 className="mb-3" style={{color:"#dc2039"}}>Pourquoi nous choisir?</h3>
        </FadeIn>
           <FadeIn  transitionDuration="1000">
           <div className="row gx-5 gy-5" style={{textAlign: "center"}}>
               <Comp title="ÉCOUTE"
               description="Nous sommes avant tout là pour entendre vos besoins et vos attentes afin de mettre en place, avec vous, la stratégie d'accompagnement la plus adaptée."
               size="3"
               size1="6"/>
               <Comp title="EXPERTISE" description="Nous sommes avant tout là pour entendre vos besoins et vos attentes afin de mettre en place, avec vous, la stratégie d'accompagnement la plus adaptée."
               size="3"
               size1="6"/>
               <Comp title="ADAPTABILITÉ" description="Nous sommes avant tout là pour entendre vos besoins et vos attentes afin de mettre en place, avec vous, la stratégie d'accompagnement la plus adaptée."
               size="3"
               size1="6"/>
               <Comp title="EXPÉRIENCE" description="Nous sommes avant tout là pour entendre vos besoins et vos attentes afin de mettre en place, avec vous, la stratégie d'accompagnement la plus adaptée."
               size="3"
               size1="6"/>


                
            </div>
           </FadeIn>
        </div>
        <div className="mt-5 container" >
        <hr className="mb-4" style={{color:"#dc2039"}}/>
        <FadeIn  transitionDuration="1000">
            <h3 className="mb-3" style={{color:"#dc2039"}}>Nos Valeurs</h3>
        </FadeIn>
           <FadeIn  transitionDuration="1000">
           <div className="row gx-5 gy-5" style={{textAlign: "center"}}>
               <Comp title="CRÉATIVITÉ" description="Nous sommes avant tout là pour entendre vos besoins et vos attentes afin de mettre en place, avec vous, la stratégie d'accompagnement la plus adaptée."
               size="4"
               size1="6"/>
               <Comp title="EXCELLENCE" description="Nous sommes avant tout là pour entendre vos besoins et vos attentes afin de mettre en place, avec vous, la stratégie d'accompagnement la plus adaptée."
               size="4"
               size1="6"/>
               <Comp title="RESPECT" description="Nous sommes avant tout là pour entendre vos besoins et vos attentes afin de mettre en place, avec vous, la stratégie d'accompagnement la plus adaptée."
               size="4"
               size1="6"/>

                
            </div>
           </FadeIn>


        </div>
        </>
    )
}

export default Home