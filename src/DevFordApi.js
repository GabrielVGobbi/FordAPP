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

//buscar o endereço pedido
export const makeLocationSearch = function (locTxt) {

    return new Promise(function(resolve,reject){
        setTimeout(function(){
            let array = [
                {id:1, label:'Rua Eleonor, 144',lat:-10, lng:-11},
                {id:2, label:'Rua Sidombas, 445',lat:-30, lng:-21},
                {id:3, label:'Rua Joaquim, 333',lat:-40, lng:-31},

            ];
            resolve(array); 
        }, 200);

    });
};