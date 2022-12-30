
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



const form = document.getElementById('orderForm');
const btn = document.getElementById('btn');

btn.addEventListener('click', () => {
  orderSubmit();
})




const orderSubmit = () => {

  const paymentCheckbox = document.getElementById('payment');

  // 결제수단 선택 x 시
  if (!paymentCheckbox.checked === true) {

    messageModalOpen("결제 수단을 선택해주세요");

    return false;
  }

  // 동의 사항 동의 x 시
  const agreement = document.getElementsByName('agreement');

  for (let checkbox of agreement) {
    if (!checkbox.checked) {

      messageModalOpen('개인정보 수집/제공에 동의해주세요.');

      return false;

    }
  }


  form.submit();
}