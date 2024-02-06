let test;
fetch("store.json")
  .then((res) => res.json())
  .then(function (data) {
    test = data;
    let totalPrice = 0;
    for (let i = 0; i < test.products.length; i++) {
      var 템플릿 = `
        <div class="product-card" id='num${i}' draggable = 'true'>
          <img src="pr${[i]}.JPG" />
          <h5 class = 'title'>${test.products[i].title}</h5>
          <p>${test.products[i].brand}</p>
          <p> ${test.products[i].price}</p>
          <button class='add-btn'>담기</button>
        </div>`;
      document.querySelector(".article-container").innerHTML += 템플릿;
    }

    //드래그 기능 만들기

    const dragCard = document.querySelector(".article-container");

    let targetDrag;

    //아티클컨테이너안에있는 카드들에 드래그 스타트 붙여주기..!!

    let productCard = document.querySelectorAll(".product-card");
    // console.log(document.querySelector(".product-card"));

    for (let i = 0; i < productCard.length; i++) {
      productCard[i].addEventListener("dragstart", (e) => {
        targetDrag = e.target.cloneNode(true);
      });
    }

    dragCard.addEventListener("dragover", (e) => {
      e.preventDefault();
      //드래그 요소가 첫번째 박스에 계속 위치하면 발생하는 이벤트
    });

    dragCard.addEventListener("drop", (e) => {
      e.preventDefault();
      //드래그 요소가 첫번째 박스 영역에 드롭
    });

    const cart = document.querySelector(".cart");

    cart.addEventListener("dragover", (e) => {
      e.preventDefault();
      //드래그 요소가 두번째 박스에 계속 위치하면 발생하는 이벤트
    });

    cart.addEventListener("drop", (e) => {
      let flag = false;
      e.preventDefault();

      if (cart.querySelector(".product-card") === null) {
        cart.innerHTML = "";
      }
      for (let i = 0; i < cart.children.length; i++) {
        if (cart.children[i].id === targetDrag.id) {
          flag = true;
        }
      }
      if (flag === true) {
        totalPrice = 0;
        cart.querySelector(`#${targetDrag.id}`).lastElementChild.value++;

        for (let i = 0; i < cart.children.length; i++) {
          totalPrice +=
            cart.children[i].lastElementChild.value *
            cart.children[i].lastElementChild.previousElementSibling.innerHTML;
        }

        document.querySelector(".price").innerHTML = totalPrice;
      } else {
        let input = document.createElement("input");
        cart.append(targetDrag);
        targetDrag.querySelector(".add-btn").remove();
        targetDrag.appendChild(input);
        targetDrag.lastElementChild.value = 1;

        let price = cart.querySelector(`#${targetDrag.id}`).lastElementChild
          .previousElementSibling.innerHTML;
        let inputValue = cart.querySelector(`#${targetDrag.id}`)
          .lastElementChild.value;

        totalPrice += price * inputValue;

        document.querySelector(".price").innerHTML = totalPrice;
      }
    });
    //담기버튼

    for (let i = 0; i < productCard.length; i++) {
      productCard[i].querySelector(".add-btn").addEventListener("click", () => {
        let input = document.createElement("input");
        const targetDrag = productCard[i].cloneNode(true);
        let flag = false;

        if (cart.querySelector(".product-card") === null) {
          cart.innerHTML = "";
        }

        for (let i = 0; i < cart.children.length; i++) {
          if (cart.children[i].id === targetDrag.id) {
            flag = true;
          }
        }
        if (flag === true) {
          totalPrice = 0;
          cart.querySelector(`#${targetDrag.id}`).lastElementChild.value++;

          for (let i = 0; i < cart.children.length; i++) {
            totalPrice +=
              cart.children[i].lastElementChild.value *
              cart.children[i].lastElementChild.previousElementSibling
                .innerHTML;
          }

          document.querySelector(".price").innerHTML = totalPrice;
        } else {
          cart.append(targetDrag);
          targetDrag.querySelector(".add-btn").remove();
          targetDrag.appendChild(input);
          targetDrag.lastElementChild.value = 1;

          let price = cart.querySelector(`#${targetDrag.id}`).lastElementChild
            .previousElementSibling.innerHTML;
          let inputValue = cart.querySelector(`#${targetDrag.id}`)
            .lastElementChild.value;

          totalPrice += price * inputValue;

          document.querySelector(".price").innerHTML = totalPrice;
        }
      });
    }
  });

// 검색기능
function fn(e) {
  e.preventDefault();
  document.querySelector(".article-container").innerHTML = "";
  var inputValue = document.querySelector(".search").value;
  for (let i = 0; i < test.products.length; i++) {
    if (
      test.products[i].title.includes(inputValue) ||
      test.products[i].brand.includes(inputValue)
    ) {
      let 템플릿 = `
<div class="product-card" draggable = 'true'>
<img src="pr${[i]}.JPG" />
      <h5 class='yellow'>${test.products[i].title}<h5>
      <p class='brand-yellow'>${test.products[i].brand}</p>
      <p> 가격 : ${test.products[i].price}</p>
      <button class='add-btn'>담기</button>
      </div>`;
      document.querySelector(".article-container").innerHTML += 템플릿;
      let searchYellow = document.querySelector(".yellow").innerHTML;
      searchYellow = searchYellow.replace(
        inputValue,
        `<span style="background : yellow">${inputValue}</span>`
      );
      document.querySelector(".yellow").innerHTML = searchYellow;
      let searchYellow2 = document.querySelector(".brand-yellow").innerHTML;
      searchYellow2 = searchYellow2.replace(
        inputValue,
        `<span style="background : yellow">${inputValue}</span>`
      );
      document.querySelector(".brand-yellow").innerHTML = searchYellow2;
    }
  }
}

document.querySelector(".search-form").addEventListener("submit", fn);

document.querySelector(".buy-button").addEventListener("click", () => {
  document.querySelector(".order-box").style.display = "block";
});
document.querySelector(".buy-close").addEventListener("click", () => {
  document.querySelector(".order-box").style.display = "none";
});

document.querySelector(".buy-success").addEventListener("click", () => {
  document.querySelector("#canvas").style.display = "block";
  document.querySelector(".order-box").style.display = "none";
  var canvas = document.getElementById("canvas");
  var c = canvas.getContext("2d");
  const now = new Date();

  let h5 = [];
  for (let i = 0; i < document.querySelector(".cart").children.length; i++) {
    h5.push(
      document.querySelector(".cart").children[i].lastElementChild
        .previousElementSibling.previousElementSibling.previousElementSibling
        .innerHTML
    );
  }

  c.fillText("영수증", 30, 50);
  c.fillText("현재날짜", 30, 80);
  c.fillText(now.toLocaleString("ko-KR"), 30, 100);
  c.fillText("구매목록", 30, 120);
  c.fillText(h5, 30, 140);
  c.fillText("총 합계", 30, 250);
  c.fillText(document.querySelector(".price").innerHTML, 30, 280);
});
