import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router";

export default function RelatedArticleCard({
    id,
    excerptBody,
    excerptImage, 
    excerptTitle,
    departmentName
}: {
    id: number;
    excerptTitle: string;
    excerptBody: string;
    excerptImage: string;
    departmentName: string;
}) {
    return (
        <div className="article-related-card" key={id}>
            <div className="article-related-card-img">
                <img src={excerptImage} alt="" />
            </div>
            <div className="article-related-card-text">
                <h2 className="article-related-card-title"><Link to={`/blog/${id}`}>{excerptTitle}</Link></h2>
                <span className="article-related-card-sub">{departmentName}</span>
                <p>{excerptBody}</p>
                <Link to={`/blog/${id}`} className="post-excerpt-link">En savoir plus <FiArrowRight/></Link>
            </div>
        </div>
    )
}