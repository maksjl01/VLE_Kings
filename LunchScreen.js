import React from 'react';

import { View, Text, WebView } from 'react-native';

export default class LunchScreen extends React.Component{
    static navigationOptions = {
        title: 'Menu    ',
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
            menu: this.props.navigation.state.params.menu 
        };      
    }


    render(){ 
        return(
            <WebView
                source={{html: this.state.menu}} 
            />
        )
    }


}