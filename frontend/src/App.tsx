import React, { useState } from "react";
import { ApolloProvider, Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import apollo from "./lib/createApolloClient";
import "./App.css";

const USER_QUERY = gql`
  query {
    me {
      id
      name
      email
      permissions
    }
  }
`;

const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

const App: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ApolloProvider client={apollo}>
      <div className="App">
        <Query query={USER_QUERY}>
          {({ loading, data }: { loading: boolean; data: any }) => {
            if (loading) return <p>Loading...</p>;

            return (
              <React.Fragment>
                <pre>
                  <code>{JSON.stringify(data, null, 2)}</code>
                </pre>

                {data.me && (
                  <Mutation
                    mutation={SIGN_OUT_MUTATION}
                    refetchQueries={[{ query: USER_QUERY }]}
                  >
                    {(signout: () => any) => (
                      <div>
                        <button onClick={() => signout()}>Sign Out</button>
                      </div>
                    )}
                  </Mutation>
                )}
              </React.Fragment>
            );
          }}
        </Query>

        <Mutation
          mutation={SIGN_IN_MUTATION}
          refetchQueries={[{ query: USER_QUERY }]}
          variables={{ email, password }}
        >
          {(signin: () => any, { loading }: { loading: boolean }) => (
            <form
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                await signin();
                setEmail("");
                setPassword("");
              }}
            >
              <h2>Sign In</h2>
              <label>
                Email
                <br />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </label>
              <br />
              <label>
                Password
                <br />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </label>
              <br />
              <button type="submit">Log In</button>
            </form>
          )}
        </Mutation>
      </div>
    </ApolloProvider>
  );
};

export default App;
