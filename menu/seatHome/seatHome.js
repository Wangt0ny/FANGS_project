let seatArray = JSON.parse(localStorage.getItem("seatData"));
//座位陣列

const seatContainer = document.getElementById("seat-container");

//生成座位表
let generateSeat = () => {
    return seatContainer.innerHTML = seatArray.map((x) => {
        let {seatNum, isMeal} = x;
        return `
            <div class="seat-layout">
                <div class="seat">
                    <div class="seat-number">${seatNum}</div>
                    <div class="seat-state">${isMeal ? "<span style='color: red;'>用餐中</span>" : "<span style='color: green;'>空桌</span>"}</div>
                </div>
                <div class="seat-option-content">
                    <a id=${seatNum} class="seat-order-btn" href="../seatOrder/seatOrder.html">點餐/結帳</a>
                    <a class="seat-qrcode-btn">生成QR code</a>
                </div>
            </div>
        `
    }).join("")
}
generateSeat()

//開啟座位選單
let seatMenu = () => {
    let seat = document.getElementsByClassName("seat");

    //桌號選項顯示
    for(let i = 0; i < seat.length; i++) {
        seat[i].addEventListener("click", function(e) {
            e.stopPropagation();
            console.log("seat")
            let seatOptionContent = document.getElementsByClassName("seat-option-content");
            for (let j = 0; j < seatOptionContent.length; j++) {
                seatOptionContent[j].style.display = "none"
            }
            this.nextElementSibling.style.display = "block";
        })
    }

    seatContainer.addEventListener("click", function(e) {
        console.log("seatContainer")
        let seatOptionContent = document.getElementsByClassName("seat-option-content");
        for (let j = 0; j < seatOptionContent.length; j++) {
            seatOptionContent[j].style.display = "none"
        }
    })

    //生成QRcode按鈕
    let qrcodeBtnList = document.getElementsByClassName("seat-qrcode-btn");
    for (let k = 0; k < qrcodeBtnList.length; k++) {
        qrcodeBtnList[k].addEventListener("click", function(e) {
            e.stopPropagation();
            let seatID = this.parentNode.previousElementSibling.getElementsByClassName("seat-number")[0].innerHTML;
            console.log(seatID)
        })
    }
    
    //桌號點餐按鈕(session)
    let seatOrderList = document.getElementsByClassName("seat-order-btn");
    for (let j = 0; j < seatOrderList.length; j++) {
        seatOrderList[j].addEventListener("click", function(e) {
            e.stopPropagation();
            console.log(this.id)
            sessionStorage.setItem("seatNum", this.id)
        })
    }
}
seatMenu();
