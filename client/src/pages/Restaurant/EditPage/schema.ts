import { gql } from "@apollo/client";

export const updateInfoRestaurant = gql`
    mutation UpdateInfoRestaurant($data: UpdateInfoInput!) {
        updateInfoRestaurant(data: $data) {
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
`;
