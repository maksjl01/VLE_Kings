import React from 'react';
import {
    Text,
    StyleSheet,
    TouchableHighlight,
    View,
    TextInput,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';

import { Login } from './fetch';

export default class LoginScreen extends React.Component{
    static navigationOptions = {
        title: 'Login    ',
        headerStyle: {
            backgroundColor: '#0B486B',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            username: '',
            password: ''
        };
    }

    componentDidMount(){ 
        AsyncStorage.getItem('CREDENTIALS').then(data =>{
            if(data != null){
                this.setState({ loading: true });
                AsyncStorage.getItem('CREDENTIALS').then(data =>{
                    var creds = data.split(";");
                    Login(creds[0], creds[1]).then(() =>{
                        this.props.navigation.navigate("Main");
                    });
                });
            } 
        });  

        this.props.navigation.addListener(
            'didBlur', 
            payload => {
                this.setState({ loading: false });
            }  
        );
    }

    onLogin() {
        const { username, password } = this.state; 

        this.setState({ loading: true });
        Login(username, password).then((data) => {
            AsyncStorage.setItem('CREDENTIALS', String(username)+";"+String(password)).then(() =>{
                this.props.navigation.navigate("Main"); 
            });
        },
        (err) => { 
            alert("Username or password incorrect");
            this.setState({ loading: false });
        });
    }

    render() {
        if(!this.state.loading){
            return (
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            value={this.state.username}
                            onChangeText={(username) => this.setState({ username })}
                            placeholder={'Username'}
                            keyboardType="email-address"
                            underlineColorAndroid='transparent'
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            value={this.state.password}
                            onChangeText={(password) => this.setState({ password })}
                            placeholder={'Password'}
                            underlineColorAndroid='transparent'
                            secureTextEntry={true}
                            style={styles.input}
                        />
                    </View>
                    <TouchableHighlight 
                        style={[styles.buttonContainer, styles.loginButton]} 
                        onPress={this.onLogin.bind(this)}
                        underlayColor="#0094c1">
                        <Text style={styles.loginText}> Login </Text>
                    </TouchableHighlight>
                </View>
            );
        }
        else{
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    buttonContainer: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
    },
    loginButton: {
        backgroundColor: "#0086d6",
    },
    loginText: {
        color: 'white',
    }
});