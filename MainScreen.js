import React from 'react';

import { View, Text, Button, Image, StyleSheet, TouchableHighlight, AsyncStorage, ActivityIndicator } from 'react-native';

import { GetTasks, GetTimetable, GetMusicLessons, GetLunchMenu, GetSportsFixtures, GetReports, LogOut } from './fetch';

import GridView from 'react-native-super-grid';

export default class MainScreen extends React.Component {
    static navigationOptions =
        ({ navigation }) => {
            const { params = {} } = navigation.state
            return {
                headerLeft: (
                    <Text style={{ fontWeight: 'bold', color: '#fff', paddingLeft: 10, fontSize: 22 }}> Home </Text>
                ),
                headerStyle: {
                    backgroundColor: '#0B486B',
                },
                headerRight: (
                    <Button
                        onPress={() => params.logoutfunction()}
                        title="Log Out    "
                        color="#0B486B"
                    />
                ),
            };
        }

    getTasks() {
        this.setState({ loading: true });
        GetTasks().then((data) => {
            this.props.navigation.navigate("Tasks", { data: data })
        });
    }

    getTimetable() {
        this.setState({ loading: true });
        GetTimetable().then((html) => this.props.navigation.navigate("Timetable", { html: html }));
    }

    getMusicLessons() {
        this.setState({ loading: true });
        GetMusicLessons().then((lessons) => this.props.navigation.navigate("Music", { lessons: lessons }));
    }

    getLunchMenu() {
        this.setState({ loading: true });
        GetLunchMenu().then(menu => this.props.navigation.navigate("Lunch", { menu: menu }));
    }

    getSportFixtures() {
        this.setState({ loading: true });
        GetSportsFixtures().then((data) => {
            var split = data.split("JIGGLYPUFF");
            this.props.navigation.navigate("Sport", { fixtures: split[0], results: split[1] })
        });
    }

    getReports() {
        this.setState({ loading: true });
        GetReports().then((reports) => this.props.navigation.navigate("Reports", { reports: reports }));
    }

    gotoVLE() {
        GotoVLE();
    }

    logOut() {
        this.setState({ loading: true });
        LogOut().then(() => {
            AsyncStorage.removeItem('CREDENTIALS').then(() => {
                this.props.navigation.navigate("Login");
            });
        });
    }

    componentDidMount() {
        this.props.navigation.setParams({ logoutfunction: this.logOut.bind(this) });
        this.props.navigation.addListener(
            'willFocus',
            payload => {
                this.setState({ loading: false });
            }
        );
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: true
        }
    }

    render() {
        const items = [
            { name: 'Tasks', image: require('./tasks.png'), func: this.getTasks.bind(this) },
            { name: 'Timetable', image: require('./timetable.png'), func: this.getTimetable.bind(this) },
            { name: 'Music Lessons', image: require('./music.png'), func: this.getMusicLessons.bind(this) },
            { name: 'Lunch Menu', image: require('./lunch.png'), func: this.getLunchMenu.bind(this) },
            { name: 'Sport', image: require('./sport.png'), func: this.getSportFixtures.bind(this) },
            { name: 'Reports', image: require('./reports.png'), func: this.getReports.bind(this) },
        ];

        const last_item = { name: 'VLE Link', image: require('./firefly.png'), func: this.getReports.bind(this) };

        if (!this.state.loading) {
            return (
                <View>
                    <GridView
                        itemDimension={130}
                        items={items}
                        renderItem={item => (
                            <TouchableHighlight onPress={item.func} underlayColor="transparent">
                                <View style={[styles.itemContainer, { backgroundColor: '#9ED6E0' }]}>
                                    <Image source={item.image} style={{ width: 70, height: 70, marginBottom: 10 }} />
                                    <Text style={styles.itemName}> {item.name} </Text>
                                </View>
                            </TouchableHighlight>
                        )}
                    />

                    {/* <View style={{flex: 1, margin: 10, borderRadius: 10}}> 
                        <TouchableHighlight onPress={last_item.func} underlayColor="transparent">
                            <View style={[styles.itemContainer, { backgroundColor: '#9ED6E0' }]}>
                                <Text style={styles.itemName}> {last_item.name} </Text>
                                <Image source={last_item.image} style={{ width: 290, height: 80 }} />
                            </View>
                        </TouchableHighlight>
                    </View> */}

                </View>
            );
        }
        else {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#000" />
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    gridView: {
        paddingTop: 25,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        padding: 10,
        height: 150,
    },
    itemName: {
        fontSize: 20,
        color: '#000',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },
    container: {
        flex: 1,
        justifyContent: 'center'
    },
});