import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";
import { useAppSelector } from "../redux";

function MyApolloProvider({ children }: { children: any }) {

    const token = useAppSelector((state) => state.myAccount.token)
    const uploadLink = createUploadLink({
        uri: process.env.REACT_APP_APOLLO_ENDPOINT,
        // credentials: "include",
    });

    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization:token,
            },
        };
    });


    const client = new ApolloClient({
        uri: process.env.REACT_APP_APOLLO_ENDPOINT,
        link: authLink.concat(uploadLink),
        cache: new InMemoryCache(),
    });

  

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default MyApolloProvider;
