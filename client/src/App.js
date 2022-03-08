import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHTTPLink,
} from "@apollo/client";
import SearchBooks from "./pages/SearchBooks";
import SavedBooks from "./pages/SavedBooks";
import Navbar from "./components/Navbar";

function App() {
  // creates the link for gql
  const httpLink = createHTTPLink({
    uri: "/graphql",
  });
  // this sets up the json web token to work
  // save the token to local storage
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("id_token");
    return {
      // return all of the headers and auth if it needs the auth it will take the token otherwise it will do nothing instead
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ``,
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={SearchBooks} />
            <Route exact path="/saved" component={SavedBooks} />
            <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
