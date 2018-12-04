import React from 'react';

import { View, Text, Image, FlatList, TouchableOpacity, TouchableHighlight, Button, ActivityIndicator, StyleSheet, Modal } from 'react-native';

import { CompleteTask, GetTasks, GetSingle } from './fetch';

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
            visible: true,

            modalVisible: false,
        };
    }

    toggleModal(visible) {
        this.setState({ modalVisible: visible });
    }

    componentDidMount() {
        this.props.navigation.setParams({ reloadfunction: this.reload.bind(this) });
    }

    completeTask(id) {
        this.setState({ loading: true });
        GetSingle(id).then(content => {
            CompleteTask(id, content).then(data => {
                GetTasks().then(data => this.setState({ data: data, loading: false }));
            });
        });
    }

    openTask(taskID) {
        this.setState({ modalVisible: true });
    }


    reload() {
        this.setState({ loading: true });
        GetTasks().then(data => this.setState({ data: data, loading: false }));
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
                                        underlayColor="#0094c1">
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
                        )}>
                    </FlatList>
                )
            }
            // else if(this.state.modalVisible){
            //     return (
            //                     <Modal animationType={"slide"} transparent={false}
            //                         visible={this.state.modelVisible}
            //                         onRequestClose={() => { console.log("Modal has been closed.") }}>

            //                         <View style={styles.modal}>
            //                             <Text style={styles.text}>Modal is open!</Text>

            //                             <TouchableHighlight onPress={() => {
            //                                 this.toggleModal(!this.state.modalVisible)
            //                             }}>

            //                                 <Text style={styles.text}>Close Modal</Text>
            //                             </TouchableHighlight>
            //                         </View>
            //                     </Modal>
            //     )
            // } 
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