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


/* 마이페이지 배경사진 변경 */
const updateBgImg = () => {

  const form = document.getElementById('mypageImgForm');
  const formData = new FormData(form);

  $.ajax({
    url: '/myPage/update/bgImg',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    success: (result) => {
      console.log("성공")
      if(result > 0) {
        messageModalOpen("배경 이미지가 변경되었습니다.");
      }
    },
    error: () => {}
  })

}




/* 페이지네이션 주소 변경 */
const changeURL = (cp) => {

  //현재 주소를 가져온다.
  var renewURL = location.href;
  //현재 주소 중 page 부분이 있다면 날려버린다.
  renewURL = renewURL.replace(location.search,'');
  
  //새로 부여될 페이지 번호를 할당한다.
  // page는 ajax에서 넘기는 page 번호를 변수로 할당해주거나 할당된 변수로 변경
  renewURL += '?cp='+cp;
  
  //페이지 갱신 실행!
  history.pushState(null, null, renewURL);
}


const selectCp = () => {
  let cp = location.search.replace('?cp=', '');
  return cp;
}