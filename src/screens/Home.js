import React, { Component } from 'react';
import { View,Text,StyleSheet,Animated, Platform, PermissionsAndroid } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import SearchBox from '../components/Home/SearchBox';

export class Home extends Component {

    watchId = null; 

    static navigationOptions = {
        title: 'Olá, Gabriel',
        headerStyle:{
            backgroundColor:'#008ad6'
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
                /* latitude:-23.574407, 
                longitude:-46.623501,*/
                latitude:0, 
                longitude:0,
                latitudeDelta:0.004,
                longitudeDelta:0.004
            },
            isLoading:false,
            loadingMsg:'',
            warnHeight:new Animated.Value(0)
        };

        this.setWarning = this.setWarning.bind(this);
        this.getCurrentLocation = this.getCurrentLocation.bind(this);
        this.requestLocPermission = this.requestLocPermission.bind(this);
        this.searchBoxClick = this.searchBoxClick.bind(this);


    }

    componentDidMount(){

        this.setWarning(true, 'Procurando sua localização...');

        setTimeout(()=>{

            this.setWarning(false, '');
            this.getCurrentLocation();
            
        }, 3000);

        //Parar a localização
        //Geolocation.clearWatch(this.watchId);
        
    }

    getCurrentLocation = async () => {

        if(await this.requestLocPermission()){

            this.watchId = Geolocation.watchPosition(
                (position) => {
                    this.setWarning(false, '');
                    this.setState({
                        currentLocation:{
                            latitude:position.coords.latitude, 
                            longitude:position.coords.longitude,
                            latitudeDelta:0.004,
                            longitudeDelta:0.004
                        }
                    });

                },
                (error) => {
                    alert("erro"+ error.mensagem);
                },
                { enableHighAccuracy: true, interval:4000, timeout:15000, maximumAge: 10000}
             );

        }else {
            alert("não deu permissao");
        }
    }

    requestLocPermission = async () => {

        if(Platform.OS == 'android'){
            try {

                const g = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title:'Pegar Localização',
                        mensagem:'Precisamos acessar sua localização'
                    }
                );

                if(g == PermissionsAndroid.RESULTS.GRANTED){
                    return true;
                }else {
                    return false;
                }

            }catch(e) {
                return false;
            }
        }else {
            return true;
        }

    }

    setWarning(status, msg) {

        if(status === true && msg != '') {
            this.setState({
                isLoading:status,
                loadingMsg:msg
            });
            
            Animated.timing(
                this.state.warnHeight,
                {
                    toValue:30, 
                    duration:500
                }
            ).start();
        } else if(status === false) {
            this.setState({
                isLoading:status,
                loadingMsg:''
            });
            
            Animated.timing(
                this.state.warnHeight,
                {
                    toValue:0, 
                    duration:500
                }
            ).start();
        }

        
    }

    searchBoxClick(item){
        alert("clicou em "+ item.label);
    }


    render(){
        return (

            <View style={styles.container}>
               <MapView 
                    style={styles.map}
                    region={this.state.currentLocation}>
               </MapView>

               {(this.state.isLoading == true && this.state.loadingMsg != '') &&
                    <Animated.View  style={[styles.warnBox, {height:this.state.warnHeight}]}>
                        <Text style={styles.warnText}>{this.state.loadingMsg}</Text>
                    </Animated.View>
               } 

               <SearchBox dataClick={this.searchBoxClick} />
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
    },
    warnBox:{
        position:'absolute',
        left:0,
        top:0,
        width:'100%',
        backgroundColor:'#000',
        justifyContent:'center',
        alignItems:'center'
    },
    warnText:{
        fontSize:13,
        color:'#FFF'
    }
});


const HomeConnect = connect(mapStateToProps, {})(Home);
export default HomeConnect;