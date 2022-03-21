import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

import SearchMedias from "./pages/SearchMedias";
import SavedMedias from "./pages/SavedMedias";
import Navbar from "./components/Navbar";
import Search from './components/Search';
import Home from './pages/Home';
import Modal from './components/Modal'

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
});

function App() {
  useEffect(() => {
    document.title = 'talkie-box'
  }, [])
  
  const [currentMedia, setCurrentMedia] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function closeModal(){
    setIsModalOpen(!isModalOpen);
  }

  return (
    <ApolloProvider client={client}>
      {isModalOpen && <Modal currentMedia={currentMedia} onClose={closeModal} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />}
      <Router>
        <>
          <Navbar />
          <Search 
            currentMedia={currentMedia}
            setCurrentMedia={setCurrentMedia}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/saved" component={SavedMedias} />
            <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;