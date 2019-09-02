import React, { Component } from 'react';
import { View,Text,StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';

export class Home extends Component {

    static navigationOptions = {
        title: 'Olá, Gabriel',
        headerStyle:{
            backgroundColor:'#0A5460'
        },
        headerTintColor: '#FFF',
        headerTitleStyle:{
            fontWeight:'bold',
            textAlign:'center',
            flex:1
        }

    };

    constructor(props){
        super(props);
        this.state = {
            currentLocation:{
                latitude:-23.7,
                longitude:-46.8,
                latitudeDelta:0.004,
                longitudeDelta:0.004
            }
        };
    }

    render(){
        return (
            <View style={styles.container}>
               <MapView 
                    style={styles.map}
                    initialRegion={this.state.currentLocation}>

               </MapView>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.auth.status
    };
};
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    map:{
        flex:1
    }
});


const HomeConnect = connect(mapStateToProps, {})(Home);
export default HomeConnect;