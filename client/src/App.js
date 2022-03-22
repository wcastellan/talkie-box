import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

import Discussion from "./pages/Discussion";
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
  
  const [watching, setWatching] = useState([]);
  const [searchResults, setSearchResults] = useState();
  const [currentMedia, setCurrentMedia] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  function closeModal(){
    setIsModalOpen(!isModalOpen);
  }

  return (
    <ApolloProvider client={client}>
     
      <Router>
        <>
        {isModalOpen && <Modal
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          currentMedia={currentMedia} 
          onClose={closeModal} 
          isModalOpen={isModalOpen} 
          setIsModalOpen={setIsModalOpen}
          watching={watching} 
          setWatching={setWatching} 
          />}
          <Navbar />
          <Search
            searchResults={searchResults}
            setSearchResults={setSearchResults}
            currentMedia={currentMedia}
            setCurrentMedia={setCurrentMedia}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/saved" component={()=> <SavedMedias watching={watching} setWatching={setWatching}/>}/>
            <Route exact path="/discussion" component={Discussion} />
            <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;