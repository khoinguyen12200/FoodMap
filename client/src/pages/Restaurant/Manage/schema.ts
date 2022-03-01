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

export const findVictuals = gql`
    query FindVictuals($restaurantId: Float!) {
        findVictuals(restaurantId: $restaurantId) {
            id
            name
            describe
            avatar
            price
            restaurantId
        }
    }
`;

export const createVictual = gql`
    mutation CreateVictual($data: CreateVictualInput!) {
        createVictual(data: $data) {
            id
            name
            describe
            avatar
            price
            restaurantId
        }
    }
`;

export const updateVictual = gql`
    mutation UpdateVictual($data: UpdateVictualInput!) {
        updateVictual(data: $data) {
            id
            name
            describe
            avatar
            price
            restaurantId
        }
    }
`;

export const deleteVictual = gql`
    mutation DeleteVictual($deleteVictualId: Float!) {
        deleteVictual(id: $deleteVictualId)
    }
`;
