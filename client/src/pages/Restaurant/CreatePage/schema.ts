import { gql } from "@apollo/client";

export const createRestaurant = gql`
    mutation CreateRestaurant($data: CreateRestaurantInput!) {
        createRestaurant(data: $data) {
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
