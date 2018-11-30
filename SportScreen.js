import React from 'react';

import { Text, View, WebView } from 'react-native';

export default class SportScreen extends React.Component{
    static navigationOptions = {
        title: 'Sport    ',
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
            fixtures: this.props.navigation.state.params.fixtures,
            results: this.props.navigation.state.params.results,
        };
    }

    render(){
        return(
            <View style={{ flexDirection: 'column', flex: 1 }}> 
                <View style={{flex: 1}}>
                    <Text style={{fontSize: 26}}> Fixtures </Text>
                    <WebView
                        source={{ html: this.state.fixtures }}
                    />
                </View>
                <View style={{flex: 1}}>
                    <Text style={{fontSize: 26}}> Results </Text>
                    <WebView
                        source={{ html: this.state.results }}
                    />
                </View>
            </View>
        )
    }
}