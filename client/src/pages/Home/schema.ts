import { gql } from "@apollo/client";

const schema = {
    findRestaurants: gql`
        query Query($data: FindRestaurantsInput!) {
            findRestaurants(data: $data) {
                id
                name
                describe
                avatar
                address
                phone
                email
                longitude
                latitude
                ownerId
            }
        }
    `,
    reviews: gql`
        query Query {
            reviews {
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
};

export default schema;
