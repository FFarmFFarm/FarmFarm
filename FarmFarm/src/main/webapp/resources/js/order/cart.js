
const selectOne = document.getElementsByClassName("select-one");

for(let i=0; i<selectOne.length; i++){
  
  selectOne[i].addEventListener("change", (e) => {
    const checkIcon = document.querySelectorAll(".check-icon>i");

    if(!e.target.checked){
        checkIcon[i].classList.remove("fa-solid");
        checkIcon[i].classList.add("fa-regular");
      } else {
      checkIcon[i].classList.remove("fa-regular"); 
      checkIcon[i].classList.add("fa-solid");

    }
      
  })
}

const selectAll = document.getElementById("selectAll");

selectAll.addEventListener("change", (e) => {
  const checkAll = document.querySelector(".check-all>i");

  if(!e.target.checked){
    checkAll.classList.remove("fa-solid");
    checkAll.classList.add("fa-regular");
  } else {
    checkAll.classList.remove("fa-regular"); 
    checkAll.classList.add("fa-solid");
  }
})