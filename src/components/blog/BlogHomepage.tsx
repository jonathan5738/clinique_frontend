import CategoryCard from "./CategoryCard"
import FeatureArticleCard from "./FeatureArticleCard"
import PostExcerptCard from "./PostExcerptCard"
import RecentPostCard from "./RecentPostCard"
import RelatedArticleCard from "./RelatedArticleCard"
import "./BlogHomepage.css"

import {gsap} from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export default function BlogHomepage(){
    const scope = useRef<HTMLDivElement | null>(null);
    useGSAP(() => {
        const headerTimeline = gsap.timeline({
            defaults: {y: 40, opacity: 0}
        });
        const relatedTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".related-container",
                start: "top 80%"
            },
            defaults: {y: 40, opacity: 0}
        })
        const categoryTimeline = gsap.timeline({
            defaults: {y: 40, opacity: 0},
            scrollTrigger: {
                trigger: ".category-container",
                start: "20% 80%",
            }
        });
        const bannerTimeline = gsap.timeline({
            defaults: {y:40, opacity: 0},
            scrollTrigger: {
                trigger: ".banner-container",
                start: "30% 80%"
            }
        });
        const SpecTimeline = gsap.timeline({
            defaults: {y: 40, opacity: 0},
            scrollTrigger: {
                trigger: ".post-excerpt-container",
                start: "30% 80%"
            }
        })
        headerTimeline
            .from(".blog-header-title", {})
            .from(".blog-header-subtitle", {}, "-=.3")
            .from(".blog-header", {borderBottom: 0})
            .from(".recent-parent", {})
            .from(".article-vert-card", {stagger: .2})
            .from(".article-hor-card", {stagger: .2}, "-=.3")

        relatedTimeline
            .from(".related-img", {})
            .from(".related-posts", {})
            .from(".article-related-card", {stagger: .2})

        categoryTimeline
            .from(".category-card", {stagger: .2})
            .from(".category-img", {}, "-=.5");

        bannerTimeline
            .from(".banner-title", {})
            .from(".banner-para", {})

        SpecTimeline
            .from(".post-excerpt-card-img", {})
            .from(".post-excerpt-container-grid", {})
            .from(".post-excerpt-card", {stagger: {each: .2}}, "-=.3")

    }, {scope})

    return (
     <div className="blog-homepage" ref={scope}>
        <header className="container blog-header">
            <h1 className="blog-header-title">mere <span className="and">&</span> enfant</h1>
            <h2 className="blog-header-subtitle">Blog</h2>
        </header>
        <section className="container recent-parent">
            <section className="recent-container">
                <h3>Articles recent</h3>
                <div className="recent-container-grid">
                    <RecentPostCard/>
                    <RecentPostCard/>
                    <RecentPostCard/>
                </div>
            </section>
            <aside className="recent-aside-container">
                <h3>Features posts</h3>
                <FeatureArticleCard/> 
                <FeatureArticleCard/>
                <FeatureArticleCard/>
            </aside>
       </section>

     <section className="container related-container">
        <div className="related-img card-deco">
            <p>Related topics <br /> Discovery</p>
        </div>

        <div className="related-posts">
            <RelatedArticleCard/>
            <RelatedArticleCard/>
            <RelatedArticleCard/>
        </div>
     </section>

     <div className="container category-container">
          <div className="category-list">
            <CategoryCard categoryName="Cardiologie"/>
            <CategoryCard categoryName="Pediatrie"/>
            <CategoryCard categoryName="Medecine generale"/>
            <CategoryCard categoryName="Ophtamologie"/>
            <CategoryCard categoryName="Neurologie"/>
            <CategoryCard categoryName="Gynecologie"/>
            <CategoryCard categoryName="Conseilles de sage femme"/>
          </div>
          
          <div className="category-img card-deco">
             <p>Related topics <br /> Discovery</p>
          </div>
     </div>

        <div className="banner-container">
            <div className="container banner-text">
                <h2 className="banner-title">Lorem ipsum dolor</h2>
                <p className="banner-para">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Vitae, unde obcaecati? Expedita fugiat maiores id iste sunt,
                    ex voluptatum blanditiis quo
                    cum corrupti similique ipsum consequatur delectus mollitia exercitationem adipisci?</p>
            </div>
        </div>

            <div className="container post-excerpt-container">
                <div className="post-excerpt-card-img card-deco">
                    <p>Pediatrie</p>
                </div>
                <div className="post-excerpt-container-grid">
                    <PostExcerptCard/>
                    <PostExcerptCard/>
                    <PostExcerptCard/>
                    <PostExcerptCard/>
                </div>
            </div>
        </div>
    )
}