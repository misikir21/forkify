console.log("exproting module")
let shippingcost=89;
let cart=['chcolate',5];

export const addtocart=function(quantity,product){
    cart.push({quantity,product})
    console.log(`you cart has  ${product} ${quantity}`)
}

export{shippingcost,cart}