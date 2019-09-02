import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import Reducers from './src/Reducers';
import Preload from "./src/screens/Preload";
import Login from "./src/screens/Login";
import HomeNav from "./src/screens/HomeNav";

const AppNavigator = createStackNavigator({
    Preload: {
        screen: Preload
    },
    Login: {
        screen: Login
    },
    HomeNav:{
        screen: HomeNav,
        navigationOptions:{
                header:null
        }
    }
});

const AppContainer = createAppContainer(AppNavigator);
const store = createStore(Reducers, applyMiddleware(ReduxThunk));

export default class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        );
    }
}

