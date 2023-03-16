// 새로고침
const retry = document.getElementById('retry');
if (retry != null) {
  retry.addEventListener('click', () => {
    const url = location.href;
    location.href = url;
  })
}


// 뒤로가기
const goBack = document.getElementById('goBack');
if (goBack != null) {
  goBack.addEventListener('click', () => {
    console.log(history);
    history.back();
  })
}
