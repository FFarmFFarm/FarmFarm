/* 팜팜마켓 상품 js */

{/* <div class="product-box">
    <div class="product-content">
        <img src="/src/main/webapp/resources/images/productList/carrot.jpg">
    </div>
    <div class="product-detail">
        <div class="product-name">
            토마토는 거꾸로해도 토마토
        </div>
        <div class="product-price">
            3,000 원
        </div>
        <div class="product-message">
            토마토는 맛있어요
        </div>
    </div>
</div> */}



/* 로딩 애니메이션 */
// 동글뱅이가 돌아가는 애니메이션 작성
const loading = document.getElementById("spinner").animate([
    // keyframes
    { transform: "rotate(360deg)" }
], {
    // timing options
    duration: 1000,
    easing: "ease-in-out",
    iterations: Infinity,
    fill: "forwards"
});

loading.ready.then(() => {
    loading.cancel();
})

// 애니메이션 시작하기
const loadingStart = () => {
    loading.play();

    const spinnerBackground = document.getElementById("spinnerBackground");
    const spinner = document.getElementById("spinner");

    spinnerBackground.style.display = "flex";
    spinner.style.display = "block";

}

// 애니메이션 멈추기
const loadingStop = () => {

    setTimeout(function () {
        const spinnerBackground = document.getElementById("spinnerBackground");
        const spinner = document.getElementById("spinner");

        spinnerBackground.style.display = "none";
        spinner.style.display = "none";

        loading.cancel();

    }, 300);

}



/* 로딩 시작 */
window.addEventListener("DOMContentLoaded", () => {
    // 애니메이션 멈추기
    loadingStop();



})


/* 모든 상품 목록 가져오기 ajax */
window.addEventListener("load", ()=>{
    // 상품 목록 가져오기
    // getAllProductList();

    // 애니메이션 멈추기
    // loadingStop();

    // 주소창으로 넘어온 경우... 카테고리 업데이트
    updateCheckedCategory();
})


/* product-box를 생성하는 함수 */
const createProductBox = (productMap) => {

    // 로딩 시작
    loadingStart();

    if (productMap.length == 0) {
        console.log('검색 결과가 없음')
    } else {
        const listAreaBody = document.querySelector('.list-area-body');

        // 비우기
        listAreaBody.innerHTML = "";

        for (let product of productMap) {
            // listAreaBody 선택

            // 필요한 div 생성
            const productBox = document.createElement("a");
            productBox.classList.add("product-box");
            productBox.setAttribute("href", "/product/" + product.productNo)
            // 이미지
            const productContent = document.createElement("div");
            productContent.classList.add("product-content");
            // productContent.innerHTML = '<img src="/src/main/webapp/resources/images/productList/carrot.jpg">'
            productContent.innerHTML = '<img src="' +
                product.thumbnailImg
                + '">'

            // 내용
            const productDetail = document.createElement("div");
            productDetail.classList.add("product-detail");

            // 내용 - 판매글 제목
            const productName = document.createElement("div");
            productName.classList.add("product-name");
            productName.innerText = product.productName;

            // 내용 - 가격
            const productPrice = document.createElement("div");
            productPrice.classList.add("product-price");
            productPrice.innerText = product.productPrice;

            // 내용 - 한줄 소개
            const productMessage = document.createElement("div");
            productMessage.classList.add("product-message");
            productMessage.innerText = product.productMessage;

            // detail 포장하기
            productDetail.append(productName, productPrice, productMessage);

            // box 포장하기
            productBox.append(productContent, productDetail);

            // listAreaBody에 추가
            listAreaBody.append(productBox);
        }

        
    }

    // 로딩 종료
    loadingStop();

}


/* 모든 상품 목록을 가져오는 ajax 함수 */
const getAllProductList = () => {
    $.ajax({
        url: '/product/list/all',
        method: 'GET',
        dataType: 'JSON',
        success: (productMap) => {
            createProductBox(productMap);
        },
        error: (message) => {
            alert('message');
        }
    })
}


/* 선택된 카테고리의 상품 목록만 가져오는 ajax gkatn */
const getCheckedProductList = (checkedCategory) => {

    $.ajax({
        // $.param ({"userId" : 1, "id" : 1})
        // url: '/product/list/items?' + $.param({"category":checkedCategory}),
        url: '/product/list/items',
        method: 'GET',
        data: {'checkedCategory':checkedCategory},
        dataType: 'JSON',
        success: (productMap) => {
            createProductBox(productMap);

        },
        error: (message) => {
            alert('message');
        }
    })

}

/*카테고리 선택 이벤트 */
const categoryList = document.getElementsByName('types');

for(let category of categoryList) {
    category.addEventListener("click", () => {

        const categoryList = document.getElementsByName("types");

        let checkedCategory = '';

        // 선택된 카테고리의 값을 가져오기
        for (let category of categoryList) {
            if (category.checked) {
                checkedCategory = category.value;
            }
        }
        getCheckedProductList(checkedCategory);

        // history에 저장
        const state = { 'category': checkedCategory };
        const title = '';
        const url = '/product/list?' + 'category=' + checkedCategory;

        history.pushState(state, title, url)
    })
};


/* 뒤로가기 이벤트 */
window.addEventListener("popstate", (event) => {
    // 체크된 카테고리 변경
    updateCheckedCategory();

    // 카테고리 생성
    getCheckedProductList(beforeCategoryNo);

});

/* 체크된 카테고리를 바꾸는 함수 */
const updateCheckedCategory = () => {
    const url = location.search;
    const urlLength = url.length;
    let beforeCategoryNo = url.substring(10, urlLength);

    // 카테고리 체크하기
    const categoryList = document.getElementsByName("types");

    // 만약 선택된 카테고리가 비어있으면, 0으로 만듦
    let isChecked = false;

    // 카테고리 선택하기
    for (let category of categoryList) {
        if (category.value === beforeCategoryNo) {
            category.checked = true;
            isChecked = true;
            break;
        }
    }

    // 만약 선택된 카테고리가 비어있으면, 0으로 만듦
    if (!isChecked) {
        categoryList[0].checked = true;
    }
}