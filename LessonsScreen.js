import React from 'react';

import { Text, Image, View, FlatList } from 'react-native';

export default class LessonsScreen extends React.Component{
    static navigationOptions = {
        title: 'Music    ',
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
            lessons: this.props.navigation.state.params.lessons
        }
    }

    render(){
        return(
            <FlatList
                data={this.state.lessons}
                renderItem={({item}) => (
                    <View style={{ flexDirection: 'row', backgroundColor: "#cccccc", padding: 10, margin: 10, borderRadius: 5 }}>
                        <View style={{ alignSelf: 'flex-start', flex: 4 }}>
                            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                <Text style={{ fontSize: 16, fontWeight: '500', overflow: 'visible'}}> {item.instrument} </Text>
                                <Text style={{ fontSize: 16, alignSelf: 'flex-start', fontWeight: "500", color: "#009fff", marginLeft: 7}}> {item.date} </Text>
                            </View>
                            <Text style={{ fontSize: 12, alignSelf: 'flex-start', paddingRight: 7 }}>{item.teacher}</Text>
                        </View>
                    </View>
                    
                )}
            >
            </FlatList>
        )
    }


}