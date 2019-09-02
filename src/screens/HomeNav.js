import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';

import Home from './Home';

const HomeNav = createStackNavigator({

    home: {
        screen:Home
    }


});
export default HomeNav;