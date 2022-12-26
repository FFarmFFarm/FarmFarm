
// 해당 게시판에 언더바 나오게 하기~
const type1 = document.getElementById("type1");
const type2 = document.getElementById("type2");
const type3 = document.getElementById("type3");
if(boardTypeNo == 1){
    type1.classList.add("nowType");
    type2.classList.remove("nowType");
    type3.classList.remove("nowType");
}
if(boardTypeNo == 2){
    type1.classList.remove("nowType");
    type2.classList.add("nowType");
    type3.classList.remove("nowType");
}
if(boardTypeNo == 3){
    type1.classList.remove("nowType");
    type2.classList.remove("nowType");
    type3.classList.add("nowType");
}

// 목록으로 가기 버튼~
const goList = document.querySelector(".goList");
goList.addEventListener("click", ()=>{
    const pathname = location.pathname;
    const queryString = location.search;

    const url = pathname.substring(0, pathname.lastIndexOf("/"))+queryString;

    location.href = url;
})



//좋아요
const likeBtn = document.querySelector(".board-like");
likeBtn.addEventListener("click", ()=>{

    const heartIcon = document.getElementById("boardLike")
    const likeCount = document.getElementById("likeCount")

    // 좋아요 취소하는 경우
    if(heartIcon.classList.contains("fa-solid")){
        $.ajax({
            url : "/boardLikeDelete",
            data : {"boardNo":boardNo, "memberNo":memberNo},
            success : (result)=>{

                if(result>0){ // 좋아요 취소 성공
                    heartIcon.classList.remove("checkLike");
                    heartIcon.classList.remove("fa-solid");
                    heartIcon.classList.add("fa-regular");
                    likeCount.innerText=Number(likeCount.innerText)-1;
                }else{
                    console.log("좋아요 취소 실패");
                }
            },
            error : ()=>{
                console.log("좋아요 취소 통신 실패");
            }
        });
    }
    else{
    // if(e.target.classList.contains('fa-regular')){
        // 좋아요 누르기~
        $.ajax({
            url:"/boardLikeInsert",
            data : {"boardNo":boardNo, "memberNo":memberNo},
            success : result=>{
    
                if(result>0){
                    heartIcon.classList.add("fa-solid");
                    heartIcon.classList.remove("fa-regular");
                    heartIcon.classList.add("checkLike");
                    likeCount.innerText = Number(likeCount.innerText)+1;
                }else{
                    console.log("좋아요 실패ㅠ");
                }
            },
            error : ()=>{
                console.log("좋아요 통신 실패..");
            }
        });

    }
    

});

