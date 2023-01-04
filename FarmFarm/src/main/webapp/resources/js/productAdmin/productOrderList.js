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