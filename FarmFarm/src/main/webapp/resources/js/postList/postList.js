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
        if (loading != undefined) {
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
    resetSearchShow();
    navResetSearchShow();

    // 검색창 이동
    searchInputMove();
})

// --------------------------------- window.load ------------------------------------- //

/* 화면 로딩이 완료되면 시작되는 이벤트 */
window.addEventListener("load", () => {
    // 리스트가 비어있으면, 주소창의 값을 받아 출력
    const listAreaBody = document.querySelector('.list-area-body');
    const postBox = document.querySelector('.post-box');
    // const postBox = document.querySelector('post-box');
    if (!listAreaBody.contains(postBox)) {
        initialList();
        console.log('비어있네?')
    }

    // 페이지 이벤트 생성
    makePageBoxEvent();
})



// ----------------------------------  main ------------------------------------------ //

/* 상품 목록 하나(post-box)와 페이지 묶음을 생성하는 함수 */
const createPostBox = (postMap) => {

    // map에서 postList와 postMap을 꺼내기
    const postList = postMap.postList;
    const pagination = postMap.pagination;

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

    if (postList.length == 0) { // 결과가 없으면
        const resultIsEmpty = document.createElement("div");
        resultIsEmpty.id = 'resultIsEmpty';
        resultIsEmpty.innerHTML = '<i class="fa-solid fa-basket-shopping"></i>';

        const resultIsEmptyComment = document.createElement("span");
        resultIsEmptyComment.innerText = '검색 결과가 없습니다.';

        resultIsEmpty.append(resultIsEmptyComment);
        listAreaBody.append(resultIsEmpty);
    } else { // 결과가 있으면

        // 상품 목록 화면 작성
        for (let post of postList) {

            // 필요한 div 생성
            const postBox = document.createElement("a");
            postBox.classList.add("post-box");
            postBox.setAttribute("href", "/post/" + post.postNo)
            // 이미지
            const postThumbnail = document.createElement("div");
            postThumbnail.classList.add("post-thumbnail");

            if(post.thumbnailImg != null) {
                postThumbnail.innerHTML = '<img src="' +
                    post.thumbnailImg
                    + '">'
            } else {
                postThumbnail.innerHTML = '<img src="/resources/images/logo-square.png">'
            }

            // 내용
            const postDetail = document.createElement("div");
            postDetail.classList.add("post-detail");

            // 내용 - 판매글 제목
            const postTitle = document.createElement("div");
            postTitle.classList.add("post-title");
            postTitle.innerText = post.postTitle;

            // 내용 - 가격
            const unitPrice = document.createElement("div");
            unitPrice.classList.add("unit-price");
            unitPrice.innerText = post.unitPrice + '원';

            // 내용 - 한줄 소개
            const postContent = document.createElement("div");
            postContent.classList.add("post-content");
            postContent.innerText = post.postContent;

            // detail 포장하기
            postDetail.append(postTitle, unitPrice, postContent);

            // box 포장하기
            postBox.append(postThumbnail, postDetail);

            // listAreaBody에 추가
            listAreaBody.append(postBox);
        }

        // 이전 페이지
        const firstPage = document.createElement('div');
        const prevPage = document.createElement('div');
        makePageBox(firstPage, '<i class="fa-solid fa-angles-left"></i>', 1, 'page-box');
        makePageBox(prevPage, '<i class="fa-solid fa-angle-left"></i>', pagination.prevPage, 'page-box');

        paginationArea.append(firstPage, prevPage);

        // 번호 페이지 제작
        for (let i = pagination.startPage; i <= pagination.endPage; i++) {
            const numPage = document.createElement('div');
            if (i == pagination.currentPage) {
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

        // 개수 업데이트
        const listCount = document.getElementById('listCount');
        listCount.innerText = pagination.listCount;

    }
    // 로딩 애니메이션 종료
    loadingStop(loading);
}

// ------------------------------ ajax ------------------------------------- //

/* 모든 상품 목록을 가져오는 ajax */
const getAllpostList = () => {
    $.ajax({
        url: '/post/list/items',
        method: 'GET',
        dataType: 'JSON',
        success: (postMap) => {
            createPostBox(postMap);
        },
        error: () => {
            alert('error-a1');
        }
    })
}

/* category와 cp 정보를 전달받아 처리하는 ajax */
const getCustomList = (category, cp) => {

    let sort = getSortOption();

    $.ajax({
        url: '/post/list/items',
        method: 'GET',
        data: { 'category': category, 'cp': cp, 'sort': sort },
        dataType: 'JSON',
        success: (postMap) => {
            createPostBox(postMap);
            window.scrollTo(0, 570);
        },
        error: () => {
            alert('error-c1');
        }
    })
};

/* keywprd와 category, cp 정보를 전달받아 처리하는 ajax */
const getCustomList2 = (keyword, category, cp) => {

    let sort = getSortOption();

    $.ajax({
        url: '/post/list/items',
        method: 'GET',
        data: { 'keyword': keyword, 'category': category, 'cp': cp, 'sort': sort },
        dataType: 'JSON',
        success: (postMap) => {
            createPostBox(postMap);
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

    if (isKeyword == -1) {
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

    if (navSearchBar.classList.contains('view-hidden')) {
        keyword = searchInput.value;
    } else {
        keyword = navSearchInput.value;
    }
    return keyword;
}

// category 초기화 보이기/가리기 함수
const resetBtnShow = (category) => {
    const resetCategory = document.querySelector('.reset-category');

    if (category != 0) {
        resetCategory.style.display = 'flex';
    } else {
        resetCategory.style.display = 'none';
    }
}


// history를 만드는 함수1
const makeHistory1 = (category, cp) => {
    const state = { 'category': category };
    const title = '';
    const url = '/post/list?' + 'category=' + category + '&cp=' + cp;

    history.pushState(state, title, url)
}

// history를 만드는 함수2
const makeHistory2 = (keyword, category, cp) => {
    const state = { 'keyword': keyword };
    const title = '';
    const url = '/post/list?' + 'keyword=' + keyword + '&category=' + category + '&cp=' + cp;

    history.pushState(state, title, url)
}

/* 정렬 옵션을 선택하는 함수 */
const getSortOption = () => {
    const sortings = document.getElementsByName('sorting');

    let sort = '';

    for (let i = 0; i < sortings.length; i++) {
        if (sortings[i].checked) {
            sort = sortings[i].value;
        }
    }
    return sort;
}

/* 검색 초기화 버튼을 숨기고 드러내는 함수 */
const navResetSearchShow = () => {
    const navSearchInput = document.getElementById('navSearchInput');
    const navCleanBtn = document.getElementById('navCleanBtn');

    if (navSearchInput.value.trim().length == 0) {
        navSearchInput.value = '';
        navCleanBtn.style.display = 'none';
    } else {
        navCleanBtn.style.display = 'inline-block';
    }
}

const resetSearchShow = () => {
    const searchInput = document.getElementById('searchInput');
    const cleanBtn = document.getElementById('cleanBtn');

    if (searchInput.value.trim().length == 0) {
        searchInput.value = '';
        cleanBtn.style.display = 'none';
    } else {
        cleanBtn.style.display = 'inline-block';
    }
}

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

// ------------------------------- addEvent ----------------------------------------- //

/* 카테고리 선택 이벤트 */
const categoryList = document.getElementsByName('types');


for (let category of categoryList) {
    category.addEventListener("click", () => {

        // 카테고리 선택
        let category = getCheckedCategory();

        resetBtnShow(category);

        // 페이지 초기화
        let cp = 1;

        // 키워드 가져오기
        let keyword = getKeyword();

        // 선택한 정보로 페이지를 생성
        if (keyword.length == 0) {
            getCustomList(category, cp);
            makeHistory1(category, cp);
        } else {
            getCustomList2(keyword, category, cp);
            makeHistory2(keyword, category, cp);
        }
    })
};

// 카테고리 초기화 버튼 이벤트 (단, 키워드가 있으면 키워드 유지)
const resetCategory = document.querySelector('.reset-category');
resetCategory.addEventListener('click', () => {
    const requestUrl = '/post/list';

    const queryString = location.search;
    const isKeyword = queryString.indexOf('?category=', 0);

    if (isKeyword == -1) {

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
            const url = location.search;
            const isKeyword = url.indexOf('?keyword=', 0);

            if (isKeyword == -1) { // 주소창에 키워드가 없는 경우(키워드 유지X)
                // 카테고리 선택   
                let category = getCheckedCategory();

                // 페이지 선택
                let cp = pageBox.id;

                // 선택한 정보로 페이지를 생성
                getCustomList(category, cp);

                // history에 저장
                makeHistory1(category, cp);
            } else { // 주소창에 키워드가 있는 경우(키워드 유지)
                // 첫 번째 = 의 위치
                const firstEqualSign = url.indexOf('=', 1);

                // 첫 번째 & 의 위치
                const firstAndSign = url.indexOf('&', firstEqualSign);

                // 주소창에서 검색어를 잘라냄
                let keywordEncoded = url.substring(firstEqualSign + 1, firstAndSign)

                // 주소창 인코딩
                let keyword = decodeURIComponent(keywordEncoded);

                // 페이지 생성
                getCustomList2(beforeKeyword, beforeCategoryNo, beforePageNo);

                // history에 저장
                makeHistory2(keyword, category, cp);
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
    resetSearchShow();
    navResetSearchShow();
});

/* 검색 이벤트 */
const searchBtns = document.getElementsByClassName('search-btn');

for (let searchBtn of searchBtns) {
    searchBtn.addEventListener('click', () => {

        console.log(searchBtn);

        // 키워드 가져오기
        let keyword = getKeyword();
        console.log('keyword:' + keyword);
        if (keyword.trim().length != 0) {
            getCustomList2(keyword, 0, 1);

            // 히스토리 업데이트
            const state = { 'keyword': keyword };
            const title = '';
            const url = '/post/list?' + 'keyword=' + keyword + '&category=0&keyword=1';

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
    })
}

/* 스크롤 시 검색창을 보이게 하는 이벤트 */
window.addEventListener("scroll", () => {

    searchInputMove();

})

/* 정렬 옵션 선택 시 값을 불러오는 이벤트 */
const sortings = document.querySelectorAll('input[name="sorting"]');

for (let sorting of sortings) {
    sorting.addEventListener('click', () => {
        initialList();
    })
}

/* 검색어를 초기화하는 이벤트 */
document.getElementById('cleanBtn').addEventListener('click', () => {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = '';
    resetSearchShow();
})
document.getElementById('navCleanBtn').addEventListener('click', () => {
    const navSearchInput = document.getElementById('navSearchInput');
    navSearchInput.value = '';
    navResetSearchShow();
})

/* 검색어가 입력되면, 검색 초기화 버튼이 나타나는 이벤트 */
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keyup', () => {
    resetSearchShow();
})
const navSearchInput = document.getElementById('navSearchInput');
navSearchInput.addEventListener('keyup', () => {
    navResetSearchShow();
})


// /* 검색 기록 남기기 */
// const setSearchHistory = (keyword) => {
//     localStorage.setItem('keyword', keyword);
// }
