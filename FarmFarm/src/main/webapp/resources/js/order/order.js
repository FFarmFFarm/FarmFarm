// kakaoBtn.addEventListener('click', () => {
  //   if (!kakaoBtn.classList.contains('pay-clicked')) {
    //     kakaoBtn.classList.add('pay-clicked');
//   } else {
//     kakaoBtn.classList.remove('pay-clicked');
//   }
// })

function selectAllCheckbox(selectAll) {
  const checkboxes = document.getElementsByName('agreement');
  
  for (let checkbox of checkboxes) {
    checkbox.checked = selectAll.checked;
  }
}


const paymentCheckbox = document.getElementById('payment');
const kakaoBtn = document.getElementById('kakaoBtn');
paymentCheckbox.addEventListener('change', ()=>{
  if(paymentCheckbox.checked === true) {
    kakaoBtn.classList.add('pay-clicked');
  } else {
    kakaoBtn.classList.remove('pay-clicked');
  }

})




// 결제 요청하기
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
  }, function (rsp) { //callback
      if (rsp.success) {

        // 알림을 전송합니다
        ringOrderNotify();

        // 결제 완료 시 결제 완료 메세지 출력
        msg = '결제가 완료되었습니다.';
        msg += '\n결제 금액 : ' + rsp.paid_amount;
        // msg += '\n결제 번호 : ' + rsp.imp_uid;

        alert(msg);

        const impUid = rsp.imp_uid
        confirmBuy(impUid);

      } else {

        msg = '결제에 실패하였습니다.';
        msg += '\n에러내용 : ' + rsp.error_msg;
        alert(msg);

      }
  });
}


/* 결제 검증 완료 시 주문서 Form 제출 및 DB 저장*/
const confirmBuy = (impUid) => {

  // $.ajax({
  //   url: '/order/confirm',
  //   data: { "orderPrice": orderPrice, 'impUid':impUid},
  //   success: (result) => { 
  //     if (result != '실패') {
  //       document.getElementById('impUid').value = result;
  //       console.log(result);
  //       document.getElementById("orderForm").submit();
  //     } else {
  //       alert("결제 실패");
        
  //     }
  //   }
  // })

  axios.get('/order/confirm/' + impUid, {
    params: {"orderPrice": orderPrice}
  }).then((response) => {
    if (response.data != '실패') {
      document.getElementById('impUid').value = response.data;
      document.getElementById("orderForm").submit();
    } else {
      alert("결제 실패");
      
    }   
  }).catch((err) => {
    console.log("결제 검증 도중 예외 발생\n" + err);
  });

}


const form = document.getElementById('orderForm');
const btn = document.getElementById('btn');

btn.addEventListener('click', (e) => {



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


// /* 토큰 얻어오기 */
// const getToken = () => { 

//   // $.ajax({
//   //   url: "/order/token",
//   //   data: { 'orderNo': confirmOrderNo },
//   //   dataType: 'json',
//   //   success: (data) => { 
//   //     console.log(data.response.access_token);
//   //     const access_token = data.response.access_token;
//   //     return access_token;
//   //   }
//   // })

//   axios.get('/order/token/' + confirmOrderNo)
//   .then((response) => {
//     console.log(response.data.response.access_token);
//     const access_token = response.data.response.access_token;
//     return access_token;
//   }).catch((err) => {
//     console.log("결제 토큰 발급 중 예외 발생\n" + err);
//   });
// }


/* 주문 알림을 발생시키는 함수 */
const ringOrderNotify = () => {



  let notifyContent = itemName + "의 주문이 완료되었습니다!"

  let obj = {
    "notifyTypeNo":301, 
    "memberNo":memberNo,
    "notifyContent":notifyContent,
    "quickLink":"/myPage"
  }

  notifySock.send(JSON.stringify(obj));

}