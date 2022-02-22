import { gql } from "@apollo/client";

export const findRestaurants = gql`
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
        }
    }
`;

export const deleteRestaurant = gql`
    mutation DeleteRestaurant($deleteRestaurantId: Float!) {
        deleteRestaurant(id: $deleteRestaurantId)
    }
`;
