import { gql } from "@apollo/client";

export const findRestaurants = gql`
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
        }
    }
`;
