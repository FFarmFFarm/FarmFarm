// TODO: 마이페이지 자바스크립트
// FIX: 고칠 점


/* 페이지 박스를 만드는 함수 */
const makePageBox = (elementName, inputHtml, inputId, className) => {
  elementName.innerHTML = inputHtml;
  elementName.id = inputId;
  elementName.classList.add(className);
}


//TODO 배경사진 변경하기

const mypageImgInput = document.getElementById('mypageImgInput');
const memberBgImg = document.getElementById('memberBgImg');

const originalBgImg = memberBgImg.getAttribute('src');


mypageImgInput.addEventListener('change', (e) => {

  if (e.target.files[0] != undefined) {

    
    const fileReader = new FileReader();
    
    fileReader.readAsDataURL(e.target.files[0]);

    fileReader.onload = (event) => {

      memberBgImg.src = event.target.result;

    }

    updateBgImg();

  } else {

    memberBgImg.setAttribute('src', originalBgImg);


  }

})

const updateBgImg = () => {

  const form = document.getElementById('mypageImgForm');
  const formData = new FormData(form);

  $.ajax({
    url: '/mypage/update/bgImg',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    success: (result) => {
      if(result > 0) {
        messageModalOpen("배경 이미지가 변경되었습니다.");
      }
    },
    error: () => {}
  })

}

