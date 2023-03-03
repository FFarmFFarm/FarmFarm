/* 리뷰 수정하기 버튼 클릭 시 수정하기 form 출력 */
const reviewUpdateBtn = document.getElementsByClassName('review-update-btn');
if (reviewUpdateBtn != undefined) {

  for (let btn of reviewUpdateBtn) {
    btn.addEventListener('click', () => {
      displayFlex(document.getElementById('reviewFormContainer'));
      selectReview(btn.id);
    })
  }
}

/* 리뷰 작성 창 뒤로가기 클릭 시 */
const reviewBackBtn = document.getElementById('reviewBackBtn');

reviewBackBtn.addEventListener('click', () => {
  document.getElementById('reviewFrom').reset();
  displayNone(document.getElementById('reviewFormContainer'));

  const reviewImg = document.getElementsByClassName('review-img-thumbnail');
  const inputLabel = document.getElementsByClassName('input-label');
  const xBtn = document.getElementsByClassName('x-btn');

  for (let i = 0; i < xBtn.length; i++) {
    reviewImg[i].classList.add('hide');
    reviewImg[i].classList.remove('appear');
    inputLabel[i].style.display = 'flex';

    xBtn[i].classList.add('hide');
    xBtn[i].classList.remove('appear');
  }

})


/* 리뷰 삭제 버튼 클릭시 삭제 */
const reviewDeleteBtn = document.getElementsByClassName('review-delete-btn');
if (reviewDeleteBtn != undefined) {

  for (let btn of reviewDeleteBtn) {
    btn.addEventListener('click', () => {
      displayFlex(document.getElementById('deleteConfirmModal'));
      reviewNo = btn.id;
    })
  }
}

document.getElementById('deleteCalcelBtn').addEventListener('click', () => {

  displayNone(document.getElementById('deleteConfirmModal'));
})

document.getElementById('deleteConfirmBtn').addEventListener('click', () => {

  displayNone(document.getElementById('deleteConfirmModal'));
  deleteReview(reviewNo);
})




/* 리뷰 상세 조회  Function*/
const selectReview = (reviewNo) => {



  $.ajax({
    url: '/select/review/' + reviewNo,
    data: { "memberNo": memberNo },
    dataType: 'json',
    success: (review) => {
      console.log(review);

      /* 리뷰 모달창 내용 넣기 */
      fillReviewForm(review);
    },
    error: () => {
      console.log('리뷰 상세 조회 중 에러');
    },
  });
};

/* 리뷰 작성 폼 채우기 */
const fillReviewForm = (review) => {
  const reviewForm = document.getElementById('reviewForm');

  if (reviewForm != undefined) {
    reviewForm.reset();

  }

  /* 리뷰 모달창 내용 넣기 */
  const modalProductThumbnail = document.getElementById('modalProductThumbnail');
  const modalProductName = document.getElementById('modalProductName');
  const reviewTextArea = document.getElementById('reviewTextArea');
  const reviewNoInput = document.getElementById('reviewNoInput');


  modalProductThumbnail.removeAttribute('src');
  modalProductThumbnail.src = review.productThumbnail;

  modalProductName.removeAttribute('href');
  modalProductName.href = '/product/' + review.productNo;
  modalProductName.innerHTML = review.productName;


  reviewNoInput.value = review.reviewNo;

  reviewTextArea.value = '';
  review.reviewContent = review.reviewContent.replaceAll('<br>', '\n');
  review.reviewContent = review.reviewContent.replaceAll('<br/>', '\n');
  reviewTextArea.value = review.reviewContent;

  reviewTextArea.focus();

  if (review.imgList.length > 0) {
    for (let img of review.imgList) {

      const reviewImg = document.getElementById('reviewImg' + img.reviewImgOrder);
      const xBtn = document.getElementsByClassName('x-btn')[img.reviewImgOrder];
      const inputLabel = document.getElementsByClassName('input-label')[img.reviewImgOrder];

      reviewImg.src = img.reviewImgPath;
      reviewImg.classList.remove('hide');
      xBtn.classList.remove('hide');
      inputLabel.style.display = 'none';


    }
  }


}


/* 리뷰 수정 중 이미지 추가 시 */
const inputFile = document.getElementsByClassName('input-file');
const reviewImg = document.getElementsByClassName('review-img-thumbnail');
const xBtn = document.getElementsByClassName('x-btn');
const inputLabel = document.getElementsByClassName('input-label');

const deleteSet = new Set();

for (let i = 0; i < inputFile.length; i++) {
  inputFile[i].addEventListener('change', (e) => {
    const file = inputFile[i].files[0];

    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (e) => {

        reviewImg[i].setAttribute('src', event.target.result);
        displayFlexNoLock(reviewImg[i]);
        inputLabel[i].style.display = 'none';
        displayFlexNoLock(xBtn[i]);


      };
    } else {
      reviewImg[i].src = '';
      reviewImg[i].classList.add('hide');
      reviewImg[i].classList.remove('appear');
      inputFile[i].value = '';
      inputLabel[i].style.display = 'flex';
      xBtn[i].classList.add('hide');
      xBtn[i].classList.remove('appear');

    }
  });

  xBtn[i].addEventListener('click', (e) => {

    if (reviewImg[i].getAttribute('src') != "") {

      reviewImg[i].removeAttribute('src');
      reviewImg[i].classList.add('hide');
      reviewImg[i].classList.remove('appear');
      inputLabel[i].style.display = 'flex';
      xBtn[i].classList.add('hide');
      xBtn[i].classList.remove('appear');

      inputFile[i].value = '';

      deleteSet.add(i);
    }

  })
}


/* 리뷰 등록하기 버튼 클릭 */
document.getElementById('submitBtn').addEventListener('click', () => {

  const reviewTextArea = document.getElementById('reviewTextArea');

  if (reviewTextArea.value.trim().length == 0) {
    messageModalOpen("후기 내용을 입력해주세요.");
    reviewTextArea.value = "";
    reviewTextArea.focus();

  } else {
    console.log('등록 하기');

    document.getElementById('deleteSetInput').value = Array.from(deleteSet);
    const form = document.getElementById('reviewFrom');
    const formData = new FormData(form);

    $.ajax({
      url: "/review/update",
      data: formData,
      type: "POST",
      contentType: false,
      processData: false,
      success: (result) => {

        if (result > 0) {

          displayNone(document.getElementById('reviewFormContainer'));

          let cp = selectCp();

          selectReviewList(cp);
        }
      },
      error: () => {
        console.log('error');

      }
    })
  }

})


/* cp를 받아 리뷰 목록 조회해오기 */
const selectReviewList = (cp) => {
  $.ajax({
    url: "/review/list",
    data: { "cp": cp },
    dataType: "json",
    success: (map) => {
      printReviewList(map.reviewList, map.pagination);
    },
    error: () => { }
  });
}


/* 조회해온 리뷰 목록을 화면에 출력 */
const printReviewList = (reviewList, pagination) => {

  const reviewListContainer = document.getElementById('reviewListContainer');
  reviewListContainer.innerHTML = '';

  if (reviewList.length == 0) {

    const div = document.createElement('div');
    div.classList.add('no-review');
    div.innerText = '작성한 후기가 없습니다.'

    reviewListContainer.append(div);

  } else {
    for (let review of reviewList) {

      const reviewArea = document.createElement('div');

      reviewArea.classList.add('review');

      const div = document.createElement('div');
      reviewArea.append(div);

      const reviewContainer = document.createElement('div');
      reviewContainer.classList.add('review-container');

      div.append(reviewContainer);

      const reviewTitle = document.createElement('a');
      reviewTitle.classList.add('review-title');
      reviewTitle.href = "/product/" + review.productNo;

      reviewTitle.innerText = review.productName;

      const reviewContent = document.createElement('div');
      reviewContent.classList.add('review-content');

      reviewContainer.append(reviewTitle, reviewContent);

      const span = document.createElement('span');

      span.innerText = '내용보기'


      const button = document.createElement('button');
      button.setAttribute('type', 'button');
      button.classList.add('fa-solid', 'fa-angle-right');

      reviewContent.append(span, button);

      const reviewDate = document.createElement('span');
      reviewDate.classList.add('review-reg-date');
      reviewDate.innerText = review.createDate;

      div.append(reviewDate);

      const reviewDetail = document.createElement('div');
      reviewDetail.classList.add('review-detail', 'hide');

      reviewArea.append(reviewDetail);

      /* 내용보기 버튼 클릭하면 후기 상세보기 창 출력 */
      span.addEventListener('click', () => {
        if (reviewDetail.classList.contains('hide')) {
          reviewDetail.classList.remove('hide');
        } else {
          reviewDetail.classList.add('hide');
        }
      })

      const reviewDetailContent = document.createElement('div');
      reviewDetailContent.classList.add('review-detail-content');

      reviewDetail.append(reviewDetailContent);

      const reviewUpdateBtn = document.createElement('button');
      reviewUpdateBtn.setAttribute('type', 'button');
      reviewUpdateBtn.classList.add('review-update-btn');
      reviewUpdateBtn.innerText = '수정';

      reviewUpdateBtn.addEventListener('click', () => {

        displayFlex(document.getElementById('reviewFormContainer'));
        selectReview(review.reviewNo);

      })

      const reviewDeleteBtn = document.createElement('button');
      reviewDeleteBtn.setAttribute('type', 'button');
      reviewDeleteBtn.classList.add('review-delete-btn');
      reviewDeleteBtn.innerText = '삭제';

      reviewDeleteBtn.addEventListener('click', () => {

        displayFlex(document.getElementById('deleteConfirmModal'));
        reviewNo = review.reviewNo;

      })

      const span1 = document.createElement('span');
      span1.innerText = review.productName;

      const p = document.createElement('p');
      p.innerHTML = review.reviewContent;

      reviewDetailContent.append(reviewUpdateBtn, reviewDeleteBtn, span1, p);

      const reivewImg = document.createElement('div');
      if (review.imgList.length > 0) {
        reivewImg.classList.add('review-img');

        for (let img of review.imgList) {
          const image = document.createElement('img');
          image.setAttribute('src', img.reviewImgPath);

          reivewImg.append(image);

        }
      }

      reviewDetailContent.append(reivewImg);

      const reviewCreateDate = document.createElement('div');
      reviewCreateDate.classList.add('review-create-date');

      const span2 = document.createElement('span');
      span2.innerText = review.createDate;

      const span3 = document.createElement('span');
      span3.innerText = '도움 ';

      const span4 = document.createElement('span');
      span4.classList.add('review=helped');
      span4.innerHTML = review.likeCount;

      span3.append(span4);

      reviewCreateDate.append(span2, span3);

      reviewDetailContent.append(reviewCreateDate);

      reviewListContainer.append(reviewArea);

    }

    const paginationArea = document.createElement('div');
    paginationArea.classList.add('pagination-area');

    reviewListContainer.append(paginationArea);

    printPagination(paginationArea, pagination);

  }


}

const deleteReview = (reviewNo) => {

  // $.ajax({
  //   url: "/review/delete",
  //   type: 'delete',
  //   data: { "reviewNo": reviewNo },
  //   success: (result) => {

  //     messageModalOpen("삭제되었습니다.");

  //     selectReviewList(1);

  //   },
  //   error: () => {
  //     console.log("error");

  //   }
  // })

  axios.delete('/review/delete', { params: { "reviewNo": reviewNo } })
  .then((response) => {
    messageModalOpen("삭제되었습니다.");
    selectReviewList(1);
  })
  .catch((error) => {
    console.log(error);
  });

}