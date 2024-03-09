let menuMeat = document.getElementById("meat");
let menuSeafood = document.getElementById("seafood");
let menuVegetable = document.getElementById("vegetable");
let menuDumplings = document.getElementById("dumplings");

let meatType = projectDataList.filter((x) => {return x.type === "meat"});
let seafoodType = projectDataList.filter((x) => {return x.type === "seafood"});
let vegetableType = projectDataList.filter((x) => {return x.type === "vegetable"});
let dumplingsType = projectDataList.filter((x) => {return x.type === "dumplings"});

let basket = JSON.parse(localStorage.getItem("data")) || [] ;


//桌號顯示
let displaySeatNum = () => {
    let seatNum = sessionStorage.getItem("seatNum");
    document.getElementById("table-number").innerHTML = seatNum;
}
displaySeatNum()


// 生成品項
let generateMenuCard = (dom, datalist) => {
    return dom.innerHTML = datalist.map((x) => {//slice選取projectDataList內部分物件
        let {img, product, price, id} = x;
        //從本機儲存裡找資料
        let search = basket.find((x) => x.id === id) || [];
        return `
            <div class="col-md-6">
                <div class="item">
                        <div class="mycard">
                            <img class="menu-img" src=${img} alt="project-pic"/>
                            <div class="mycard-body">
                                <div class="body-info">
                                    <h4 class="card-title">${product}</h4>
                                    <p class="card-text">$${price}</p>
                                </div>
                                <div class="card-btn-group">
                                    <i class="bi bi-dash" onclick="decrement(${id})"></i>
                                    <div id=${id} class="item-count">${search.item === undefined ? 0 : search.item}</div>
                                    <i class="bi bi-plus" onclick="increment(${id})"></i>
                                </div>
                            </div>
                        </div>   
                </div>
            </div>
        `
    }).join("")
}
generateMenuCard(menuMeat, meatType);
generateMenuCard(menuSeafood, seafoodType);
generateMenuCard(menuVegetable, vegetableType);
generateMenuCard(menuDumplings, dumplingsType);

// 品項類別選單
function openMenu(pageName) {
    var i, tabcontent;
  
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    
    document.getElementById(pageName).style.display = "block";   
}
// 預設開啟類別
document.getElementById("defaultOpen").click();


//增量數量函式

let increment = (id) => {
    // console.log(id);return;
    let productItem = id;

    let search = basket.find((x) => { return x.id === productItem.id})

    if (search === undefined) {
        basket.push({
            id: productItem.id,
            item: 1,
        });
    }
    else{
        search.item += 1;
    }
    updata(productItem.id);
    generateCartItem(orderList);
    cartTotal();

    localStorage.setItem("data", JSON.stringify(basket));
};

//減量數量函式
let decrement = (id) => {
    let productItem = id;
    
    let search = basket.find((x) => { return x.id === productItem.id})


    if (search === undefined) {
        return;
    }
    else if (search.item === 0) {
        return;
    }
    else{
        search.item -= 1;
    }
    // console.log(basket);
    updata(productItem.id);
    //移除數量為0的物件
    basket = basket.filter((x) => x.item !== 0);//回傳此條件為true的物件
    
    generateCartItem(orderList);
    cartTotal();

    localStorage.setItem("data", JSON.stringify(basket));
};

//更新函式input值
let updata = (id) => {
    let search = basket.find((x) => x.id === id);
    
    if (search !== undefined) {
        document.getElementById(id).innerHTML = search.item;
    }
    else {
        document.getElementById(id).innerHTML = 0;
    }
};

//生成購物車商品
let orderList = document.getElementById("order-list");
let orderBtnContent = document.getElementById("order-btn-content");
let generateCartItem = (dom) => {
    //dom參數
    if (basket.length !== 0){
        //cart not empty
        return dom.innerHTML = basket.map((x) => {
            let {id , item} = x;//物件解構賦值變數
            orderBtnContent.style.display = "block"
            let search = projectDataList.find((y) => y.id === id) || [];
            // console.log(search);
            return `
            <div class="cart-item">
                <img class="cart-item-img" src=${search.img} alt="">
                <div class="cart-info">
                    <p class="cart-info-title">${search.product}</p>
                    <div class="price">
                        <p>$ ${search.price} x ${item} = ${search.price * item}</p>
                    </div>
                </div>
                <i onclick="removeItem(${id})" class="bi bi-trash"></i>
            </div>
            `
        }).join("")
    }
    else {
        //cart empty
        orderBtnContent.style.display = "none"
        dom.innerHTML = `
        <div class="no-item"><h4>購物車是空的唷</h4></div>
        `;
    }
}

generateCartItem(orderList);

//刪除購物車品項
let removeItem = (id) => {
    let productItem = id;
    //移除物件
    basket = basket.filter((x) => x.id !== productItem.id);
    
    updata(productItem.id)
    generateCartItem(orderList);
    cartTotal();

    localStorage.setItem("data", JSON.stringify(basket));
}

//購物車訂單數量顯示
let cartTotal = () => {
    let orderQuantity = document.getElementById("order-quantity");
    let itemAmount = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
    orderQuantity.innerText = itemAmount;
    // return itemAmount;
}
cartTotal();