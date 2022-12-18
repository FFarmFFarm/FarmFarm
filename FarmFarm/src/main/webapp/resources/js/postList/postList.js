/* body */
const body = document.getElementsByName("body");

/* top 버튼 */
const topBtn = document.getElementById("topBtn");

/* top 버튼 보이기 */
window.addEventListener("scroll", ()=> {
    if(topBtn.classList.contains('view-hidden')) {
        if(window.scrollY >= 1000) {
            topBtn.classList.remove('view-hidden');
            topBtn.classList.add('view-flex');
            console.log("실행되고있나요");
            return;
        }
    }
    if(topBtn.classList.contains('view-flex')) {
        if(window.scrollY < 1000) {
            topBtn.classList.add('view-hidden');
            topBtn.classList.remove('view-flex');
            console.log("실행되고있나요");
            return;
        }
    }
})

/* top 버튼 클릭 시 맨 위로 */
topBtn.addEventListener("click", ()=>{
    if(topBtn.classList.contains('view-flex')) {
        topBtn.classList.add('view-hidden');
        topBtn.classList.remove('view-flex');
        scrollTo(0,0);
    }
})