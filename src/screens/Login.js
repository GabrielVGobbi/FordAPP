import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TextInput, KeyboardAvoidingView, TouchableHighlight } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";

import logoImg from '../assets/checked.png';
import imgLogin from '../assets/right.png'

import { connect } from 'react-redux';
import { setEmailField, setPasswordField, doLogin } from '../actions/AuthActions';

export class Login extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {};

        this.loginAction = this.loginAction.bind(this);
    }

    loginAction(){
        
        this.props.doLogin(this.props.email, this.props.pass);
        this.verifyStatus = this.verifyStatus.bind(this);

        
    }
    componentDidUpdate() {
        this.verifyStatus();
    }
    verifyStatus() {
        
        //verificar 
        if(this.props.status === 1){
           
            this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'HomeNav' })
                ]
            }));

        }

    }

    render() {
        let buttonOpacity = 0.2;

        if (this.props.emailValid == true && this.props.passValid == true) {
            buttonOpacity = 1;
        }
        return (
            <ImageBackground source={require('../assets/bg.jpg')} style={styles.container}>
                <KeyboardAvoidingView behavior="padding" enabled style={styles.keyboard}>
                    <View style={styles.center}>
                        <Text style={styles.header}> Login Ford APP</Text>
                    </View>

                    <View style={styles.fieldArea}>
                        <Text style={styles.fieldTitle}>E-mail -> {this.props.status} </Text>
                        <View style={styles.fieldItemArea}>
                            <TextInput style={styles.fieldItem} value={this.props.email} />
                            <View style={styles.fieldItemStatus}>
                                {this.props.emailValid &&
                                    <Image source={logoImg} style={styles.image} />
                                }
                            </View>
                        </View>
                    </View>

                    <View style={styles.fieldArea}>
                        <Text style={styles.fieldTitle}>Senha</Text>
                        <View style={styles.fieldItemArea}>
                            <TextInput secureTextEntry={true} style={styles.fieldItem} value={this.props.pass} />
                            <View style={styles.fieldItemStatus}>
                                {this.props.passValid &&
                                    <Image source={logoImg} style={styles.image} />
                                }
                            </View>
                        </View>
                    </View>

                    <TouchableHighlight style={styles.button} onPress={this.loginAction}>
                        <Image source={imgLogin} style={styles.image} />
                    </TouchableHighlight>


                    <View style={styles.bArea}>
                        <TouchableHighlight style={styles.bAreaText}> 
                            <Text style={styles.fieldTitle}>Esqueci a senha</Text>
                        </TouchableHighlight>
                    </View>

                </KeyboardAvoidingView>
            </ImageBackground>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    keyboard: {
        flex: 1
    },
    center: {
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        marginTop: 30,
    },
    header: {
        color: '#FFF',
        fontSize: 30,
        marginBottom: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fieldTitle: {
        color: '#FFF',
        fontSize: 18,

    },
    fieldItem: {
        flex: 1,
        color: '#fff',
        fontSize: 17,

    },
    fieldArea: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#FFF',
    },
    fieldItemArea: {
        flexDirection: 'row',
        height: 50,
    },
    fieldItemStatus: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 70,
        height: 70,
        borderRadius: 40,
        backgroundColor: '#0A5360',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 25,
        height: 25,
    },
    imglogin: {
    }
});
const mapStateToProps = (state) => {
    return {
        status: state.auth.status,
        email: state.auth.email,
        pass: state.auth.pass,
        emailValid: state.auth.emailValid,
        passValid: state.auth.passValid,

    };
};

const LoginConnect = connect(mapStateToProps, { setEmailField, setPasswordField, doLogin })(Login);
export default LoginConnect;
