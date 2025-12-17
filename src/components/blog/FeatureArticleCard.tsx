import { Link } from "react-router";

export default function FeatureArticleCard({
    id, 
    speciality, 
    excerptBody, 
    excerptTitle, 
    excerptImage
 }: {    
    id: number;
    excerptTitle: string;
    excerptImage: string;
    excerptBody: string;
    speciality: string;
}) {
    return (

        <div className="article-hor-card" key={id}>
            <div className="article-hor-card-img">
                <img src={excerptImage} alt="" />
            </div>
            <div className="article-hor-card-text">
                <h2 className="article-hor-card-title"><Link to={`/blog/${id}`}>{excerptTitle}</Link></h2>
                <span className="article-hor-card-sub">{speciality}</span>
                <p className="article-hor-card-para">{excerptBody}</p>
            </div>
        </div>
    )
}