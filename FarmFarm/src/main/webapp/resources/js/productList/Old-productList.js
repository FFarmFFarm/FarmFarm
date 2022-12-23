/* 로딩 애니메이션 */
// 동글뱅이가 돌아가는 애니메이션 작성
// const loading = document.getElementById("spinner").animate([
//     // keyframes
//     { transform: "rotate(360deg)" }
// ], {
//     // timing options
//     duration: 1000,
//     easing: "ease-in-out",
//     iterations: Infinity,
//     fill: "forwards"
// });

// loading.ready.then(() => {
//     loading.cancel();
// })

// 애니메이션 시작하기
const loadingStart = (loading) => {
    loading.play();
    const spinnerBackground = document.getElementById("spinnerBackground");
    const spinner = document.getElementById("spinner");
    spinnerBackground.style.display = "flex";
    spinner.style.display = "block";
}

// 애니메이션 멈추기
const loadingStop = (loading) => {
    setTimeout(function () {
        const spinnerBackground = document.getElementById("spinnerBackground");
        const spinner = document.getElementById("spinner");
        spinnerBackground.style.display = "none";
        spinner.style.display = "none";
        if(loading != undefined) {
            loading.cancel();
        }
    }, 300);
}


/* 로딩 시작 */
window.addEventListener("DOMContentLoaded", () => {
    // 애니메이션 멈추기
    loadingStop();
})

/* 화면 로딩이 완료되면 시작되는 이벤트 */
window.addEventListener("load", ()=>{
    // 주소창을 이용해 넘어온 경우 카테고리를 업데이트함   
    updateCheckedCategory();
})

/* product-box를 생성하는 함수 */
const createProductBox = (productMap) => {

    // map에서 productList와 productMap을 꺼내기
    const productList = productMap.productList;
    const pagenation = productMap.pagenation;

    // 전체 영역
    const listAreaBody = document.querySelector('.list-area-body');
    
    // 비우기
    listAreaBody.innerHTML = "";

    // 로딩 애니메이션 만들기...
    const spinner = document.createElement("div");
    spinner.id = "spinner";
    spinner.innerHTML = '<i class="fa-solid fa-spinner"></i>';

    const spinnerBackground = document.createElement("div");
    spinnerBackground.id = "spinnerBackground";

    spinnerBackground.append(spinner);
    listAreaBody.append(spinnerBackground);

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

    // 로딩 애니메이션 시작
    loadingStart(loading);

    if (productMap.length == 0) { // 결과가 없으면
        const resultIsEmpty = document.createElement("div");
        resultIsEmpty.id='resultIsEmpty';
        resultIsEmpty.innerHTML = '<i class="fa-solid fa-basket-shopping"></i>';
        
        const resultIsEmptyComment = document.createElement("span");
        resultIsEmptyComment.innerText = '검색 결과가 없습니다.';
        
        resultIsEmpty.append(resultIsEmptyComment);
        listAreaBody.append(resultIsEmpty);

    } else { // 결과가 있으면
        for (let product of productList) {
            // listAreaBody 선택
            product;

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
            productPrice.innerText = product.productPrice + '원';

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
    // 로딩 애니메이션 종료
    loadingStop(loading);
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

/* 선택된 카테고리의 상품 목록만 가져오는 ajax 함수 */
const getCheckedProductList = (checkedCategory) => {
    $.ajax({
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

/* category 선택 정보를 전달하는 함수 */
const tellCheckedCategory = () => {
    // 1. 카테고리 목록 선택
    const categoryList = document.getElementsByName('types');

    // 2. 체크된 카테고리의 값을 가져옴
    let checkedCategory = '';

    for (let category of categoryList) {
        if (category.checked) {
            checkedCategory = category.value;
        }
    }
    // 3. 해당 값 반환
    return checkedCategory;
}

/* page 선택 정보를 전달하는 함수 */
const tellSelectedPage = () => {
    let cp = pageBox.id;
    return cp;
}

/* category와 cp 정보를 전달받아 처리하는 ajax */
const getCustomList = (checkedCategory, cp) => {
    $.ajax({
        url: '/product/list/items',
        method: 'GET',
        data: { 'checkedCategory': checkedCategory, 'cp': cp },
        dataType: 'JSON',
        success: (productMap) => {
            createProductBox(productMap);
        },
        error: (message) => {
            alert('message');
        }
    })
};



/* pagination을 사용하는 ajax */
// const select2Page = (pageBox) => {
//     let cp = pageBox.id;

//     console.log('cp : ' + cp);

//     const categoryList = document.getElementsByName("types");

//     let checkedCategory = '';

//     for (let category of categoryList) {
//         if (category.checked) {
//             checkedCategory = category.value;
//         }
//     }

//     $.ajax({
//         url: '/product/list/items',
//         method: 'GET',
//         data: { 'checkedCategory': checkedCategory, 'cp': cp },
//         dataType: 'JSON',
//         success: (productMap) => {
//             createProductBox(productMap);
//         },
//         error: (message) => {
//             alert('message');
//         }
//     })
// }


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

    // 선택된 카테고리 목록을 가져옴
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

/* pagination에 이벤트 추가 */
const pageBoxList = document.getElementsByClassName('page-box');

for(let pageBox of pageBoxList) {
    pageBox.addEventListener('click', () => {
        selectPage(pageBox);
    })
}
