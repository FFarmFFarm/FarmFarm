// function selectCommentList(){

//     $.ajax({
//         url : "/board/comment/list",
//         data : {"boardNo" : boardNo},
//         dataType : "JSON",
//         success : (coList)=>{

//             console.log(coList);

//             // 화면에 나온 댓글들을 싹 지웁니다
//             const commentList = document.querySelector(".comment-list");
//             commentList.innerHTML="";

//             // coList 요소들을 하나씩 꺼내볼까요~?
//             for(let comment of coList){
//                 const commentRow = document.createElement("li");
//                 commentRow.classList.add("comment-all-list");
//             }

//         },
//         error : ()=>{
//             console.log("댓글 ajax 통신 실패ㅠㅜ");
//         }
//     });
// }