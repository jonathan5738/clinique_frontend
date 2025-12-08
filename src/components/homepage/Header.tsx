import "./Header.css"
import SubNavigation from "./SubNavigation";
import { SplitText } from "gsap/SplitText";
import {gsap} from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

function Header(){
    const currentYear = new Date().getFullYear();
    const container = useRef<HTMLDivElement | null>(null);
    useGSAP(() => {
        const title = SplitText.create(".header-title", {type: "lines"})
        const tl = gsap.timeline();
        tl
            .from(title.lines, {y: 50, opacity: 0, stagger: .2})
            .from(".header-description", {y: 50, opacity: 0})
    }, {scope: container})
    return (
        <>
        <div className="header-container" ref={container}>
            <div className="header-text-content">
                <h1 className="header-title">Polyclinque <br /> Mere et Enfants</h1>
                <p className="header-description"><span>{currentYear - 2001} ans</span> de soins et de confiance à vos côtés</p>
            </div>
        </div>
        <SubNavigation/>
        </>
    )
}

export default Header;