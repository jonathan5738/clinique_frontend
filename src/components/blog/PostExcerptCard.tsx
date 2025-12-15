import { Link } from "react-router";

export default function PostExcerptCard({
    id, excerptTitle, excerptBody, excerptImage
}: {id: number; excerptTitle: string; excerptBody: string; excerptImage: string;}) {
    return (
        <div className="post-excerpt-card" key={id}>
            <div className="post-excerpt-img">
                <img src={excerptImage} alt="" />
            </div>
            <div className="post-excerpt-text">
                <h2 className="post-excerpt-title">{excerptTitle}</h2>
                <span className="post-excerpt-sub">pediatry</span>
                <p>{excerptBody}</p>
                <Link to={`/blog/${id}`} className="post-excerpt-link">read more</Link>
                </div>
        </div>
    )
}


