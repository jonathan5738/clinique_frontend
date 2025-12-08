import { useGSAP } from "@gsap/react";
import { gsap} from "gsap";
import { useRef } from "react";


function SubNavigation (){
    const container = useRef<HTMLDivElement | null>(null);
    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".subnavigation-container",
                start: "top 80%",
            },
            defaults: {
                duration: .5
            }
        })
        tl.from(".subnav-title", {y: 30, opacity: 0})
          .from(".subnav-item", {y: 30, opacity: 0, stagger: {each: .2}}, "-=0.5")
    }, {scope: container})

    return (
        <div className="subnavigation-container" ref={container}>
            <p className="subnav-title">NAVIGATION</p>
            <ul className="subnav-menu">
                <li className="subnav-item"><a href="#">Nos specialites et services</a></li>
                <li className="subnav-item"><a href="#">Nous contactez</a></li>
                <li className="subnav-item"><a href="#">Notre histoire</a></li>
                <li className="subnav-item"><a href="#">Evenements</a></li>
                <li className="subnav-item"><a href="/blog">Notre Blog</a></li>
            </ul>
        </div>
    )
}

export default SubNavigation;