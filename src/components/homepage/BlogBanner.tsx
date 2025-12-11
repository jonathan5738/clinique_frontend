import { useGSAP } from "@gsap/react"
import {gsap} from "gsap"
import { SplitText } from "gsap/SplitText"
import "./BlogBanner.css"
import { FiArrowRight } from "react-icons/fi"
import { Link } from "react-router"
export default function BlogBanner(){
    useGSAP(() => {
        const title = SplitText.create(".blog-banner-title", {type: "lines"});
        const tl = gsap.timeline();
        tl
            .from(".blog-banner-span", {y: 30, opacity: 0})
            .from(title.lines, {y: 40, opacity: 0, stagger: .2})
    })
    return (
        <div className="blog-banner-container">
            <div className="blog-banner-text">
                <p className="blog-banner-span">pour obtenir davantage de conseils médicaux.</p>
                <h2 className="blog-banner-title">CONSULTER <br /> NOTRE BLOG</h2>
                <Link to="/blog" className="blog-banner-link">Visiter notre blog <FiArrowRight size={20}/></Link>
            </div>
        </div>
    )
}