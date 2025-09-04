function asynctest(){
    let p = new Promise(function(resolve){
        setTimeout(resolve, 2000)
    });
    return p;
}
const value = asynctest();
value.then(function(){
    console.log("ji mai aayi");
})