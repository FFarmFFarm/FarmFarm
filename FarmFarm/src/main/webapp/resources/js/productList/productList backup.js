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

    // 페이지 이벤트 생성
    makePageBoxEvent();

    // 리스트가 비어있으면 출력
    // getAllProductList();
})

// 검색창 변형 이벤트
/* top 버튼 및 검색창 보이기 */
window.addEventListener("scroll", ()=> {
    if(navSearchBar.classList.contains('view-hidden')) {
        if(window.scrollY >= 720) {
            navSearchBar.classList.remove('view-hidden');
            navSearchBar.classList.add('view-flex');
            const searchInput = document.getElementById('searchInput');
            const navSearchInput = document.getElementById('navSearchInput');
            navSearchInput.value = searchInput.value;
            return;
        }
    }

    if(navSearchBar.classList.contains('view-flex')) {
        if(window.scrollY < 720) {
            navSearchBar.classList.add('view-hidden');
            navSearchBar.classList.remove('view-flex');
            const searchInput = document.getElementById('searchInput');
            const navSearchInput = document.getElementById('navSearchInput');
            searchInput.value = navSearchInput.value;
            return;
        }
    }
})

/* product-box를 생성하는 함수 */
const createProductBox = (productMap) => {

    // map에서 productList와 productMap을 꺼내기
    const productList = productMap.productList;
    const pagination = productMap.pagination;

    // 전체 영역
    const listAreaBody = document.querySelector('.list-area-body');

    // 페이지네이션 영역
    const paginationArea = document.querySelector('.pagination-area');
    
    // 전체 영역 및 페이지네이션 영역 비우기
    listAreaBody.innerHTML = "";
    paginationArea.innerHTML = "";

    // 로딩 애니메이션 시작...
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

    if (productList.length == 0) { // 결과가 없으면
        const resultIsEmpty = document.createElement("div");
        resultIsEmpty.id='resultIsEmpty';
        resultIsEmpty.innerHTML = '<i class="fa-solid fa-basket-shopping"></i>';
        
        const resultIsEmptyComment = document.createElement("span");
        resultIsEmptyComment.innerText = '검색 결과가 없습니다.';
        
        resultIsEmpty.append(resultIsEmptyComment);
        listAreaBody.append(resultIsEmpty);
    } else { // 결과가 있으면

        // 상품 목록 화면 작성
        for (let product of productList) {

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

        // 페이지네이션 작성
        // const paginationArea = document.querySelector('.pagination-area');

        // 특수 페이지 제작
        const firstPage = document.createElement('div');
        const prevPage = document.createElement('div');
        makePageBox(firstPage, '<i class="fa-solid fa-angles-left"></i>', 1);
        makePageBox(prevPage, '<i class="fa-solid fa-angle-left"></i>', pagination.prevPage);
        
        paginationArea.append(firstPage, prevPage);

        // 번호 페이지 제작
        for(let i=pagination.startPage; i<=pagination.endPage; i++) {
            const numPage = document.createElement('div');
            numPage.innerText = i;
            numPage.id = i;
            if(i == pagination.currentPage) {
                numPage.classList.add('current-page-box');
            } else {
                numPage.classList.add('page-box');
            }
            paginationArea.append(numPage);
        }
        
        // 특수 페이지(2) 제작
        const nextPage = document.createElement('div');
        const maxPage = document.createElement('div');
        makePageBox(nextPage, '<i class="fa-solid fa-angle-right"></i>', pagination.nextPage);
        makePageBox(maxPage, '<i class="fa-solid fa-angles-right"></i>', pagination.maxPage);

        paginationArea.append(nextPage, maxPage);

        // 페이지 이벤트 생성
        makePageBoxEvent();
        
    }
    // 로딩 애니메이션 종료
    loadingStop(loading);
}

/* 모든 상품 목록을 가져오는 ajax 함수 */
const getAllProductList = () => {
    $.ajax({
        url: '/product/list/items',
        method: 'GET',
        dataType: 'JSON',
        success: (productMap) => {
            createProductBox(productMap);
        },
        error: () => {
            alert('error-a1');
        }
    })
}


/* 페이지 박스를 만드는 함수 */
const makePageBox = (elementName, inputHtml, inputId) => {
    elementName.innerHTML = inputHtml;
    elementName.id = inputId;
    elementName.classList.add('page-box');
}

/* 체크된 카테고리를 바꾸는 함수 */
const updateCheckedCategory = () => {
    let url = location.search;
    // 예시 ?category=1&cp=1

    // category=의 위치
    let categoryEqualSign = url.indexOf('category=', 1);

    // category 다음 & 의 위치
    let nextAndSign = url.indexOf('&', categoryEqualSign);

    let beforeCategoryNo = url.substring(categoryEqualSign + 9, nextAndSign);

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

/* category 선택 정보를 전달하는 함수 */
const getCheckedCategory = () => {
    // 1. 카테고리 목록 선택
    const categoryList = document.getElementsByName('types');

    // 2. 체크된 카테고리의 값을 가져옴
    let category = '';

    for (let categoryOne of categoryList) {
        if (categoryOne.checked) {
            category = categoryOne.value;
        }
    }
    // 3. 해당 값 반환
    return category;
}

/* category와 cp 정보를 전달받아 처리하는 ajax */
const getCustomList = (category, cp) => {
    $.ajax({
        url: '/product/list/items',
        method: 'GET',
        data: { 'category': category, 'cp': cp },
        dataType: 'JSON',
        success: (productMap) => {
            createProductBox(productMap);
        },
        error: () => {
            alert('error-c1');
        }
    })
};

/* keywprd와 category, cp 정보를 전달받아 처리하는 ajax */
const getCustomList2 = (keyword, category, cp) => {
    $.ajax({
        url: '/product/list/items',
        method: 'GET',
        data: { 'keyword':keyword, 'category': category, 'cp': cp },
        dataType: 'JSON',
        success: (productMap) => {
            createProductBox(productMap);
        },
        error: () => {
            alert('error-c2');
        }
    })
};

/* 카테고리 선택 이벤트 */
const categoryList = document.getElementsByName('types');
const resetCategory = document.querySelector('.reset-category'); 

for(let category of categoryList) {
    category.addEventListener("click", () => {

        // 카테고리 선택
        let category = getCheckedCategory();

        if(category != 0) {
            resetCategory.style.display='block';
        } else {
            resetCategory.style.display='none';
        }

        // 페이지 초기화
        let cp = 1;

        // 키워드 가져오기
        let keyword = getKeyword();

        // 선택한 정보로 페이지를 생성
        if(keyword.length == 0) {
            getCustomList(category, cp);
            const state = { 'category': category };
            const title = '';
            const url = '/product/list?' + 'category=' + category + '&cp=' + cp;

            history.pushState(state, title, url)
        } else {
            getCustomList2(keyword, category, cp);
            const state = { 'keyword': keyword };
            const title = '';
            const url = '/product/list?' + 'keyword=' + keyword + '&category=' + category + '&cp=' + cp;

            history.pushState(state, title, url)
        }
    })
};

// 카테고리 초기화 버튼 이벤트 (키워드가 있으면 키워드 유지)
resetCategory.addEventListener('click', ()=>{
    const requestUrl = '/product/list';
    
    const queryString = location.search;
    const isKeyword = queryString.indexOf('?category=', 0);

    if(isKeyword == -1) {

    } else {
        const firstEqualSign = queryString.indexOf('=', 0);
        const firstAndSign = queryString.indexOf('&', firstEqualSign);
        const keyword = queryString.substring(firstAndSign + 1, firstEqualSign);
        requestUrl + '?keyword' + keyword;
    }
    location.href = requestUrl;
})


/* 페이지 선택 이벤트 추가 함수 */
const makePageBoxEvent = () => {
    const pageBoxList = document.getElementsByClassName('page-box');

    for (let pageBox of pageBoxList) {
        pageBox.addEventListener('click', () => {

            // 카테고리 선택
            let category = getCheckedCategory();

            // 페이지 선택
            let cp = pageBox.id;

            // 선택한 정보로 페이지를 생성
            getCustomList(category, cp);

            // history에 저장
            const state = { 'cp': cp };
            const title = '';
            const url = '/product/list?' + 'category=' + category + '&cp=' + cp;

            history.pushState(state, title, url)
        })
    }
}


/* 뒤로가기 이벤트 */
window.addEventListener("popstate", (event) => {
    const url = location.search;
    // 예시 ?keyword=감자&category=1&cp=1

    // 키워드가 있는지 확인하기
    const isKeyword = url.indexOf('?keyword=', 0);

    if(isKeyword == -1) {
        console.log('isKeyword : ' + isKeyword + ", url : " + url);
        // 첫 번째 = 의 위치
        const firstEqualSign = url.indexOf('=', 1);
    
        // 첫 번째 & 의 위치
        const firstAndSign = url.indexOf('&', 1);
    
        // 두 번째 = 의 위치
        const secondEqualSign = url.indexOf('=', firstAndSign);
    
        // 끝
        const urlLength = url.length;
    
        // 주소창에 기록된, 이전 카테고리 번호
        let beforeCategoryNo = url.substring(firstEqualSign + 1, firstAndSign);
    
        // 주소창에 기록된,, 이전 페이지 번호
        let beforePageNo = url.substring(secondEqualSign + 1, urlLength);
    
        // 정보를 다시 전달해 페이지를 만듦
        getCustomList(beforeCategoryNo, beforePageNo);

    } else { // 검색어가 있는 경우
        console.log('isKeyword : ' + isKeyword + ", url : " + url);
        // 첫 번째 = 의 위치
        const firstEqualSign = url.indexOf('=', 1);

        // 첫 번째 & 의 위치
        const firstAndSign = url.indexOf('&', firstEqualSign);

        // 두 번째 = 의 위치
        const secondEqualSign = url.indexOf('=', firstAndSign);

        // 두 번째 & 의 위치
        const secondAndSign = url.indexOf('&', secondEqualSign);

        // 세 번째 = 의 위치
        const thirdEqualSign = url.indexOf('=', secondAndSign);

        // 끝
        const urlLength = url.length;

        let beforeKeywordEncoded = url.substring(firstEqualSign + 1, firstAndSign)
        console.log(beforeKeywordEncoded);

        let beforeKeyword = decodeURIComponent(beforeKeywordEncoded);
        console.log(beforeKeyword);

        // 주소창에 기록된, 이전 카테고리 번호
        let beforeCategoryNo = url.substring(secondEqualSign + 1, secondAndSign);

        // 주소창에 기록된,, 이전 페이지 번호
        let beforePageNo = url.substring(thirdEqualSign + 1, urlLength);

        console.log(beforeKeyword);

        // 정보를 다시 전달해 페이지를 만듦
        getCustomList2(beforeKeyword, beforeCategoryNo, beforePageNo);

    }
    // 카테고리 업데이트
    updateCheckedCategory();
});


/* 검색어 사용 시 */
const searchBtns = document.getElementsByClassName('searchBtn');

for(let searchBtn of searchBtns) {
    searchBtn.addEventListener('click', () => {
        
        console.log(searchBtn);

        // 키워드 가져오기
        let keyword = getKeyword();
        console.log('keyword:' +  keyword);
        if(keyword.trim().length != 0) {
            getCustomList2(keyword, 0, 1);
    
            // 히스토리 업데이트
            const state = { 'keyword': keyword };
            const title = '';
            const url = '/product/list?' + 'keyword=' + keyword + '&category=0&keyword=1';
            
            history.pushState(state, title, url);
            
            // 카테고리 업데이트
            updateCheckedCategory();
    
            // 카테고리 선택
            let category = getCheckedCategory();
    
            if(category != 0) {
                resetCategory.style.display='block';
            } else {
                resetCategory.style.display='none';
            }
    
        } else {
            alert('검색어를 입력해주세요!')
        }
    })
}

// 키워드 가져오기 함수
const getKeyword = () => {
    // 키워드 가져오기
    let keyword = '';

    const searchInput = document.getElementById('searchInput');
    const navSearchInput = document.getElementById('navSearchInput');

    if(navSearchBar.classList.contains('view-hidden')) {
        keyword = searchInput.value;
    } else {
        keyword = navSearchInput.value;
    }
    return keyword;
}