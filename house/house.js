let test;
fetch("store.json")
  .then((res) => res.json())
  .then(function (data) {
    test = data;
    let priceArray = [];
    for (let i = 0; i < test.products.length; i++) {
      var 템플릿 = `
        <div class="product-card" id='num${i}' draggable = 'true'>
          <img src="pr${[i]}.JPG" />
          <h5>${test.products[i].title}</h5>
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

    let price;
    let inputValue;

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
        cart.lastElementChild.lastElementChild.value++;
        priceArray.push(price * inputValue);
      } else {
        let input = document.createElement("input");
        cart.append(targetDrag);
        targetDrag.querySelector(".add-btn").remove();
        targetDrag.appendChild(input);
        targetDrag.lastElementChild.value = 1;

        // 최종가격 나타내기

        for (let i = 0; i < cart.children.length; i++) {
          price = cart.querySelector(`#num${i}`).lastElementChild
            .previousElementSibling.innerHTML;
          inputValue = cart.querySelector(`#num${i}`).lastElementChild.value;
        }

        priceArray.push(price * inputValue);

        let result = 0;
        for (let i = 0; i < priceArray.length; i++) {
          result += priceArray[i];
        }

        document.querySelector(".price").innerHTML = result;
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
          cart.lastElementChild.lastElementChild.value++;
        } else {
          cart.append(targetDrag);
          targetDrag.querySelector(".add-btn").remove();
          targetDrag.appendChild(input);
          targetDrag.lastElementChild.value = 1;
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
