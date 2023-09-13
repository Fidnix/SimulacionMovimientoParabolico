let CommonElems = (argObj, defaultObj)=>{
    if(!(defaultObj instanceof Object)){
        return {};
    }
    if(argObj === undefined){
        return defaultObj;
    }
    
    let explorado = false;
    let resultantObj = {};
    Object.entries(defaultObj).forEach( ([key, value])=>{
        explorado = true;
        if(value instanceof Object){
            resultantObj[key] = CommonElems(argObj[key], value);
        }else{
            resultantObj[key] = (argObj[key] == undefined)? value: argObj[key];
        }
    } )
    if(!explorado){
        return argObj;
    }
    return resultantObj;
}

// Test
// (function(){
//     console.log(CommonElems({
//         name: 'Fidel',
//         // pos: {
//         //     x: 10,
//         //     y: 5
//         // }
//     },
//     {
//         name: 'Jhon',
//         edad: 31,
//         pos: {
//             x: 10,
//             y: 10,
//             r: 10
//         }
//     }))
// })()