export function getBaseUrl(){
    if(process.env.NODE_ENV === 'production'){
        return 'http://localhost:5000/';
    }else{
        return '/';
    }
}