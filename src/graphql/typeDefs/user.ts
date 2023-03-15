import { gql } from "apollo-server-core";

const typeDefs = gql`
    type User {
        id: String
        username: String
    }

    type Query {
        searchUsers(username:String):[User]
    }

    type Mutation {
        createUsername(username:String):CreateUsernameResponse
    }

    type CreateUsernameResponse {
        success: String
        error: String
    }
`;

export default typeDefs;