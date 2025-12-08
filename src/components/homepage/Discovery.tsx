import "./Discovery.css"
import DiscoveryImgage from "../../assets/img/Group 6 (1).png";
import { useGSAP } from "@gsap/react";
import {gsap} from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
function Discovery (){
    const container = useRef(null);
    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".discovery-container",
                start: "20% 80%",
            },
            defaults: {
                ease: "back.out"
            }
        })
        const title = SplitText.create(".discovery-text h3", {type: "lines"});
        tl.from(title.lines, {y: 30, opacity: 0, stagger: .2})
          .from("#discovery-para", {y: 30, opacity: 0}, "-=.5")
          .from(".discovery-img-container", {y: 30, opacity: 0})
    }, {scope: container})
    return (
        <div style={{position: "relative"}} className="discovery-banner" id="discovery-banner" ref={container}>
            <div className="discovery-container">
                <div className="discovery-text">
                    <h3 id="discovery-title">Venez découvrir <br />notre équipe <br />incroyable</h3>
                    <p id="discovery-para">Depuis ses débuts, la Polyclinique Mère et Enfant s’appuie sur une équipe 
                        de médecins et d’infirmiers passionnés, dont beaucoup sont présents depuis 
                        de nombreuses années. Leur fidélité et leur engagement témoignent 
                        d’un attachement profond à la clinique et à ses patients</p>
                </div>

                <div className="discovery-img-container">
                    <img src={DiscoveryImgage} alt="" />
                </div>
            </div>
        </div>
    )
}
export default Discovery;