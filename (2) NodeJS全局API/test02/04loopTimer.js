
function time(){
    for(i=0;i<10;i++){
        setTimeout(function(){
            console.log("I will loop forever!");
        },i*500)
    }
}
time();    
setTimeout(function(){
    console.log("Game over");
    // process.exit();
},5000)
