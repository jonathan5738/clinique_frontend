import AboutPage from "../components/homepage/AboutPage";
import AdditionalInfo from "../components/homepage/AdditionalInfo";
import BlogBanner from "../components/homepage/BlogBanner";
import Carousel from "../components/homepage/Carousel";
import ContactPage from "../components/homepage/ContactPage";
import Discovery from "../components/homepage/Discovery";
import Header from "../components/homepage/Header";
import Specialites from "../components/homepage/Specialities";

import { useGSAP } from "@gsap/react";  
import { ScrollSmoother } from "gsap/ScrollSmoother";

export default function Homepage(){
    useGSAP(() => {
        ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 2,
            smoothTouch: 0.1,
            effects: true
        });
    })
    return (
        <div id="smooth-wrapper">
            <div id="smooth-content"> 
                <Header/>
                <Carousel/>
                <AboutPage/>
                <Discovery/>
                <Specialites/>
                <AdditionalInfo/>
                <ContactPage/>
                <BlogBanner/>
            </div>
        </div>
    )
}