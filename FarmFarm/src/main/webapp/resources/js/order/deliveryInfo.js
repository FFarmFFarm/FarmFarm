// 전화번호에 - 추가
(()=>{
  const phoneNo = document.getElementsByClassName('phone-no');

  for(let i=0; i<phoneNo.length; i++){
  
    phoneNo[i].innerText 
    = phoneNo[i].innerText.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/\-{1,2}$/g, "");
  }

})();

// 기본배송지 외에 배송지 클릭하면 기본배송지 변경
const unCheckIcon = document.getElementsByName('unCheckIcon');
for(let i=0; i<unCheckIcon.length; i++){
  unCheckIcon[i].addEventListener('click', ()=>{
    const selectAddress = document.getElementsByClassName("select-address");
    let addressNo = selectAddress[i].value;

    $.ajax({
      url: "/address/change",
      data: {"addressNo" : addressNo},
      success: (result)=>{
        if(result>0){
          messageModalOpen("배송지가 변경되었습니다.");
          setTimeout(() => {
            // 팝업창 닫으면서 부모창 새로고침
            opener.parent.location.reload();
            window.close();
          }, "1000");

        }
      },
      error: ()=>{
        console.log("배송지 변경 실패");
      }
    })
  })  
}


// 배송지 삭제 버튼
const deleteBtn = document.getElementsByName("deleteBtn");
for(let i=0; i<deleteBtn.length; i++){
  deleteBtn[i].addEventListener("click", ()=>{
    const selectAddress = document.getElementsByClassName("select-address");
    let addressNo = selectAddress[i].value;
    
    deleteAddConfirmOpen();

    const deleteAddConfirm = document.getElementById('deleteAddConfirm');
    document.getElementById('deleteAddConfirmBtn').addEventListener('click', function () {
      displayNone(deleteAddConfirm);

      $.ajax({
        url: "/address/delete",
        data: {"addressNo" : addressNo},
        success: (result)=>{
          if(result>0){
            messageModalOpen("배송지가 삭제되었습니다.");
            setTimeout(() => {
              // 팝업창 닫으면서 부모창 새로고침
              location.reload();
            }, "1000");
  
          }
        },
        error: ()=>{
          console.log("배송지 삭제 실패");
        }
      })
    });
  })
}

// 배송지를 삭제 하시겠습니까? confirm
const deleteAddConfirmOpen = () => {
  const deleteAddConfirm = document.getElementById('deleteAddConfirm');
  displayFlex(deleteAddConfirm);
};

// 장바구니 삭제하시겠습니까? confirm 닫기
if (document.getElementById('deleteAddCalcelBtn') != undefined) {

  document.getElementById('deleteAddCalcelBtn').addEventListener('click', function () {
    const deleteAddConfirm = document.getElementById('deleteAddConfirm');
    displayNone(deleteAddConfirm);
  })

};




// 주소
function sample6_execDaumPostcode() {
  new daum.Postcode({
      oncomplete: function (data) {

        history.pushState(null, null, "/cart/address/new");

          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

          // 각 주소의 노출 규칙에 따라 주소를 조합한다.
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
          var addr = ''; // 주소 변수
          var extraAddr = ''; // 참고항목 변수

          //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
          if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
              addr = data.roadAddress;
          } else { // 사용자가 지번 주소를 선택했을 경우(J)
              addr = data.jibunAddress;
          }

          const oneAdd = document.querySelector(".one-address");

          const newAddForm = document.createElement("form");
          newAddForm.setAttribute("action", "");
          oneAdd.after(newAddForm);

          const newAddArea = document.createElement("div");
          newAddArea.classList.add("new-add-area");
          newAddForm.append(newAddArea);
          
          const newPostCode = document.createElement("div");
          newPostCode.setAttribute("id", "sample6_postcode");
          
          const newAdd = document.createElement("div");
          newAdd.setAttribute("id", "sample6_address");
          
          const newDAdd = document.createElement("div");
          newDAdd.setAttribute("id", "sample6_detailAddress");

          const newAddBtn = document.createElement("button");

          newAddArea.append(newPostCode, newAdd, newDAdd, newAddBtn)

          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          document.getElementById('sample6_postcode').value = data.zonecode;
          document.getElementById("sample6_address").value = addr;
          // 커서를 상세주소 필드로 이동한다.
          document.getElementById("sample6_detailAddress").focus();
      }
  }).open();
}

