import React from 'react';
import './App.css';
import {Trains} from "./Trains/Trains";
import {Provider} from "react-redux";
import {store} from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Trains/>
      </div>
    </Provider>
  );
}

export default App;
