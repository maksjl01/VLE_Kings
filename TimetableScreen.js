import React from 'react';

import { WebView, View, Text } from 'react-native';

export default class TimetableScreen extends React.Component{
    static navigationOptions = {
        title: 'Timetable    ',
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
            html: this.props.navigation.state.params.html
        };
    }

    render(){
        return(
            <WebView
                source={{html: this.state.html}}
            />
        )
    }
}