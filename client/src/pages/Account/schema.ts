import { gql } from "@apollo/client";

export const UpdateUserInfo = gql`
    mutation UpdateUserInfo($data: UpdateUserInfoInput!) {
        updateUserInfo(data: $data) {
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

export const updateUserAvatar = gql`
    mutation UpdateUserAvatar($data: UpdateUserAvatar!) {
        updateUserAvatar(data: $data) {
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

export const updateUserPassword = gql`
    mutation UpdatePassword($data: UpdatePassword!) {
        updatePassword(data: $data) {
            id
        }
    }
`;
