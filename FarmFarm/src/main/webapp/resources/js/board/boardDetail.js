
// 해당 게시판에 언더바 나오게 하기~
const type1 = document.getElementById("type1");
const type2 = document.getElementById("type2");
const type3 = document.getElementById("type3");
const boardTopTitle  = document.querySelector(".board-top-title");
if(boardTypeNo == 1){
    type1.classList.add("nowType");
    type2.classList.remove("nowType");
    type3.classList.remove("nowType");
    boardTopTitle.innerText = "";
    boardTopTitle.innerText = "와글와글 물물교환";
}
if(boardTypeNo == 2){
    type1.classList.remove("nowType");
    type2.classList.add("nowType");
    type3.classList.remove("nowType");
    boardTopTitle.innerText = "";
    boardTopTitle.innerText = "와글와글 팁";
}
if(boardTypeNo == 3){
    type1.classList.remove("nowType");
    type2.classList.remove("nowType");
    type3.classList.add("nowType");
    boardTopTitle.innerText = "";
    boardTopTitle.innerText = "와글와글 질문";
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
if(likeBtn != null){

    likeBtn.addEventListener("click", ()=>{
    
        const heartIcon = document.getElementById("boardLike")
        const likeCount = document.getElementById("likeCount")
    
        // 좋아요 취소하는 경우
        if(heartIcon.classList.contains("checkLike")){
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
}

// 해야되는게 삭제하기 수정하기인데 삭제랑 수정을 
// 모달으로 물어볼지 아님 컨펌으로 할지 잘 생각해보기
// 그 다음에 댓글 수정 삭제 답글 하자!

// 게시글 작성자가 삭제하기~
const boardDelete = document.getElementById("boardDelete");
if(boardDelete != null){
    boardDelete.addEventListener("click", ()=>{
        
        if(confirm("게시글을 삭제하시겠습니까?")){
            location.href = location.pathname+"/delete";
        }
        
    })
};
// 게시글 관리자가 삭제하기~
const adminBoardDelete = document.getElementById("adminBoardDelete");
if(adminBoardDelete != null){
    adminBoardDelete.addEventListener("click", ()=>{
        if(confirm("관리자 권한으로 게시글을 삭제하시겠습니까?")){
            location.href = location.pathname+"/delete";
        }
    })
}


// 게시글 수정하기!
const boardUpdate = document.getElementById("boardUpdate");
if(boardUpdate != null){
    boardUpdate.addEventListener("click", ()=>{
        
        if(confirm("게시글을 수정하시겠습니까?")){
            // if(boardTypeNo == 1){
    
            // }
            const pathname = location.pathname
            location.href = pathname + "/update" + location.search;
        }
    })
}


