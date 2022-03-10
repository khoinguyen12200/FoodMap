import { useQuery } from "@apollo/client";
import React from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { MdChatBubbleOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import HtmlDisplay from "../../components/HtmlDisplay";
import schema from "./schema";

type Props = {};

function ListReview({}: Props) {
    const { data, loading } = useQuery(schema.reviews, {
        fetchPolicy: "no-cache",
    });

    const reviews: Review[] = React.useMemo(() => {
        let arr: Array<Review> = [];
        if (data) {
            arr = arr.concat(data.reviews);
        }
        arr = arr.slice(0, 10);
        arr.sort((a, b) => b.id - a.id);
        return arr;
    }, [data]);

    return (
        <div className="ListReview">
            <div className="header">Bài viết nổi bật</div>
            <div className="listContent">
                {reviews.map((review, index) => (
                    <Review review={review} key={review.id} />
                ))}
            </div>
        </div>
    );
}

function Review({ review }: { review: Review }) {
    const { votes, comments } = review;
    const [upVote, downVote] = React.useMemo(() => {
        let up = 0;
        let down = 0;
        votes.forEach((vote) => {
            if (vote.value === 1) {
                up++;
            } else {
                down++;
            }
        });
        return [up, down];
    }, [votes]);

    return (
        <Link to={`/visit/review/${review.id}`} className="reviewItem">
            <div className="title">{review.title}</div>
            <div className="text">
                <HtmlDisplay html={review.text} />
            </div>
            <div className="footSpace">
                <div className="space1">
                    <div className="space">
                        <span className="value">{upVote}</span>
                        <span className="icon">
                            <AiOutlineLike />
                        </span>
                    </div>
                    <div className="space">
                        <span className="value">{downVote}</span>
                        <span className="icon">
                            <AiOutlineDislike />
                        </span>
                    </div>
                    <div className="space">
                        <span className="value">{comments.length}</span>
                        <span className="icon">
                            <MdChatBubbleOutline />
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ListReview;
