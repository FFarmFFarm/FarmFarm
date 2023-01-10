function selectAllCheckbox(selectAll) {
  const checkboxes = document.getElementsByClassName('productNo');

  for (let checkbox of checkboxes) {
    checkbox.checked = selectAll.checked;
  }
}


var checkObj = {
  'checkbox': false,
  'returnReason': false,
  'accountName': false,
  'accountNo': false
};

const returnSubmit = (event) => {

  const form = document.getElementById('returnForm');
  const checkbox = document.getElementsByClassName('productNo');

  
  for (let i = 0; i < checkbox.length; i++) {

    if (!checkbox[i].checked) {

      // 체크되지 않은 체크박스 제출 X
      checkbox[i].setAttribute('disabled', 'true');
      // 수량 가져와서 제출안되게
      const amount = document.getElementById('amount' + i);
      amount.setAttribute('disabled', 'true');

    } else {
      console.log(checkbox[i].checked);
    }
  }


  // 체크박스중 하나라도 선택돼있으면 key = true
  for (let box of checkbox) {
    if (box.checked) {
      checkObj['checkbox'] = true;
    }
  }

  // 반품 사유 선택돼있으면 true
  const returnReason = document.getElementsByName("returnReason");
  for (let radio of returnReason) {
    if (radio.checked) {
      checkObj['returnReason'] = true;
    }
  }

  // 예금주 입력 돼있으면 true
  const accountName = document.getElementById("accountName");
  console.log(accountName);
  if (accountName.value.trim().length > 0) {
      checkObj['accountName'] = true; 
    }
  
  // 계좌번호 입력 돼있으면 true
  const accountNo = document.getElementById("accountNo");
  if (accountNo.value.trim().length > 0) {
      checkObj['accountNo'] = true; 
    }


  /* key중 하나라도 false이면 제출 x */
  for (let key in checkObj) {
    let str;

    if (!checkObj[key]) { 

      switch (key) {
        case 'checkbox': str = "최소 한 개 이상의 상품을 선택해주세요"; break;
        case 'returnReason': str = "반품 사유를 선택해주세요"; break;
        case 'accountName': str = "예금주명을 입력해주세요"; break;
        case 'accountNo': str = "계좌번호를 입력해주세요"; break;
      }

      messageModalOpen(str);

      event.preventDefault();
      return;
    }
  }



  setTimeout(() => {
    form.submit();

  }, "1000");

}




// document.getElementById('accountNo').addEventListener('input', e => { 

//   if(e.target.value.)

// })