import { gql } from "@apollo/client";

export default class schema {
    public static createReview: any = gql`
        mutation CreateReview($data: ReviewInput!) {
            createReview(data: $data) {
                id
                userId
                text
            }
        }
    `;
}
