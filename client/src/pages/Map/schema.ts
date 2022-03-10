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
                ratings{
                    star
                }
            }
        }
    `,
};

export default schema;
