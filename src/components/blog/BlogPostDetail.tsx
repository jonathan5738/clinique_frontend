import Markdown from "react-markdown";
import { useParams } from "react-router";
import remarkGfm from "remark-gfm";
import { useGetOneBlogPostQuery } from "../../api";


function BlogPostDetail(){
    const {blogId} = useParams();
    const {data, isFetching, isSuccess, isLoading} = useGetOneBlogPostQuery(blogId!);
    let content;
    if(isFetching || isLoading){
        content = (
          <div>loading...</div>
        )
    } else if(isSuccess){
        content = <Markdown remarkPlugins={[remarkGfm]}>{data.content}</Markdown>
    } else {
        content = <p>something went wrong</p>
    }
    return (
        <div className="blog-post">
            {content}
        </div>
    )
}
export default BlogPostDetail;