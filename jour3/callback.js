let a = 0;
setTimeout(function(){
    a++
    console.log(a)
},1000)

setTimeout(function(){
    a = a + 5;
},2000)

setTimeout(function(){
    console.log(a)
},3000)



