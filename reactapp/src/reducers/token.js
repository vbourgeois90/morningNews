export default function(token=null, action) {
    if(action.type==='saveToken'){
        let newToken=action.token;
        return newToken;
    } else if(action.type==='resetToken'){
        let newToken=null;
        return newToken
    } else {
        return token;
    }
}