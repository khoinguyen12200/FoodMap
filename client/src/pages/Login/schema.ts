import { gql } from "@apollo/client";

export const Login = gql`
    query Query($data: LoginInput!) {
        login(data: $data) {
            token
            user {
                id
                account
                password
                name
                avatar
            }
        }
    }
`;
