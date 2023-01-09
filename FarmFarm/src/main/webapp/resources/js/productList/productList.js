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



// -------------------------------- web animation -------------------------------------
// 로딩 애니메이션 시작하기
const loadingStart = (loading) => {
    loading.play();
    const spinnerBackground = document.getElementById("spinnerBackground");
    const spinner = document.getElementById("spinner");
    spinnerBackground.style.display = "flex";
    spinner.style.display = "block";
}

// 로딩 애니메이션 멈추기
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

// 로딩 애니메이션 준비하기
const loadingReady = (listAreaBody) => {
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

    return loading;
}

/* DOMContentLoaded */
window.addEventListener("DOMContentLoaded", () => {
    // 주소창을 이용해 넘어온 경우 카테고리를 업데이트함   
    updateCheckedCategory();

    // 카테고리를 초기화
    let category = getCheckedCategory();
    resetBtnShow(category);

    // 검색창 초기화버튼을 표시
    initialSearchBar();

    // 검색창 이동
    searchInputMove();
})

// --------------------------------- window.load ------------------------------------- //

/* 화면 로딩이 완료되면 시작되는 이벤트 */
window.addEventListener("load", ()=>{
    // 리스트가 비어있으면, 주소창의 값을 받아 출력
    const listAreaBody = document.querySelector('.list-area-body');
    const productBox = document.querySelector('.product-box');
    // const productBox = document.querySelector('product-box');
    if(!listAreaBody.contains(productBox)) {
        initialList();
    }

    // 페이지 이벤트 생성
    makePageBoxEvent();
})



// ----------------------------------  main ------------------------------------------ //

/* 상품 목록 하나(product-box)와 페이지 묶음을 생성하는 함수 */
const createProductBox = (productMap) => {

    // map에서 productList와 productMap을 꺼내기
    const productList = productMap.productList;
    const pagination = productMap.pagination;

    // 개수 업데이트
    const listCount = document.getElementById('listCount');
    listCount.innerText = pagination.listCount;

    // 전체 영역
    const listAreaBody = document.querySelector('.list-area-body');

    // 페이지네이션 영역
    const paginationArea = document.querySelector('.pagination-area');
    
    // 전체 영역 및 페이지네이션 영역 비우기
    listAreaBody.innerHTML = "";
    paginationArea.innerHTML = "";

    // 로딩 애니메이션 준비
    const loading = loadingReady(listAreaBody);

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
            // console.log(product.stock)
            // 만약 품절이면 soldOut처리
            if (product.stock == 0 || product.soldoutFl === 'Y') {
                const soldOutBlind = document.createElement('div');
                soldOutBlind.classList.add('sold-out-blind');
                soldOutBlind.innerHTML = "<img src='/resources/images/postList/out-of-stock.png'>";
                productBox.append(soldOutBlind);
            }

            // listAreaBody에 추가
            listAreaBody.append(productBox);
        }

        // 이전 페이지
        const firstPage = document.createElement('div');
        const prevPage = document.createElement('div');
        makePageBox(firstPage, '<i class="fa-solid fa-angles-left"></i>', 1, 'page-box');
        makePageBox(prevPage, '<i class="fa-solid fa-angle-left"></i>', pagination.prevPage, 'page-box');
        
        paginationArea.append(firstPage, prevPage);

        // 번호 페이지 제작
        for(let i=pagination.startPage; i<=pagination.endPage; i++) {
            const numPage = document.createElement('div');
            if(i == pagination.currentPage) {
                makePageBox(numPage, i, i, 'current-page-box');
            } else {
                makePageBox(numPage, i, i, 'page-box');
            }
            paginationArea.append(numPage);
        }
        
        // 이후 페이지 제작
        const nextPage = document.createElement('div');
        const maxPage = document.createElement('div');
        makePageBox(nextPage, '<i class="fa-solid fa-angle-right"></i>', pagination.nextPage, 'page-box');
        makePageBox(maxPage, '<i class="fa-solid fa-angles-right"></i>', pagination.maxPage, 'page-box');

        paginationArea.append(nextPage, maxPage);

        // 페이지 이벤트 생성
        makePageBoxEvent();

    }
    
    // 로딩 애니메이션 종료
    loadingStop(loading);
}

// ------------------------------ ajax ------------------------------------- //

/* 모든 상품 목록을 가져오는 ajax */
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

/* category와 cp 정보를 전달받아 처리하는 ajax */
const getCustomList = (category, cp, sort) => {

    let exceptFl = getExceptOption();
    console.log(exceptFl);
    $.ajax({
        url: '/product/list/items',
        method: 'GET',
        data: { 'category': category, 'cp': cp, 'sort': sort, 'exceptFl': exceptFl },
        dataType: 'JSON',
        success: (productMap) => {
            createProductBox(productMap);
            window.scrollTo(0, 570);
        },
        error: (e) => {
            alert('error-c1');
            console.log(e)
        }
    })
};

/* keywprd와 category, cp 정보를 전달받아 처리하는 ajax */
const getCustomList2 = (keyword, category, cp, sort) => {

    let exceptFl = getExceptOption();
    console.log(exceptFl);

    $.ajax({
        url: '/product/list/items',
        method: 'GET',
        data: { 'keyword':keyword, 'category': category, 'cp': cp, 'sort':sort, 'exceptFl':exceptFl},
        dataType: 'JSON',
        success: (productMap) => {
            createProductBox(productMap);
            window.scrollTo(0, 570);
        },
        error: () => {
            alert('error-c2');
        }
    })
};

// ----------------------------- utils -------------------------------------- //

/* 페이지를 만드는 함수 */
const initialList = () => {
    const url = location.search;
    // 예시 ?keyword=감자&category=1&cp=1

    // 키워드가 있는지 확인하기
    const isKeyword = url.indexOf('?keyword=', 0);

    if(isKeyword == -1) {
        // 첫 번째 = 의 위치
        const firstEqualSign = url.indexOf('=', 1);
    
        // 첫 번째 & 의 위치
        const firstAndSign = url.indexOf('&', 1);
    
        // 두 번째 = 의 위치
        const secondEqualSign = url.indexOf('=', firstAndSign);

        // 두 번째 & 의 위치
        const secondAndSign = url.indexOf('&', secondEqualSign);
    
        // 세 번째 = 의 위치
        const thridEqualSign = url.indexOf('=', secondAndSign);
    
        // 끝
        const urlLength = url.length;
    
        // 주소창에 기록된, 이전 카테고리 번호
        let beforeCategoryNo = url.substring(firstEqualSign + 1, firstAndSign);
    
        // 주소창에 기록된, 이전 페이지 번호
        let beforePageNo = url.substring(secondEqualSign + 1, secondAndSign);

        // 주소창에 기록된, sort 번호
        let beforeSort = url.substring(thridEqualSign + 1, urlLength)
    
        // 정보를 다시 전달해 페이지를 만듦
        getCustomList(beforeCategoryNo, beforePageNo, beforeSort);

    } else { // 검색어가 있는 경우
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

        // 세 번째 & 의 위치
        const thirdAndSign = url.indexOf('&', thirdEqualSign);

        // 네 번째 = 의 위치
        const fourthEqualSign = url.indexOf('=', thirdAndSign);

        // 끝
        const urlLength = url.length;

        let beforeKeywordEncoded = url.substring(firstEqualSign + 1, firstAndSign)

        let beforeKeyword = decodeURIComponent(beforeKeywordEncoded);

        // 주소창에 기록된, 이전 카테고리 번호
        let beforeCategoryNo = url.substring(secondEqualSign + 1, secondAndSign);

        // 주소창에 기록된,, 이전 페이지 번호
        let beforePageNo = url.substring(thirdEqualSign + 1, thirdAndSign);

        // sort
        let beforeSortNo = url.substring(firstEqualSign + 1, urlLength);

        // 정보를 다시 전달해 페이지를 만듦
        getCustomList2(beforeKeyword, beforeCategoryNo, beforePageNo, beforeSortNo);

    }
    // 카테고리 업데이트
    updateCheckedCategory();
    
}

/* 페이지 박스를 만드는 함수 */
const makePageBox = (elementName, inputHtml, inputId, className) => {
    elementName.innerHTML = inputHtml;
    elementName.id = inputId;
    elementName.classList.add(className);
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

/* 현재 선택된 category의 정보를 가져오는 함수 */
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
    keyword = replaceSpecialSymbols(keyword);

    return keyword;
}

// category 초기화 보이기/가리기 함수
const resetBtnShow = (category) => {
    const resetCategory = document.querySelector('.reset-category');

    if(category != 0) {
        resetCategory.style.display='flex';
    } else {
        resetCategory.style.display='none';
    }
}


// history를 만드는 함수1
const makeHistory1 = (category, cp, sort) => {
    const state = { 'category': category };
    const title = '';
    const url = '/product/list?' + 'category=' + category + '&cp=' + cp + '&sort=' + sort;

    history.pushState(state, title, url)
}

// history를 만드는 함수2
const makeHistory2 = (keyword, category, cp, sort) => {
    const state = { 'keyword': keyword };
    const title = '';
    const url = '/product/list?' + 'keyword=' + keyword + '&category=' + category + '&cp=' + cp + '&sort=' + sort;

    history.pushState(state, title, url)
}

/* 정렬 옵션을 선택하는 함수 */
const getSortOption = () => {
    const sortings = document.getElementsByName('sorting');

    let sort = '';
    
    for(let i=0; i<sortings.length; i++) {
        if(sortings[i].checked) {
            sort = sortings[i].value;
        }
    }
    return sort;
}

/* 제외옵션을 선택하는 함수 */
const getExceptOption = () => {
    
    let exceptFl;

    if(document.getElementById('except').checked) {
        exceptFl = 'Y';
    } else {
        exceptFl = 'N';
    }
    
    return exceptFl;
}

/* 문자열에서 일부 특수문자 제거 */
const replaceSpecialSymbols = (text) => {
    // 문자열을 파라미터로 받아서
    // 웹해킹에 사용될 가능성이 있는 특수문자를 전부 제거하고 
    // 결과를 반환

    text = text.replace(/\=/gi, '');
    text = text.replace(/\&/gi, '');
    text = text.replace(/\?/gi, '');
    text = text.replace(/\@/gi, '');
    text = text.replace(/\#/gi, '');
    text = text.replace(/\$/gi, '');
    text = text.replace(/\%/gi, '');
    text = text.replace(/\;/gi, '');
    text = text.replace(/\|/gi, '');
    text = text.replace(/\\/gi, '');

    return text;
}

/* 검색 실행 함수 */
const doSearch = () => {

    // 키워드 가져오기
    let keyword = getKeyword();

    // 키워드에서 영어, 문자, 숫자만 남기기
    // let regEx = /^[\w\dㄱ-힣]+$/;

    // 특수문자 제거
    keyword = replaceSpecialSymbols(keyword);

    console.log(keyword);

    // 정렬
    let sort = getSortOption();

    if (keyword.trim().length != 0) {
        getCustomList2(keyword, 0, 1, sort);

        // 히스토리 업데이트
        const state = { 'keyword': keyword };
        const title = '';
        // 만약 여기가 문제
        const url = '/product/list?' + 'keyword=' + keyword + '&category=0&cp=1&sort=' + sort ;

        history.pushState(state, title, url);

        // 카테고리 업데이트
        updateCheckedCategory();

        // 카테고리 선택
        let category = getCheckedCategory();

        if (category != 0) {
            resetCategory.style.display = 'block';
        } else {
            resetCategory.style.display = 'none';
        }

    } else {
        alert('검색어를 입력해주세요!')
    }
}

// ------------------------------- addEvent ----------------------------------------- //

/* 카테고리 선택 이벤트 */
const categoryList = document.getElementsByName('types');

for(let category of categoryList) {
    category.addEventListener("click", () => {

        // 카테고리 선택
        let category = getCheckedCategory();

        resetBtnShow(category);

        // 페이지 초기화
        let cp = 1;

        // 키워드 가져오기
        let keyword = getKeyword();

        // 카테고리
        let sort = getSortOption();

        // 선택한 정보로 페이지를 생성
        if(keyword.length == 0) {
            getCustomList(category, cp, sort);
            makeHistory1(category, cp, sort);
        } else {
            getCustomList2(keyword, category, cp, sort);
            makeHistory2(keyword, category, cp, sort);
        }
    })
};

// 카테고리 초기화 버튼 이벤트 (단, 키워드가 있으면 키워드 유지)
const resetCategory = document.querySelector('.reset-category');
resetCategory.addEventListener('click', ()=>{
    const requestUrl = '/product/list';
    
    const queryString = location.search;
    const isKeyword = queryString.indexOf('?category=', 0);

    if(isKeyword == -1) {

    } else {
        const firstEqualSign = queryString.indexOf('=', 0);
        const firstAndSign = queryString.indexOf('&', firstEqualSign);
        let keyword = queryString.substring(firstAndSign + 1, firstEqualSign);
        requestUrl + '?keyword' + keyword;
    }
    location.href = requestUrl;
})

// 정렬 옵션 선택 이벤트
const sortOptionList = document.getElementsByName('sorting');
for(let sortOption of sortOptionList) {
    sortOption.addEventListener("click", () => {

        // 카테고리 선택
        let category = getCheckedCategory();

        resetBtnShow(category);

        // 페이지 초기화
        let cp = 1;

        // 키워드 가져오기
        let keyword = getKeyword();

        // 정렬 옵션
        let sort = getSortOption();

        // 선택한 정보로 페이지를 생성
        if (keyword.length == 0) {
            getCustomList(category, cp, sort);
            makeHistory1(category, cp, sort);
        } else {
            getCustomList2(keyword, category, cp, sort);
            makeHistory2(keyword, category, cp, sort);
        }
    })
}

/* 페이지 선택 이벤트 추가 함수 */
const makePageBoxEvent = () => {
    const pageBoxList = document.getElementsByClassName('page-box');

    for (let pageBox of pageBoxList) {
        pageBox.addEventListener('click', () => {
            const url = location.search;
            const isKeyword = url.indexOf('?keyword=', 0);

            if(isKeyword == -1) { // 주소창에 키워드가 없는 경우(키워드 유지X)
                // 카테고리 선택   
                let category = getCheckedCategory();

                // 페이지 선택
                let cp = pageBox.id;

                // sort옵션
                let sort = getSortOption();
    
                // 선택한 정보로 페이지를 생성
                getCustomList(category, cp, sort);

                // history에 저장
                makeHistory1(category, cp, sort);
            } else { // 주소창에 키워드가 있는 경우(키워드 유지)
                // 첫 번째 = 의 위치
                const firstEqualSign = url.indexOf('=', 1);

                // 첫 번째 & 의 위치
                const firstAndSign = url.indexOf('&', firstEqualSign);

                // 주소창에서 검색어를 잘라냄
                let keywordEncoded = url.substring(firstEqualSign + 1, firstAndSign)
        
                // 주소창 인코딩
                let keyword = decodeURIComponent(keywordEncoded);

                // sort 옵션
                let sort = getSortOption();

                // 페이지 생성
                getCustomList2(beforeKeyword, beforeCategoryNo, beforePageNo, sort);

                // history에 저장
                makeHistory2(keyword, category, cp, sort);
            }
        })
    }
}

/* popstate 이벤트 */
window.addEventListener("popstate", (event) => {
    // 화면 출력
    initialList();

    let category = getCheckedCategory();
    resetBtnShow(category);

    // 검색창 초기화버튼을 표시
    initialSearchBar();
});

/* 검색 이벤트 */
const searchBtns = document.getElementsByClassName('search-btn');

for(let searchBtn of searchBtns) {
    searchBtn.addEventListener('click', () => {
        doSearch();        
    })
}

/* 검색 이벤트 (포커스 후 엔터) */
document.getElementById('searchInput').addEventListener('focus', ()=>{
    addEventListener('keyup', (e) => {
        if(e.key === 'Enter') {
            doSearch();
        }
    })
})

document.getElementById('navSearchInput').addEventListener('focus', ()=>{
    addEventListener('keyup', (e) => {
        if(e.key === 'Enter') {
            doSearch();
        }
    })
})



/* 스크롤 시 검색창을 보이게 하는 이벤트 */
window.addEventListener("scroll", ()=> {

    searchInputMove();

})

/* 정렬 옵션 선택 시 값을 불러오는 이벤트 */
const sortings = document.querySelectorAll('input[name="sorting"]');

for(let sorting of sortings) {
    sorting.addEventListener('click', () => {
        initialList();
    })
}

/* 제외 옵션 선택 시 값을 불러오는 이벤트 */
const exceptOpt = document.querySelector("#except");

exceptOpt.addEventListener('click', ()=>{
    initialList();
})

/*  
    검색창의 위치를 옮기(는 것처럼 연출하)고, 
    초기화 버튼을 보여주거나 숨기고, 내용을 초기화하는 등
    검색창과 관련된 함수, 이벤트 모음

    * 검색창과 관련된 요소들
    - searchInput : 메인 검색창
    - cleanBtn : 메인 검색창 초기화 버튼
    - navSearchInput : nav 검색창
    - navCleanBtn : nav 검색창 초기화 버튼

    * 현재 문제
    - 복잡하게 되어있어 알아보기 힘들고, 비효율적이며, 제대로 작동하지 않음

    * 개선 가능 요소들
    1. cleanBtn, navCleanBtn을 동일한 클래스를 가진 요소로 대체하기
    2. searchInput과 navSearchInput에 다른 아이디, 같은 클래스를 부여해서, 
       css속성은 분리하되 이벤트는 동일하게 부여해보기
*/

/* 검색 기록 남기기 */
// const setSearchHistory = (keyword) => {
//     localStorage.setItem('keyword', keyword);
// }


/* 검색창 위치 이동 함수 */
const searchInputMove = () => {

    let targetHeight = 700;  // 스크롤 위치 지정
    const searchInput = document.getElementById('searchInput');
    const navSearchInput = document.getElementById('navSearchInput');

    if (navSearchBar.classList.contains('view-hidden')) {
        if (window.scrollY >= targetHeight) {
            navSearchBar.classList.remove('view-hidden');
            navSearchBar.classList.add('view-flex');
            navSearchInput.value = searchInput.value;
            return;
        }
    }

    if (navSearchBar.classList.contains('view-flex')) {
        if (window.scrollY < targetHeight) {
            navSearchBar.classList.add('view-hidden');
            navSearchBar.classList.remove('view-flex');
            searchInput.value = navSearchInput.value;
            return;
        }
    }
}

/* 검색창에 change 이벤트가 발생하면, 다른 검색창의 값을 변화시키기 */
document.getElementById('searchInput').addEventListener('keyup', (e)=>{
    // 1. 메인 검색창의 값이 변하면, 
    //    메인 검색창의 값을, 
    //    nav 검색창의 값에 저장
    document.getElementById('navSearchInput').value = e.target.value;

    // 2. 입력값이 변했을 때, 
    //    입력값이 공백이 아니면 모든 초기화 버튼을 보이게 하고
    //    입력값이 공백이면 모든 초기화 버튼을 가림
    for(let item of document.getElementsByClassName('reset-search')){
        if(e.target.value.trim().length > 0){
            item.style.display='inline-block';
        } else {
            item.style.display='none';
        }
    }
})

/* 반대쪽 검색창에도 동일한 이벤트를 부여함(반복문을 사용하면 더 깔끔해질듯!) */
document.getElementById('navSearchInput').addEventListener('keyup', (e)=>{
    document.getElementById('searchInput').value = e.target.value;
    for (let item of document.getElementsByClassName('reset-search')) {
        if (e.target.value.trim().length > 0) {
            item.style.display = 'inline-block';
        } else {
            item.style.display = 'none';
        }
    }
})

/* 초기화 버튼 이벤트(검색어를 초기화하고, 초기화 버튼을 가림) */
for (let item of document.getElementsByClassName('reset-search')){
    item.addEventListener('click', ()=>{
        for(let keywordItem of document.getElementsByClassName('keyword')) {
            keywordItem.value = '';
        }
        for(let item of document.getElementsByClassName('reset-search')) {
            item.style.display='none';
        }
    })
}

/* 
    주소창을 통해 이동한 경우, 
    주소창에 검색어가 있으면 검색창에 저장하고, 초기화 버튼을 표시 
*/
const initialSearchBar = () => {

    // 1. 잘라내기
    let keywordIndexStart = location.search.indexOf('?keyword', 0);
    if(keywordIndexStart != -1) {

        let keywordIndexEnd = location.search.indexOf('&', keywordIndexStart);
        let keyword = location.search.substring(keywordIndexStart + 9, keywordIndexEnd);
    
        let decodedKeyword = decodeURI(keyword);
    
        for (let item of document.getElementsByClassName('keyword')) {
    
            // 2. 0보다 크면 검색창에 집어넣고 초기화 버튼 표시하기
            if (decodedKeyword.trim().length > 0) {
                
                item.value = decodedKeyword;
                
                for(let btnItem of document.getElementsByClassName('reset-search')) {
                    btnItem.style.display='inline-block';
                }
            }
        }
    }
}


/* 정렬 옵션 선택 이벤트 */
