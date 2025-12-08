import "./AboutPage.css"
import InfirmierImage from "../../assets/img/Group 9.svg"
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
function AboutPage(){
    const container = useRef<HTMLDivElement | null>(null);
    let yPos = 40;
    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".about-container",
                start: "30% 80%"
            }
        })
        tl.from(".about-text h3", {y: yPos, opacity: 0})
           .from("#about-para", {y: yPos, opacity: 0})
           .from(".about-img-container", {y: yPos, opacity: 0}, "-=.3")
    }, {scope: container})
    return (
        <div className="#about about-container" ref={container}>
            <div className="about-text">
                <h3 className="about-title">Notre histoire</h3>
                 <p id="about-para">Depuis plus de 24 ans, la Polyclinique Mère et Enfant 
                    accompagne les familles avec professionnalisme et bienveillance. 
                    Fidèle à son équipe et à ses patients depuis ses débuts, elle s’est construite sur la confiance et la stabilité. Nos spécialités  de la gynécologie à la pédiatrie, en passant par la chirurgie et l’ophtalmologie  et plus encore s’inscrivent dans une approche globale de la santé, portée par des
                     valeurs humaines qui demeurent notre véritable force.</p>
            </div>
            <div className="about-img-container">
                <img className="about-img" src={InfirmierImage} alt="" />
            </div>
        </div>
    )
}

export default AboutPage;