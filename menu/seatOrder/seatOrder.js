let menuMeat = document.getElementById("meat");
let menuSeafood = document.getElementById("seafood");
let menuVegetable = document.getElementById("vegetable");
let menuDumplings = document.getElementById("dumplings");

let meatType = projectDataList.filter((x) => {return x.type === "meat"});
let seafoodType = projectDataList.filter((x) => {return x.type === "seafood"});
let vegetableType = projectDataList.filter((x) => {return x.type === "vegetable"});
let dumplingsType = projectDataList.filter((x) => {return x.type === "dumplings"});

let basket = JSON.parse(localStorage.getItem("data")) || [] ;

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