import { useParams } from "@remix-run/react";

function PostItem() {
    const params = useParams();
    return (
        <div>
            item {params.postId}
        </div>
    )
}

export default PostItem
