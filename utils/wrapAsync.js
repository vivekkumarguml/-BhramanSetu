// function wrapAsync(fn){
//     return function(req,res,next){
//         fn(req,res,next).catch(next);
//     }
// }
// direct export--> anotnher way of writing async function

///============== or============

module.exports=(fn) =>{
        return (req,res,next)=>{
            fn(req,res,next).catch(next);
        };
    };