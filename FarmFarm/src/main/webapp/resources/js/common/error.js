// 새로고침
document.getElementById('retry').addEventListener('click', ()=>{
  const url = location.href;
  location.href = url;
})

// 뒤로가기
document.getElementById('goBack').addEventListener('click', ()=>{
  history.back();
})