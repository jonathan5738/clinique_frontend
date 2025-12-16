import { Link } from "react-router";

export default function RecentPostCard({
    id, excerptBody, excerptTitle, excerptImage,
    departmentName
}: {
    id: number;
    excerptTitle: string;
    excerptBody: string;
    excerptImage: string;
    departmentName: string;
}) {
    return (
        <div className="article-vert-card" key={id}>
            <div className="article-vert-card-img">
                <img src={excerptImage} alt="" />
            </div>
            <div className="article-vert-card-text">
                <h2 className="article-vert-card-title"><Link to={`/blog/${id}`}>{excerptTitle}</Link></h2>
                <span className="article-vert-card-sub">{departmentName}</span>
                <p>{excerptBody} </p>
            </div>
        </div>
    )
}