
const kakaoBtn = document.getElementById('kakaoBtn');
kakaoBtn.addEventListener('click', () => {
  if (!kakaoBtn.classList.contains('pay-clicked')) {
    kakaoBtn.classList.add('pay-clicked');
  } else {
    kakaoBtn.classList.remove('pay-clicked');
  }
})

function selectAllCheckbox(selectAll) {
  const checkboxes = document.getElementsByName('agreement');

  for (let checkbox of checkboxes) {
    checkbox.checked = selectAll.checked;
  }
}




function requestPay() {

      
  // IMP.request_pay(param, callback) 결제창 호출
  var IMP = window.IMP;
  IMP.init('imp24224608');
  var msg;

  IMP.request_pay({ // param
      pg: "kakaopay",
      pay_method: "card",
      merchant_uid: "merchant_" + new Date().getTime(),
      name: itemName,
      amount: Number(orderPrice),
      buyer_name: memberName,
      buyer_tel: memberTel,
      buyer_addr: memberAddress,
      buyer_postcode: "01181",
  }, function (rsp) { // callback
      if (rsp.success) {

        msg = '결제가 완료되었습니다.';
        msg += '\n결제 금액 : ' + rsp.paid_amount;
        console.log(rsp);
        alert(msg);

        document.getElementById('tidNo').value = rsp.pg_tid;


        document.getElementById("orderForm").submit();

      } else {

        msg = '결제에 실패하였습니다.';
        msg += '\n에러내용 : ' + rsp.error_msg;
        alert(msg);

      }
  });
}



const form = document.getElementById('orderForm');
const btn = document.getElementById('btn');

btn.addEventListener('click', (e) => {

  const paymentCheckbox = document.getElementById('payment');

  // 결제수단 선택 x 시
  if (!paymentCheckbox.checked === true) {

    messageModalOpen("결제 수단을 선택해주세요");

    e.preventDefault();
    return false;
  }
  
  // 동의 사항 동의 x 시
  const agreement = document.getElementsByName('agreement');

  for (let checkbox of agreement) {
    if (!checkbox.checked) {
      
      messageModalOpen('개인정보 수집/제공에 동의해주세요.');

      e.preventDefault();
      return false;
    }
  }

  requestPay();

})


