export default function(language='', action){
    if(action.type==='changeLanguage'){
        let newLanguage = action.lang;
        return newLanguage;
    } else {
        return language;
    }
}