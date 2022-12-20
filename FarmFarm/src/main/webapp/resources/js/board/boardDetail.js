
// 좋아요
const likeBtn = document.querySelector(".board-like");
likeBtn.addEventListener("click", ()=>{

    const heartIcon = likeBtn.firstElementChild;
    const likeCount = document.getElementById("likeCount")

    // 좋아요가 눌러진 경우
   if(heartIcon.classList.contains("checkLike")){
        $.ajax({
            url : "boardLikeDelete",
            data : {"boardNo":boardNo, "memberNo":memberNo},
            success : (result)=>{

                if(result>0){ // 좋아요 취소 성공
                    heartIcon.classList.add("checkLike");
                    likeCount.innerText=Number(likeCount.innerText)-1;
                }else{
                    console.log("좋아요 취소 실패");
                }
            },
            error : ()=>{
                console.log("좋아요 취소 통신 실패");
            }
        })
   }else{
    $.ajax({
        url:"boardLikeInsert",
        data : {"boardNo":boardNo, "memberNo":memberNo},
        success : result=>{

            if(result>0){
                heartIcon.classList.add("checkLike");
                likeCount.innerText = Number(likeCount.innerText)+1;
            }else{
                console.log("좋아요 실패ㅠ");
            }
        },
        error : ()=>{
            console.log("좋아요 통신 실패..");
        }
    })
   }

});

