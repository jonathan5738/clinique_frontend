import { Outlet } from "react-router";
import { useGSAP } from "@gsap/react";  
import { ScrollSmoother } from "gsap/ScrollSmoother";

export default function BlogPost(){
    useGSAP(() => {
        ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 2,
            smoothTouch: 0.1,
            effects: true
        })
    })
    return (
        <div id="smooth-wrapper">
            <div id="smooth-content">
                <Outlet/>
            </div>
        </div>
    )
}