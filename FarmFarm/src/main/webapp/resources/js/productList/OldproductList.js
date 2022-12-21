// /* body */
// const body = document.getElementsByName("body");

// /* top 버튼 */
// const topBtn = document.getElementById("topBtn");

// /* nav 부착 검색창 추가하기 */
// const navSearchBar = document.getElementById("navSearchBar");

// /* top 버튼 및 검색창 보이기 */
// window.addEventListener("scroll", ()=> {

//     if(navSearchBar.classList.contains('view-hidden')) {
//         if(window.scrollY >= 720) {
//             navSearchBar.classList.remove('view-hidden');
//             navSearchBar.classList.add('view-flex');
//             console.log("실행되고있나요2");
//             return;
//         }
//     }

//     if(navSearchBar.classList.contains('view-flex')) {
//         if(window.scrollY < 720) {
//             navSearchBar.classList.add('view-hidden');
//             navSearchBar.classList.remove('view-flex');
//             console.log("실행되고있나요2");
//             return;
//         }
//     }

//     if(topBtn.classList.contains('opacity-zero')) {
//         if(window.scrollY >= 1000) {
//             topBtn.classList.remove('opacity-zero');
//             topBtn.classList.add('opacity-one');
//             console.log("실행되고있나요");
//             return;
//         }
//     }
//     if(topBtn.classList.contains('opacity-one')) {
//         if(window.scrollY < 1000) {
//             topBtn.classList.add('opacity-zero');
//             topBtn.classList.remove('opacity-one');
//             console.log("실행되고있나요");
//             return;
//         }
//     }
// })

// /* top 버튼 클릭 시 맨 위로 */
// topBtn.addEventListener("click", ()=>{
//     if(topBtn.classList.contains('opacity-one')) {
//         topBtn.classList.add('opacity-zero');
//         topBtn.classList.remove('opacity-one');
//         scrollTo(0,0);
//     }
// })