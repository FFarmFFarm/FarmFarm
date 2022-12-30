
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


const payment = (form) => {



} 