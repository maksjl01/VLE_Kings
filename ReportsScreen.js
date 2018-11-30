import React from 'react';

import { WebView } from 'react-native';

export default class ReportsScreen extends React.Component{
    static navigationOptions = {
        title: 'Reports    ',
        headerStyle: {
            backgroundColor: '#0B486B',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    constructor(props){
        super(props);

        this.state = {
            reports: this.props.navigation.state.params.reports,
        };
    }

    render(){
        return(
            <WebView
                source={{html: this.state.reports}}
            />
        )
    }
}