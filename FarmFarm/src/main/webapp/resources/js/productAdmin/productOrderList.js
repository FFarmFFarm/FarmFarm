(()=>{
  const select = document.getElementById("searchKey");
  const input = document.getElementById("searchQuery");
  const option = document.querySelectorAll("#searchKey>option");

  if(select!=null){
    const params = new URL(location.href).searchParams;

    const key = params.get("key");
    const query = params.get("query");

    input.value = query;

    for(let op of option){
      if(op.value == key){
        op.selected = true;
      }
    }
  }

})();

const tableRow = document.getElementsByClassName("table-row");
const orderDetail = document.getElementById("orderDetail");
for(item of tableRow){
  item.addEventListener("click",()=>{

    displayFlex(orderDetail);
  })
};

// 모달 뒤로가기 버튼
const detailBackBtn = document.getElementById('detailBackBtn');
if(detailBackBtn!=undefined){
  
  detailBackBtn.addEventListener('click', () => {
    displayNone(orderDetail);

  })
};
