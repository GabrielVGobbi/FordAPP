//Configurações Iniciais para o login
const initialState = {
    email: 'gabriel@gmail.com',
    pass:'321',
    emailValid:true,
    passValid:true,
    status:0
};

const AuthReducer = (state = initialState, action) => {

    // Padrão 
 
    if (action.type == 'changeStatus') {
        return { ...state, status: action.payload.status };
    }

    if (action.type == 'setEmailField') {
        return { ...state, email: action.payload.email };
    }

    if (action.type == 'setPasswordField') {
        return { ...state, pass: action.payload.pass };
    }

    return state;
}

export default AuthReducer;