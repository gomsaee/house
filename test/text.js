let test;

fetch("store.json")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    test = data;

    let template = `
 <img scr = 'pr.jpg'>
 <h3></h3>
<div><div>
<div>가격 :<div>
<button></button> 
 
 `;

    for (let i = 0; i < test.products.length; i++) {
      let template = `
        <div><img src="pr${[i + 1]}.JPG" />
        <h5>${test.products[i].title}<h5>
        <p>${test.products[i].brand}</p>
        <p> 가격 : ${test.products[i].price}</p>
        <button class='add'>담기</button>
        </div>
        
        `;
      document.querySelector(".card").innerHTML += template;
    }
  });

//서치기능

const search = () => {
  document.querySelector(".article-container").innerHTML = "";
  let inputValue = document.querySelector(".search").value;
  for (let i = 0; i < test.products[i].length; i++) {
    if (
      test.products[i].title.includes(inputValue) ||
      test.products[i].brand.includes(inputValue)
    ) {
      var 템플릿 = `
<div class="product-card">
  <img src="pr${[i + 1]}.JPG" />
        <h5 class='yellow'>${test.products[i].title}<h5>
        <p class='brand-yellow'>${test.products[i].brand}</p>
        <p> 가격 : ${test.products[i].price}</p>
        <button>담기</button>
        </div>`;
      document.querySelector(".card").innerHTML += 템플릿;
    }
  }
};

document.querySelector(".search").addEventListener("submit", search);
