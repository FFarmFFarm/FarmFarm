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




/* 리뷰 상세 조회  Function*/
const selectReview = (reviewNo) => {



  $.ajax({
    url: '/review/select/' + reviewNo,
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


const fillReviewForm = (review) => {
  const reviewForm = document.getElementById('reviewForm');

  if (reviewForm != undefined) {
    reviewForm.reset();

  }

  /* 리뷰 모달창 내용 넣기 */
  const modalProductThumbnail = document.getElementById('modalProductThumbnail');
  const modalProductName = document.getElementById('modalProductName');
  const reviewTextArea = document.getElementById('reviewTextArea');
  const productNoInput = document.getElementById('productNoInput');
  const reviewNoInput = document.getElementById('reviewNoInput');


  modalProductThumbnail.removeAttribute('src');
  modalProductThumbnail.src = review.productThumbnail;

  modalProductName.removeAttribute('href');
  modalProductName.href = '/product/' + review.productNo;
  modalProductName.innerHTML = review.productName;

  productNoInput.value = '';
  productNoInput.value = review.productNo;

  reviewNoInput.value = review.reviewNo;

  reviewTextArea.value = '';
  review.reviewContent = review.reviewContent.replaceAll('<br>', '\n');
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

        deleteSet.delete(i);

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

