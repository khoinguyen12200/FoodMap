import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";


const uploadLink = createUploadLink({
    uri:  process.env.REACT_APP_APOLLO_ENDPOINT,
    // credentials: "include",
});

const client = new ApolloClient({
    uri:  process.env.REACT_APP_APOLLO_ENDPOINT,
    link:uploadLink,
    cache: new InMemoryCache(),
});

export default client;
