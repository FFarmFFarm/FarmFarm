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
mypageImgInput.addEventListener('change', (e) => {

  if (e.target.files[0] != undefined) {

    
    const fileReader = new FileReader();
    
    fileReader.readAsDataURL(e.target.files[0]);

    fileReader.onload = (e) => {}
  }

})