import { gql } from "@apollo/client";

export const reloadUser = gql`
    query ReloadUser {
        reloadUser {
            id
            account
            password
            name
            avatar
            email
            address
            phone
        }
    }
`;
