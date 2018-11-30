import React from 'react';

import { View, Text, Image, FlatList, TouchableOpacity, Button, ActivityIndicator, StyleSheet } from 'react-native';

import { CompleteTask, GetTasks } from './fetch';

import Dialog, { DialogContent } from 'react-native-popup-dialog';

export default class TasksScreen extends React.Component {
    static navigationOptions =
        ({ navigation }) => {
            const { params = {} } = navigation.state
            return {
                title: 'Tasks     ',
                headerStyle: {
                    backgroundColor: '#0B486B',
                },  
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerStyle: {
                    backgroundColor: '#0B486B',
                },
                headerRight: (
                    <Button
                        onPress={() => params.reloadfunction()}
                        title="Reload     "
                        color="#0B486B"
                    />
                ),
            };
        }


    constructor(props) {
        super(props);

        this.state = {
            data: this.props.navigation.state.params.data,
            loading: false,
            visible: false
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({ reloadfunction: this.reload.bind(this) });
    }

    completeTask(id) {
        this.setState({ loading: true });
        CompleteTask(id).then(data => {
            GetTasks().then(data => {
                this.setState({ data: data })
                this.setState({ loading: false });
            });
        });
    }

    openTask(taskID) {
        this.setState({ visible: true });
    }

    reload() {
        GetTasks().then(data => this.setState({ data: data }));
    }

    render() {
        if (!this.state.loading) {
            if (this.state.data != "") {
                return (
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item }) => (
                            <View style={{ flexDirection: 'row', backgroundColor: "#9ED6E0", padding: 10, marginTop: 10, marginLeft: 10, marginRight: 10, borderRadius: 5 }}>
                                <View style={{ alignSelf: 'flex-start', flex: 4, flexDirection: 'column' }}>
                                    <TouchableOpacity
                                        onPress={() => this.openTask("yo")}
                                        underlayColor="#0094c1"
                                    >
                                        <Text style={{ fontSize: 14, fontWeight: '500', overflow: 'visible', flexWrap: 'wrap' }}> {item.INFO} </Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ backgroundColor: item.WARNINGLEVEL }}>
                                                <Text style={{ fontWeight: '500', fontSize: 11, alignSelf: 'flex-start' }}> {item.DUE}</Text>
                                            </View>
                                            <Text style={{ fontSize: 11, alignSelf: 'flex-start', fontWeight: "500", marginLeft: 5, color: '#000066' }}> {item.TEACH} </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center' }} >
                                    <TouchableOpacity
                                        onPress={() => this.completeTask(item.id)}
                                        underlayColor="#0094c1">
                                        <Image source={require('./checkbox.png')} style={{ width: 45, height: 45, alignSelf: 'flex-end' }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    >
                    </FlatList>
                )
            }
            else {
                return (
                    <View style={styles.container}>
                        <Text style={{ fontWeight: '500', fontSize: 30, textAlign: 'center' }}> You have no tasks. </Text>
                    </View>
                )
            }
        }
        else {
            return (
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#000" />
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
});