import {verifyLogin, makeLogin } from '../DevFordApi';


export const checkLogin = () => {
   
    return (dispatch) => {
        verifyLogin()
            .then(function(status){
                dispatch({
                    type:'changeStatus',
                    payload:{
                        status
                    }   
                });
            })
            .catch(function(){
                dispatch({
                    type:'changeStatus',
                    payload:{
                        status:2
                    }   
                });
            });
    };      
};

export const setEmailField = (email) => {
    return {
        type:'setEmailField', 
        payload:{
            email
        }
    }
}

export const setPasswordField = (pass) => {
    return {
        type:'setPasswordField', 
        payload:{
            pass
        }
    }
}

export const doLogin = (email, password) => {
    return (dispatch) => {
        makeLogin(email, password)
            .then(function(status){

                if(status == 2) {
                    alert('Email ou senha incorretos');
                }

                dispatch({
                    type:'changeStatus',
                    payload:{
                        status
                    }   
                });
            })
            .catch(function(){
                alert("Erro de conexcao");
            });
    };
}