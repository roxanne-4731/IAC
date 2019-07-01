import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {YellowBox} from 'react-native';
import ReduxThunk from 'redux-thunk';
import Router from './Routes';
import Reducers from './store/reducers';

export default class App extends React.Component {
    render() {
        YellowBox.ignoreWarnings(['ViewPagerAndroid']);
        const store = createStore(Reducers, applyMiddleware(ReduxThunk));
        return (
            <Provider store={store}>
                <Router/>
            </Provider>
        );
    }
}
