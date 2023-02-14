 const products = [{
         cartItem: "Cornflower",
         cartPicture: "Images/Cornflower.jpg",
         itemPrice: 8.00,
         itemQuantity: 1,
     },
     {
         cartItem: "Sunflower",
         cartPicture: "Images/Sunflower.jpg",
         itemPrice: 10.00,
         itemQuantity: 1,
     },
     {
         cartItem: "Peony",
         cartPicture: "Images/Peony.jpg",
         itemPrice: 5.00,
         itemQuantity: 1,
     },
     {
         cartItem: "Tulip",
         cartPicture: "Images/Tulip.jpg",
         itemPrice: 5.00,
         itemQuantity: 1,
     }
 ];

 for (let val of products) {
     document.getElementById("products").innerHTML += `
    <div class="col-lg-3 col-md-6  col-sm-12  col-xs-12" id="cont">
    <div class="card" style="width: 22rem;">
    <img src="${val.cartPicture}" class="card-img-top image" alt="...">
    <hr>
    <div class="card-body">
    <h5 class="card-title">${val.cartItem}</h5>
    <p class="card-text">${val.itemPrice}</p>
    <hr>
    <a href="#" class="btn btn-secondary addcart">Add to cart</a>
    </div>
    </div>
    </div>`
 }

 let shoppingcart = [];
 additem = document.getElementsByClassName("addcart")

 for (let i = 0; i < additem.length; i++) {
     additem[i].addEventListener("click", function() {
         addCart(products[i]);
         totalprice();
         itemsCount();

     })
 }

 // Functions

 function addCart(obj) {
     if (shoppingcart.find(function(val) { return val.cartItem == obj.cartItem })) {
         obj.itemQuantity++;
     } else {
         shoppingcart.push(obj);
     }
     displayourCart();
 }

 function displayourCart() {
     document.getElementById("cart").innerHTML = "";
     for (let val of shoppingcart) {
         document.getElementById("cart").innerHTML +=
             `<div id="div" >
                  <p>${val.cartItem}</p>
                  <p><img class="smimage" src="${val.cartPicture}"></p>
                  <p>${val.itemPrice}</p>
                  <p><p class="btn btn-danger minus">-</p>  <span class="quantitycounter">${val.itemQuantity}</span> <p class="btn btn-success plus">+</p> <p class="btn btn-warning delete">X</p></p>
                </div>`;
     }

     let plusQuantity = document.getElementsByClassName("plus");
     let minusQuantity = document.getElementsByClassName("minus");
     let deleteQuantity = document.getElementsByClassName("delete");

     for (let i = 0; i < plusQuantity.length; i++) {
         plusQuantity[i].addEventListener("click", function() {
             shoppingcart[i].itemQuantity++;
             document.getElementsByClassName("quantitycounter")[i].innerHTML = shoppingcart[i].itemQuantity;
             totalprice();
             itemsCount();
         })


         minusQuantity[i].addEventListener("click", function() {
             if (shoppingcart[i].itemQuantity == 1) {
                 shoppingcart.splice(i, 1);
                 displayourCart();
                 totalprice();
                 itemsCount();
             } else {
                 shoppingcart[i].itemQuantity--;
                 document.getElementsByClassName("quantitycounter")[i].innerHTML = shoppingcart[i].itemQuantity;
                 totalprice();
                 itemsCount();
             }
         })

         deleteQuantity[i].addEventListener("click", function() {
             shoppingcart[i].itemQuantity = 1;
             shoppingcart.splice(i, 1);
             displayourCart();
             totalprice();
             itemsCount();
         })
     }


 }

 function totalprice() {
     let totalprice = 0;
     let discount = 0;
     let updatedprice = 0;
     let discountcalc = 0;
     for (let val of shoppingcart) {
         totalprice += (val.itemPrice * val.itemQuantity);
     }
     document.getElementById("totalprice").innerHTML = `Total Price: ${totalprice} €`;
     if (totalprice > 200) {
         discount = 20;
         discountcalc = 0.8;
         updatedprice = totalprice * discountcalc;
         document.getElementById("updatedtotalprice").innerHTML = `Updated total price with your discount of ${discount}%: ${updatedprice} €  `
     } else if (totalprice > 100) {
         discount = 10;
         discountcalc = 0.9;
         updatedprice = totalprice * discountcalc;
         document.getElementById("updatedtotalprice").innerHTML = `Updated total price with your discount of ${discount}%: ${updatedprice} €  `
     } else {
         document.getElementById("updatedtotalprice").innerHTML = "";
     }
 }

 function itemsCount() {
     let itemscount = 0;
     for (let val of shoppingcart) {
         itemscount += (val.itemQuantity);
     }
     document.getElementById("cartItems").innerHTML = `Items in Cart: ${itemscount}`
 }