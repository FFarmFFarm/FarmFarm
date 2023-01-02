
function selectCommentList(){

    $.ajax({
        url : "/board/comment/list",
        data : {"boardNo" : boardNo},
        dataType : "JSON",
        success : (coList)=>{

            console.log(coList);

            // 댓글이 없다면!
            if(coList.length == 0){
                commentWriter.classList.add("emptyComment");
                commentWriter.innerText = "첫 번째 댓글을 달아보세요";
                
            }else{ // 댓글이 있따면!!
                
                
                // 화면에 나온 댓글들을 싹 지웁니다
                const commentArea1 = document.querySelector(".comment-area");
                commentArea1.innerHTML="";

                const commentCount = document.createElement("div");
                commentCount.classList.add("comment-count");
                
                const commentWrite = document.createElement("div");
                commentWrite.classList.add("comment-write");
                
                const commentForm = document.createElement("div");
                commentForm.classList.add("comment-form");
                
                const writeComment = document.createElement("textarea");
                writeComment.classList.add("write-comment");
                writeComment.setAttribute("name", "commentContent");
                writeComment.setAttribute("spellcheck", "false");

                const commentSide = document.createElement("div");
                commentSide.classList.add("comment-side");

                const commentCaution = document.createElement("div");
                commentCaution.classList.add("comment-caution");
                commentCaution.innerText="※댓글 작성시 상대방에 대한 배려와 책임을 담아 깨끗한 댓글 환경에 동참에 주세요.";

                const secreteCo = document.createElement("span");
                secreteCo.classList.add("secrete-co");
                const lockCheck = document.createElement("input");
                lockCheck.classList.add("lockCheck");
                lockCheck.setAttribute("type", "checkbox");
                const labelCheck = document.createElement("label");
                labelCheck.setAttribute("for", "lockCheck");
                labelCheck.innerHTML="&nbsp;비밀댓글";
                secreteCo.append(lockCheck, labelCheck);
                
                let checkok;
                lockCheck.addEventListener("change", (e)=>{
                    if(e.target.checked){
                        
                        checkok = 1;
                        commentInsert.setAttribute("onclick", "commentFunction("+checkok+")");
                        console.log("선택됨");
                    }else{
                        checkok = 0;
                        commentInsert.setAttribute("onclick", "commentFunction("+checkok+")");
                        console.log("선택취소");
                    }
                });

                const commentInsert = document.createElement("button"); 
                commentInsert.classList.add("comment-insert"); 
                commentInsert.setAttribute("onclick", "commentFunction("+checkok+")");
                commentInsert.innerHTML = "등록";
                

                const commentList = document.createElement("ul");
                commentList.classList.add("comment-list");
                // coList 요소들을 하나씩 꺼내볼까요~?
                for(let comment of coList){
                    
                    commentCount.innerText = "댓글 "+comment.commentCount;
                    // 댓글 li태그
                    const commentRow = document.createElement("li");
                    commentRow.classList.add("comment-row");
                    commentRow.setAttribute("id", "co" + comment.commentNo);
        
                    
                    // 댓글 작성자의 인적사항
                    const commentWriter = document.createElement("div");
                    commentWriter.classList.add("comment-writer");
    
                    // 자식 댓글인 경우
                    if(comment.commentParent != 0){
                        commentRow.classList.add("comment-child")
                    }

    
                    // 댓글 작성자의 프로필 이미지
                    const writerProfile = document.createElement("div");
                    writerProfile.classList.add("writer-profile");
                    const profileImage = document.createElement("img");
                    profileImage.classList.add("proImg");
                    if(comment.profileImg != null){ // 등록된 프로필 이미지 있음
                        profileImage.setAttribute("src", comment.profileImg);
                    }else{
                        profileImage.setAttribute("src", "/resources/images/myPage/profile/profileImg.png");
                    }
    
                    // 작성자 이름
                    const writerName = document.createElement("div");
                    writerName.classList.add("writer-name");
                    writerName.innerText = comment.memberNickname;
    
                    // // 댓글 좋아용~
                    // const commentLike = document.createElement("div");
                    // commentLike.classList.add("comment-like");
    
                    // 댓글 내용 부분
                    const commentArea = document.createElement("div");
                    commentArea.classList.add("content-area");

                    const commentContent = document.createElement("div");
                    commentContent.classList.add("comment-content");
                    const lockIcon = document.createElement("i");
                    lockIcon.classList.add("fa-solid");
                    lockIcon.classList.add("fa-lock");

                    if(memberNo == comment.memberNo && comment.commentDelFl == 'S'){
                        commentContent.innerHTML='<i class="fa-solid fa-lock"></i>&nbsp;'+comment.commentContent;
                        // lockIcon.innerHTML="&nbsp;"+comment.commentContent;
                        // commentContent.append(lockIcon);
                    }else if (comment.memberNo == comment.parentNo && comment.commentDelFl == 'S') {
                        commentContent.innerHTML='<i class="fa-solid fa-lock"></i>&nbsp;'+comment.commentContent;
                        // lockIcon.innerHTML="&nbsp;"+comment.commentContent;
                        // commentContent.append(lockIcon);
                    }else if (memberNo == boardMemNo && comment.commentDelFl == 'S') {
                        commentContent.innerHTML='<i class="fa-solid fa-lock"></i>&nbsp;'+comment.commentContent;
                        // lockIcon.innerHTML="&nbsp;"+comment.commentContent;
                        // commentContent.append(lockIcon);
                    }else if (comment.commentDelFl == 'S' && comment.memberNo != comment.parentNo) {
                        commentContent.innerHTML='<i class="fa-solid fa-lock"></i>&nbsp;비밀댓글입니다.';
                    }else if (loginAuth == 2 && comment.commentDelFl == 'S') {
                        commentContent.innerHTML='<i class="fa-solid fa-lock"></i>&nbsp;'+comment.commentContent;
                    } else {
                        commentContent.innerHTML = comment.commentContent;
                    }
                    

                    // 작성일 + 답글달기
                    // 작성일
                    const writeTimeReply = document.createElement("div");
                    writeTimeReply.classList.add("writer-time-reply");
                    writeTimeReply.innerHTML = comment.commentDate + '&nbsp; ';
                    
                    if(commentRow.classList.contains("comment-child")){
                        writerProfile.classList.add("child-img");
                        writerName.classList.add("child-content");
                        commentContent.classList.add("child-content");
                    }else{
                        writerProfile.classList.add("parent-img");
                    }

    
                    // 자~ append 해볼까

                    
                    commentWrite.append(commentForm);
                    commentForm.append(writeComment, commentSide);
                    commentSide.append(commentCaution, secreteCo,commentInsert);
                    
                    commentList.append(commentRow);
                    commentRow.append(commentWriter, commentArea);

                    commentArea.append(commentContent,writeTimeReply)
                    
                    commentWriter.append(writerProfile, writerName);
                    writerProfile.append(profileImage);
                    
                    // 답글달기 수정 삭제 
                    const commentReply = document.createElement("button");
                    const commentUpdate = document.createElement("button");
                    const commentDelete = document.createElement("button");

                    commentReply.classList.add("comment-reply");
                    commentUpdate.classList.add("comment-reply");
                    commentDelete.classList.add("comment-reply");

                    commentReply.setAttribute("onclick", "showReply("+comment.commentNo+", this)");
                    commentReply.innerHTML = '| &nbsp;&nbsp;답글달기&nbsp;&nbsp;';
                    commentUpdate.setAttribute("onclick", "showUpdateComment("+comment.commentNo+", this)");
                    commentUpdate.innerHTML = "|&nbsp;&nbsp;수정&nbsp;&nbsp;";
                    commentDelete.innerHTML = "|&nbsp;&nbsp;삭제&nbsp;&nbsp;";
                    

                    if(loginAuth == 2){
                        if(memberNo == comment.memberNo && comment.commentDelFl != 'Y'){
                            commentDelete.setAttribute("onclick", "deleteComment("+comment.commentNo+")")
                            writeTimeReply.append(commentReply, commentUpdate, commentDelete);
                        }
                        if(memberNo != comment.memberNo && comment.commentDelFl != 'Y'){
                            commentDelete.setAttribute("onclick", "adDeleteComment("+comment.commentNo+")")
                            writeTimeReply.append(commentReply, commentDelete);
                        }
                    }else{
                        if(memberNo == comment.memberNo && comment.commentDelFl != 'Y'){
                            commentDelete.setAttribute("onclick", "deleteComment("+comment.commentNo+")")
                            writeTimeReply.append(commentReply, commentUpdate, commentDelete);
                        }
                        if(memberNo != comment.memberNo && comment.commentDelFl != 'Y'){
                            writeTimeReply.append(commentReply);
                        }
                    }
                    // console.log(comment.commentParent);
                    // if(comment.commentParent == 0){
                    //     window.scrollTo(0, document.querySelector('body').scrollHeight)
                    // }
                }
                commentArea1.append(commentCount, commentWrite, commentList);

            }
        },
        error : (req, status, error)=>{
            console.log("댓글 ajax 통신 실패ㅠㅜ");
        }
    });
}


// 댓글 등록
const commentFunction=(checkok)=>{

    const writeComment = document.querySelector(".write-comment");



        // 1. 로그인이 되었는가
    
        // 댓글 작성이 됐는지 확인을 해볼까요~?
        if(writeComment.value.trim().length == 0){
            messageModalOpen("댓글을 작성해주세요.");
            writeComment.value="";
            writeComment.focus();
            // e.preventDefault();
        }else{
            // ajax로 댓글을 삽입해봅시다!
            $.ajax({
                url : "/board/comment/insert",
                data : {"boardNo" : boardNo,
                        "memberNo" : memberNo,
                        "commentContent" : writeComment.value,
                        "checkok" : checkok},
                type : "post",
                success : result=>{
        
                    if(result>0){
                        
                        ringCommentNotify('board', 201, boardNo, writeComment.value, result);

                        messageModalOpen("댓글이 등록되었습니다.");
                        writeComment.value=""; // 작성한 댓글 없애주기
                        selectCommentList(); // 다시 ajax로 불러옵시다!
                        // 댓글을 등록 시 스크롤 이동!! 
                        window.scrollTo(0, document.querySelector('body').scrollHeight);

                    }else{
                        alert("댓글 등록에 실패했습니다...");
                    }
                },
                error : (req, status, error)=>{
                    alert("댓글 등록 ajax 통신오류...ㅜㅠ");
                    console.log("댓글 등록 ajax 통신오류...ㅜㅠ");
                }
            });

        }
    // });
    
}


// 답글 달기 해보자!
// 답글 달기를 누르면 답글 다는 박스가 새로 생겨야 돼.
const showReply = (parentNo, btn)=>{

    // 답글 작성 중 다른 답글을 작성하고자 할 때
    // 임시로 하나 만들어준거야
    const temp = document.getElementsByClassName("comment-co-content")
    if(temp.length > 0){

        // 다른 답글에 다시 달래 했을 때 밑의 모든 자식들을 지워줄거야
        if(confirm("다른 답글을 작성 중입니다. 현재 답글에 작성하시겠습니까?")){
            temp[0].nextElementSibling.remove();
            temp[0].remove();
        }else{
            // 아니라면 그냥 함수를 종료 시켜줄거야
            return;
        }
    }
        // 답글을 작성할 부분들을 만들어 볼까요~?

        // textarea를 만들어볼게요~
        const textarea = document.createElement("textarea");
        textarea.classList.add("comment-co-content");
        textarea.setAttribute("spellcheck", "false");

        // btn의 부모 요소 다음에 추가 해볼까요?
        btn.parentElement.after(textarea);

        // 버튼들을 감쌀 div태그를 만들어볼게요
        const btnArea = document.createElement("div");
        // btnArea.classList.add("co-btn-area");
        
        // 답글 보내기 버튼~
        const sendCo  = document.createElement("button");
        sendCo.classList.add("send-co");
        sendCo.innerText = "답글 보내기";
        sendCo.setAttribute("onclick", "sendCo("+parentNo+", this)");
        
        // 답글 취소 버튼~
        const cancleCo = document.createElement("button");
        cancleCo.classList.add("cancle-co");
        cancleCo.innerText = "취소";
        cancleCo.setAttribute("onclick", "cancleCo(this)");
        
        // 버튼 공간에 버튼들을 넣어줄까요?
        btnArea.append(sendCo, cancleCo);
        
        // 버튼 공간을 textarea다음에 넣어줘요~
        textarea.after(btnArea);
        
        // 자식인지 부모인지 확인을 해보고 textarea 크기를 따로 지정을 해주자~
        const commentRow = btn.parentElement.previousElementSibling;
        if(commentRow.classList.contains("child-content")){
            textarea.classList.add("ch-textarea");
            btnArea.classList.add("co-btn-area-c");
        }else{
            textarea.classList.add("pa-textarea");
            btnArea.classList.add("co-btn-area-p");
        }
        textarea.focus();
}

// 답글 취소를 누르면 없어지게 만들어보아요~~
function cancleCo(btn){
    // 취소 버튼의 부모의 전 요소를 지워요
    btn.parentElement.previousElementSibling.remove();
    // 취소 버튼의 부모를 지워요
    btn.parentElement.remove();
}

// 답글을 보내봐요~
function sendCo(parentNo, btn){

    // textarea 값을 지정해줄까요?
    const textarea = btn.parentElement.previousElementSibling;

    // textarea의 값을 저장합니다.
    const commentContent = textarea.value;
    console.log(commentContent);

    if(commentContent.trim().length == 0){
        messageModalOpen("답글이 작성되지 않았어요. 답글을 작성해주세요.");
        // alert("답글이 작성되지 않았어요. 답글을 작성해주세요");
        commentContent.value="";
        commentContent.focus();
        return;
    }

    // ajax를 이용해서 답글을 등록해볼까요!
    $.ajax({
        url : "/board/comment/insert",
        data : {"boardNo" : boardNo,
                "memberNo" : memberNo,
                "commentContent" : commentContent,
                "commentParent" : parentNo},
        type : "post",
        success : result=>{
            if(result>0){

                ringCommentNotify('comment', 202, parentNo, commentContent, result);

                messageModalOpen("답글이 등록됐습니다.");
                // alert("답글이 등록됐습니다.");
                selectCommentList();
            }else{
                alert("답글 등록 시류ㅐㅠㅠㅠㅜㅠㅜ");
            }
        },
        error : ()=>{
            alert("답글 ajax 통신 오류ㅠ");
        }
    });

}



// 댓글 수정 화면으로 바꿔 볼까요~?

// 수정 전 원래 모양을 저장합니다~
let beforeCommentARea; 

function showUpdateComment(commentNo, btn){

    // 댓글 수정은 하나만 되야 하니까 임시로 만들어줘볼까?
    const temp = document.getElementsByClassName("update-textarea");

    if(temp.length > 0){
        if(confirm("다른 댓글을 수정 중입니다. 현재 댓글을 수정하시겠습니까?")){
            temp[0].parentElement.innerHTML = beforeCommentARea;
        }else{
            return;
        }
    }

    // 선택된 댓글 li
    const commentRow = btn.parentElement.parentElement.parentElement;

    // 댓글 수정이 클릭 댓글 내용 나오는 부분
    const commentArea = btn.parentElement.parentElement;

    // 댓글 수정 시 원래 내용을 저장해볼까요?
    beforeCommentARea = commentArea.innerHTML;

    // 댓글에 작성 되었떤 내용을을 얻어와볼까
    let beforeContent  = btn.parentElement.previousElementSibling.innerHTML;

    // 댓글 부분을 싹 지워줍니다.
    commentArea.innerHTML = "";

    // 이들을 감싸고 있는 div를 만들어보자
    const commentContent = document.createElement("div");
    commentContent.classList.add("comment-content");

    // textarea 만들어주고 클래스도 추가해주자
    const paTextarea  = document.createElement("textarea");
    paTextarea.setAttribute("spellcheck", "false");
    // paTextarea.classList.add("update-textarea");
    // 자식이면
    if(commentRow.classList.contains("comment-child")){
        paTextarea.classList.add("update-child");
    }else{
        paTextarea.classList.add("update-parent");
    }

    // ******************************************
    // XSS 방지 처리 해제
    beforeContent =  beforeContent.replaceAll("&amp;", "&");
    beforeContent =  beforeContent.replaceAll("&lt;", "<");
    beforeContent =  beforeContent.replaceAll("&gt;", ">");
    beforeContent =  beforeContent.replaceAll("&quot;", "\"");
    
    // 개행문자 처리 해제
    beforeContent =  beforeContent.replaceAll("<br>", "\n");

    paTextarea.value = beforeContent;

    // 행에 댓글 작성 부분 추가
    commentRow.append(commentArea);

    commentArea.append(commentContent);

    
    // 버튼 영역 추가하기~
    const updateBtnArea = document.createElement("div");
    updateBtnArea.classList.add("update-parent-btn");

    const paUpdate = document.createElement("button");
    const paCancle = document.createElement("button");

    paUpdate.classList.add("pa-update");
    paCancle.classList.add("pa-cancle");

    paUpdate.innerText = "수정하기";
    paCancle.innerText = "취소";

    paUpdate.setAttribute("onclick", "updateComment("+commentNo+", this)");
    paCancle.setAttribute("onclick", "deleteCancle(this)");

    commentContent.append(paTextarea, updateBtnArea);
    updateBtnArea.append(paUpdate, paCancle);

};

// 댓글 수정 취소를 해볼까요,,,,,
function deleteCancle(btn){
    if(confirm("댓글 수정을 취소하시겠습니까?")){
        btn.parentElement.parentElement.parentElement.innerHTML = beforeCommentARea;
    }
}


// 댓글 수정을 해볼까요....
function updateComment(commentNo, btn){

    const commentContent = btn.parentElement.previousElementSibling.value;

    $.ajax({
        url : "/board/comment/update",
        data : {"commentNo" : commentNo,
                "commentContent" : commentContent},
        type : "post",
        success : result=>{

            if(result>0){
                messageModalOpen("댓글이 수정되었습니다.");
                // alert("댓글이 수정되었습니다.");
                selectCommentList();
            }else{
                alert("댓글 수정 실패ㅜㅠ");
            }
        },
        error : ()=>{
            alert("댓글/답글 수정 ajax 통신 오류ㅠ")
        }
    });
}


// 댓글 삭제를 해봅시다!! 
const deleteComment = (commentNo)=>{
    
    if(confirm("댓글을 삭제하시겠습니까?")){
        $.ajax({
            url : "/board/comment/delete",
            data : {"commentNo" : commentNo,
            "authority" : loginAuth},
            success : result=>{
                if(result>0){
                    messageModalOpen("댓글이 삭제되었습니다.");
                    // alert("댓글이 삭제되었습니다.");
                    selectCommentList();
                }else{
                    alert("댓글 삭제 시류ㅐㅜㅠ");
                }
            },
            error : (req, status, error)=>{
                alert("댓글 삭제 ajax 통신 실패")
            }
        })
    }
    
}
const adDeleteComment = (commentNo)=>{
    if(confirm("관리자 권한으로 댓글을 삭제하시겠습니까?")){
        $.ajax({
            url : "/board/comment/delete",
            data : {"commentNo" : commentNo,
            "authority" : loginAuth},
            success : result=>{
                if(result>0){
                    messageModalOpen("댓글이 삭제되었습니다.");
                    // alert("댓글이 삭제되었습니다.");
                    selectCommentList();
                }else{
                    alert("댓글 삭제 시류ㅐㅜㅠ");
                }
            },
            error : (req, status, error)=>{
                alert("댓글 삭제 ajax 통신 실패")
            }
        })
    }
}



/* 댓글 알림을 발생시킬 수 있는 함수입니다. */
const ringCommentNotify = (type, typeNo, inputNo, inputComment, commentNo) => {

    /* 댓글 알림 */
    /* 
        * 댓글 알림 기능
        1) boardNo를 이용해서, 상대방의 번호를 확인
        2) 상대방의 번호를 받아오면, 댓글 내용(commentContent)와 대상 번호(memberNo), 알림 유형(notifyType)을 소켓으로 전달(send 사용)

        * 파라미터
        1) type : board(게시글에 댓글을 단 경우)
                  comment(댓글에 대댓글을 단 경우)

        2) targetNo : board인 경우 해당 게시글을 작성한 회원
                      comment인 경우 '답글달기' 버튼을 눌렀을 때, 해당 버튼이 들어있는 댓글을 작성한 회원

        3) inputNo : board인 경우 게시글 번호
                     comment인 경우 대댓글이 달린 댓글의 번호
        
        4) inputComment : 댓글

        5) commentNo : 작성된 댓글 번호

        * 고려해볼만한 사항
        1) 댓글 삽입의 결과로 상대방 회원의 번호를 받아오면 더 빠르게 처리할 수 있을 듯! -> 수정이 필요하니까 이야기해보기
        2) 알림창을 눌렀을 때, 해당 페이지로 즉시 이동하게 하려면? -> location.href를 사용해서 해결!

    */
    // 1) 상대방의 번호 확인
    $.ajax({
        url: "/notify/select/targetNo",
        data: {
            "type":type,
            "inputNo":inputNo
        },
        type: "post",
        success : result =>{
            console.log('알림 전송에 성공하였습니다.')

            // 받은 targetNo로 json객체 만들기
            let obj = {
                "notifyTypeNo":typeNo,
                "memberNo":result,
                "notifyContent":inputComment,
                "quickLink":location.href+"#co"+commentNo
            }

            notifySock.send(JSON.stringify(obj));

        },
        error : ()=>{
            console.log('알림 전송에 실패하였습니다.')
        }
    });
};


const lockCheck = document.querySelector(".lockCheck");
const commentInsert = document.querySelector(".comment-insert");
let checkok;
lockCheck.addEventListener("change", (e)=>{
    if(e.target.checked){
        checkok = 1;
        commentInsert.setAttribute("onclick", "commentFunction("+checkok+")");
        console.log("ok");
    }else{
        checkok = 0;
        commentInsert.setAttribute("onclick", "commentFunction("+checkok+")");
        console.log("no");
    }
});