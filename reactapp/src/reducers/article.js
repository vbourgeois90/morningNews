export default function(articleList=[], action) {
    
    if(action.type === 'addArticle') {
        let articleListCopy=[...articleList];
        let index=articleListCopy.findIndex(article => article.title === action.title);
        if(index===-1){
            articleListCopy.push({title: action.title, description: action.description, img: action.image, content: action.content});
        }
        return articleListCopy;
        
    } else if(action.type === 'removeArticle') {
        let articleListCopy=[...articleList];
        let index=articleListCopy.findIndex(article => article.title === action.title);
        articleListCopy.splice(index, 1);
        return articleListCopy;

    } else if(action.type === 'getList') {
        let articleListCopy=[...articleList];
        for(let i=0; i<action.list.length; i++){
            articleListCopy.push(action.list[i]);
        }
        return articleListCopy;

    } else if(action.type=== 'resetWishList'){
        let articleListCopy=[];
        return articleListCopy
        
    } else {
        return articleList;
    }
}