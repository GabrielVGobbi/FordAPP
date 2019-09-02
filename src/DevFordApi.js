export const verifyLogin = function() {

    return new Promise(function(resolve, reject){

        //resolve ou rejeita
        //temporariamente
        setTimeout(function(){
            //1 = login 2 = não logado
            let status = 1;
            resolve(status); 

        }, 2000);

    });

};

export const makeLogin = function (email, password) {
    //temporario

    return new Promise(function(resolve,reject){
        setTimeout(function(){
            let status = 1;
            resolve(status); 
        }, 2000);

    });
};