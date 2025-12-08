import "./AdditionalInfo.css";
import SunSvg from "../../assets/img/fi-rr-sun.svg";
import SunRise from "../../assets/img/fi-rr-sunrise.svg";
import Moon from "../../assets/img/fi-rr-moon.svg";
import PhoneIcon from "../../assets/img/fi-rr-phone-call (1).svg";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

function AdditionalInfo() {
    const container = useRef<HTMLDivElement | null>(null)
    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".additional-info-container",
                start: "top 80%",
            }
        })
        tl
          .from(".additional-info-container span", {opacity: 0})
          .from(".additional-title", {y: 30, opacity: 0}, "-=.5")
          .from(".additional-info-para", {y: 30, opacity: 0, stagger: .2})
          .from(".additional-info-phone", {y: 40, opacity: 0}, "-=.5")
    }, {scope: container})
    return (
        <div style={{marginTop: "200px"}} className="additional-info-banner" ref={container}>
            <div className="additional-info-container"> 
            <span>Informations additionelles</span>
            <div className="additional-info-grid">
                <div>
                    <h3 className="additional-title">Heures des visites</h3>
                    <p className="additional-info-para"> <img src={SunSvg} className="additional-info-icon" alt="sun icon" /> Le matin de 6 à 7h</p>
                    <p className="additional-info-para"><img src={SunRise} className="additional-info-icon" alt="sun rise icon"/> L’apres midi de 12 à 14h</p>
                    <p className="additional-info-para"><img src={Moon} className="additional-info-icon" alt="moon icon"/>Le soir de 18 à 20h</p>
                </div>

                <div className="additional-info-phone">
                    <img src={PhoneIcon} className="additional-info-phone-icon" alt="phone icon"/>
                    <div>
                        <h3>Ambulance</h3>
                        <p><a href="tel:+242 05 530 06 92">+242 05 530 06 92</a></p>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}
export default AdditionalInfo;