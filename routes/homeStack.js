import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../Home.js'
import FilterTrucks from '../FilterTrucks.js'

const screens = {
    Home: {
        screen: Home
    },
    FilterTrucks: {
        screen: FilterTrucks
    }
}

const HomeStack = createStackNavigator(screens);

export default HomeStack;