import { gql } from "@apollo/client";

const schema = {
    review: gql`
        query Review($reviewId: Float!) {
            review(id: $reviewId) {
                id
                user {
                    name
                    avatar
                    id
                }
                title
                text
                comments {
                    user {
                        account
                        name
                        avatar
                        email
                    }
                    text
                }
                votes {
                    value
                    userId
                }
            }
        }
    `,

    deleteReview: gql`
        mutation Mutation($deleteReviewId: Float!) {
            deleteReview(id: $deleteReviewId)
        }
    `,

    createVote: gql`
        mutation CreateVote($data: CreateVoteInput!) {
            createVote(data: $data) {
                id
            }
        }
    `,
    createComment: gql`
        mutation CreateComment($data: CreateCommentInput!) {
            createComment(data: $data) {
                id
            }
        }
    `,
};

export default schema;
