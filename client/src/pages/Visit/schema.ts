import { gql } from "@apollo/client";

const schema = {
    findRestaurants: gql`
        query FindRestaurants($data: FindRestaurantsInput!) {
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
                victuals {
                    id
                    name
                    describe
                    price
                    avatar
                }
                ratings{
                    star
                }
            }
        }
    `,
    getRatings: gql`
        query GetRatings($restaurantId: Float!) {
            getRatings(restaurantId: $restaurantId) {
                id
                comment
                star
                user {
                    id
                    account
                    password
                    name
                    avatar
                    email
                    address
                    phone
                }
                userId
            }
        }
    `,
    rateRestaurant: gql`
        mutation RateRestaurant($data: RateInput!) {
            rateRestaurant(data: $data) {
                id
                comment
                star
            }
        }
    `,
};

export default schema;
