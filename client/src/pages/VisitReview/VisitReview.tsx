import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React from "react";
import {
    AiFillDislike,
    AiFillLike,
    AiOutlineDislike,
    AiOutlineLike,
} from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { MdChatBubble, MdChatBubbleOutline } from "react-icons/md";
import { RiSendPlaneLine } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import HtmlDisplay from "../../components/HtmlDisplay";
import getPathAvatar from "../../constant/getPathAvatar";
import { useAppSelector } from "../../redux";
import schema from "./schema";
import "./VisitReview.scss";

type Props = {};

function VisitReview({}: Props) {
    let { reviewId } = useParams<"reviewId">();
    const reviewIdNumber = React.useMemo(() => {
        try {
            return parseInt(reviewId || "");
        } catch (err) {
            return -1;
        }
    }, [reviewId]);

    const [fetchData, { data, loading }] = useLazyQuery(schema.review, {
        variables: {
            reviewId: reviewIdNumber,
        },
        fetchPolicy: "no-cache",
    });
    React.useEffect(() => {
        fetchData();
    }, []);
    const review: Review | null = React.useMemo(() => {
        if (!data) return null;
        return data.review;
    }, [data]);

    if (!review)
        return (
            <div className="NoReview">
                <h5>Không tìm thấy nội dung</h5>
            </div>
        );

    return (
        <div className="VisitReview">
            <h1 className="reviewTitle">{review.title}</h1>
            <div className="belowTitle">
                <InfoSpace onUpdate={fetchData} review={review} />
                <AuthorSpace review={review} />
            </div>
            <hr />
            <div className="text">
                <HtmlDisplay html={review.text} />
            </div>
            <hr />
            <CommentSpace review={review} onUpdate={fetchData} />
        </div>
    );
}

function CommentSpace({ review, onUpdate }: { review: Review; onUpdate: any }) {
    const { comments } = review;
    const [value, setValue] = React.useState("");
    const user = useAppSelector((state) => state.myAccount.user);
    const [callCreate, { data, loading, error }] = useMutation(
        schema.createComment,
        {
            variables: {
                data: {
                    reviewId: review.id,
                    text: value,
                },
            },
        }
    );

    async function handleSubmit() {
        toast.promise(handelCallCreate(), {
            pending: "Đang tải",
            error: {
                render: (res: any) => res?.data?.message,
            },
            success: "Đã gửi",
        });
    }

    async function handelCallCreate() {
        await callCreate();
        setValue("");
        onUpdate();
    }

    return (
        <div className="commentSpace">
            {user ? (
                <div className="myComment">
                    <div className="headSpace">
                        <div className="userSpace">
                            <img
                                src={getPathAvatar(user.avatar)}
                                className="avatar"
                                alt="avatar"
                            />
                            <div className="name">{user.name}</div>
                        </div>
                        <div className="submitBtn">
                            <button onClick={handleSubmit}>
                                <RiSendPlaneLine />
                            </button>
                        </div>
                    </div>
                    <div className="bodySpace">
                        <input
                            type="text"
                            className="cmtInput"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </div>
                </div>
            ) : (
                <div className="loginComment">
                    <Link to="/login">Đăng nhập để bình luận</Link>
                </div>
            )}
            <div className="listSpace">
                {comments.map((comment) => (
                    <CommentItem comment={comment} key={comment.id} />
                ))}
            </div>
        </div>
    );
}

function CommentItem({ comment }: { comment: Comment }) {

    return (
        <div className="CommentItem">
            <div className="userSpace">
                <img
                    src={getPathAvatar(comment.user.avatar)}
                    alt="avatar"
                    className="avatar"
                />
                <div className="name">{comment.user.name}</div>
            </div>
            <div className="text">{comment.text}</div>
        </div>
    );
}

function InfoSpace({ review, onUpdate }: { review: Review; onUpdate: any }) {
    const { votes, comments } = review;

    const myInfo = useAppSelector((state) => state.myAccount.user);
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

    const [isLiked, isDisliked, isCommented] = React.useMemo(() => {
        let liked = false;
        let disliked = false;
        let commented = false;
        votes.forEach((vote) => {
            if (vote.userId === myInfo?.id) {
                if (vote.value === 1) {
                    liked = true;
                } else {
                    disliked = true;
                }
            }
        });
        comments.forEach((comment) => {
            if (comment.userId === myInfo?.id) {
                commented = true;
            }
        });
        return [liked, disliked, commented];
    }, [comments, votes]);

    const [callCreateVote, { loading: loadingVote }] = useMutation(
        schema.createVote
    );
    async function handleCreateVote(value: number) {
        await callCreateVote({
            variables: {
                data: {
                    reviewId: review.id,
                    value: value,
                },
            },
        });
        onUpdate();
    }

    async function like() {
        await toast.promise(handleCreateVote(1), {
            pending: "Đang tải",
            error: {
                render: (res: any) => res?.data?.message,
            },
            success: "Đã đánh giá",
        });
    }

    async function dislike() {
        await toast.promise(handleCreateVote(-1), {
            pending: "Đang tải",
            error: {
                render: (res: any) => res?.data?.message,
            },
            success: "Đã đánh giá",
        });
    }

    return (
        <div className="infoSpace">
            <div className="space">
                <span className="value">{upVote}</span>
                <span className="icon" onClick={like}>
                    {isLiked ? <AiFillLike /> : <AiOutlineLike />}
                </span>
            </div>
            <div className="space">
                <span className="value">{downVote}</span>
                <span className="icon" onClick={dislike}>
                    {isDisliked ? <AiFillDislike /> : <AiOutlineDislike />}
                </span>
            </div>
            <div className="space">
                <span className="value">{comments.length}</span>
                <span className="icon">
                    {isCommented ? <MdChatBubble /> : <MdChatBubbleOutline />}
                </span>
            </div>
        </div>
    );
}

function AuthorSpace({ review }: { review: Review }) {
    const user = review.user;
    const myInfo = useAppSelector((state) => state.myAccount.user);

    const [callDelete, { data, loading, error }] = useMutation(
        schema.deleteReview
    );

    async function submitDelete() {
        await toast.promise(handleCallDelete(), {
            pending: "Đang thực hiện",
            error: {
                render: (res: any) => res?.data?.message,
            },
            success: "Xóa thành công",
        });
    }

    async function handleCallDelete() {
        const confirm = window.confirm("Bạn có muốn xóa bài viết này ?");
        if (!confirm) throw new Error("Bạn đã từ chối");
        if (confirm) {
            await callDelete({ variables: { deleteReviewId: review.id } });
        }
    }
    return (
        <div className="AuthorSpace">
            <div className="avatarAndName">
                <div className="name">{user.name}</div>
                <img
                    src={getPathAvatar(user.avatar)}
                    alt="avatar"
                    className="avatar"
                />
            </div>
            {myInfo && myInfo.id === user.id && (
                <span onClick={submitDelete} className="delete">
                    Xóa bài viết
                </span>
            )}
        </div>
    );
}

export default VisitReview;
