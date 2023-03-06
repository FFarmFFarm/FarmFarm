// 페이지네이션 박스에 클릭 이벤트 추가
const pageBox = document.getElementsByClassName('page-box');

for (let page of pageBox) {
  page.addEventListener('click', function (e) {

    let cp = page.id;

    selectWishList(cp);
    changeURL(cp);

  })
}


/* cp를 받아 리뷰 목록 조회해오기 */
const selectWishList = (cp) => {
  $.ajax({
    url: "/wish/list",
    data: { "cp": cp },
    dataType: "json",
    success: (map) => {
      printWishList(map.wishList, map.pagination);
    },
    error: () => { }
  });
}


/* 조회해오 리뷰 목록을 화면에 출력 */
const printWishList = (wishList, pagination) => {

  const wishListContainer = document.getElementById('wishListContainer');
  wishListContainer.innerHTML = '';

  for (let wish of wishList) {
    const wishContainer = document.createElement('div');
    wishContainer.classList.add('wish');

    wishListContainer.append(wishContainer);

    const wishThumbnail = document.createElement('a');
    wishThumbnail.classList.add('wish-thumbnail');
    wishThumbnail.href = '/product/' + wish.productNo;

    wishContainer.append(wishThumbnail);

    const wishThumbnailImg = document.createElement('img');
    wishThumbnailImg.src = wish.productImg;
    wishThumbnailImg.classList.add('wish-thumbnail-img');

    wishThumbnail.append(wishThumbnailImg);

    const wishInfo = document.createElement('div');
    wishInfo.classList.add('wish-info');

    wishContainer.append(wishInfo);

    const wishRegDate = document.createElement('span');
    wishRegDate.classList.add('wish-reg-date');
    wishRegDate.innerHTML = wish.wishDate;

    const wishTitle = document.createElement('a');
    wishTitle.classList.add('wish-title');
    wishTitle.innerHTML = wish.productName;
    wishTitle.href = '/product/' + wish.productNo;

    const wishPrice = document.createElement('span');
    wishPrice.classList.add('wish-price');

    const span = document.createElement('span');
    span.innerText = wish.productPrice;

    wishPrice.append(span);
    wishPrice.innerHTML += '원';

    wishInfo.append(wishRegDate, wishTitle, wishPrice);

    const deleteWishBtn = document.createElement('button');
    deleteWishBtn.classList.add('delete-wish-btn');
    deleteWishBtn.setAttribute('type', 'button');

    const xMark = document.createElement('i');
    xMark.classList.add('fa-solid', 'fa-xmark');

    deleteWishBtn.append(xMark);

    wishContainer.append(deleteWishBtn);

    deleteWishBtn.addEventListener('click', (e) => {

      deleteWish(wish.productNo);


    })
  }

  const paginationArea = document.createElement('div');
  paginationArea.classList.add('pagination-area');

  wishListContainer.append(paginationArea);

  printPagination(paginationArea, pagination);
}

/* 페이지네이션 박스 화면에 출력 */
const printPagination = (paginationArea, pagination) => {

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

    selectWishListEvent(numPage, i);
  }

  // 이후 페이지 제작
  const nextPage = document.createElement('div');
  const maxPage = document.createElement('div');
  makePageBox(nextPage, '<i class="fa-solid fa-angle-right"></i>', pagination.nextPage, 'page-box');
  makePageBox(maxPage, '<i class="fa-solid fa-angles-right"></i>', pagination.maxPage, 'page-box');

  paginationArea.append(nextPage, maxPage);

  selectWishListEvent(firstPage, 1);
  selectWishListEvent(prevPage, pagination.prevPage);
  selectWishListEvent(nextPage, pagination.nextPage);
  selectWishListEvent(maxPage, pagination.maxPage);

}

/* 페이지네이션 박스에 클릭이벤트 추가 */
const selectWishListEvent = (element, cp) => {

  element.addEventListener('click', () => {
    selectWishList(cp);
    changeURL(cp);
  });

}


/* x 버튼 클릭 시 찜목록 삭제 */
const wishDeleteBtn = document.getElementsByClassName('delete-wish-btn');
for (let btn of wishDeleteBtn) {
  btn.addEventListener('click', (e) => {

    console.log(btn.id);
    const productNo = btn.id;

    deleteWish(productNo);

  })
}

const deleteWish = (productNo) => {


  axios.delete('/wish/' + productNo)
  .then((response) => {
    messageModalOpen("삭제되었습니다.");
    selectWishList(selectCp());
  })
  .catch((error) => {
    console.log('찜목록 삭제중 에러 발생');
  });

}