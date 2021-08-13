/**
 * @author Zhicheng Wang
 * @create date 2021-07-23 20:34:48
 * @modify date 2021-08-13 11:19:20
 */

import './App.scss';
import { Component } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from "./redux/configureStore";
import { PersistGate } from 'redux-persist/integration/react'

import { persistor } from "./redux/configureStore";
import Main from './components/Main.jsx';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>

            <div className="App">    
              <Main />
            </div>

          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
