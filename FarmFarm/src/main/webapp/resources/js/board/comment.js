function selectCommentList(){

    $.ajax({
        url : "/board/comment/list",
        data : {"boardNo" : boardNo},
        dataType : "JSON",
        success : (coList)=>{

            console.log(coList);

            // 화면에 나온 댓글들을 싹 지웁니다
            const commentList = document.querySelector(".comment-list");
            commentList.innerHTML="";

            // 댓글 li태그
            const commentRow = document.createElement("li");
            commentRow.classList.add("comment-row");

            
            // 댓글 작성자의 인적사항
            const commentWriter = document.createElement("div");
            commentWriter.classList.add("comment-writer");


            // 댓글이 없다면!
            if(coList == null){
                commentWriter.classList.add("emptyComment");
                commentWriter.innerText = "첫 번째 댓글을 달아보세요";
                
            }else{ // 댓글이 있따면!!
    
                // coList 요소들을 하나씩 꺼내볼까요~?
                for(let comment of coList){
    
    
                    // 자식 댓글인 경우
                    if(comment.commentParent != 0){
                        commentRow.classList.add("comment-child")
                    }
    
    
                    // 댓글 작성자의 프로필 이미지
                    const writerProfile = document.createElement("div");
                    writerProfile.classList.add("writer-profile")
                    const profileImage = document.createElement("img");
                    if(comment.profileImg != null){ // 등록된 프로필 이미지 있음
                        profileImage.setAttribute("src", comment.profileImg);
                    }else{
                        profileImage.setAttribute("src", "");
                    }
    
                    // 작성자 이름
                    const writerName = document.createElement("div");
                    writerName.classList.add("writer-name");
                    writerName.innerText = comment.memberNickname;
    
                    // // 댓글 좋아용~
                    // const commentLike = document.createElement("div");
                    // commentLike.classList.add("comment-like");
    
                    // 댓글 내용 부분
                    const commentContent = document.createElement("div");
                    commentContent.classList.add("comment-content");
                    // 댓글 내용
                    const contentPre = document.createElement("pre");
                    contentPre.innerText = comment.commentContent;

                    // 작성일 + 답글달기
                    // 작성일
                    const writeTimeReply = document.createElement("div");
                    writeTimeReply.classList.add("writer-time-reply");
                    writeTimeReply.innerText = comment.commentDate + '&nbsp; |';
                    // 답글달기
                    const commentReply = document.createElement("span");
                    commentReply.classList.add("comment-reply");
                    commentReply.innerText = ' &nbsp;답글달기';
    
                    // 자~ append 해볼까
                    commentRow.append(commentContent,writeTimeReply);
    
                    commentWriter.append(writerProfile, writerName);
                    writerProfile.append(profileImage);

                    commentContent.append(contentPre);

                    writeTimeReply.append(commentReply);

                }

                // 자~ append 해볼까
                commentList.append(commentRow);
    
                commentRow.append(commentWriter);

            }

        },
        error : (req, status, error)=>{
            console.log("댓글 ajax 통신 실패ㅠㅜ");
        }
    });
}