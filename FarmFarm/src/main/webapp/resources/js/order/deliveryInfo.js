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