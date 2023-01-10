(()=>{
  
  /* 여기 추가_ 신고 당하는 회원 번호 */
  var targetMemberNo;

  /* 게시글 목록에서 실행됩니당~ */
  const boardWriter = document.getElementsByClassName("board-writer");
  if(boardWriter.length > 0){ 

      // Modal 관련 요소 얻어오기
      const modal = document.querySelector(".modal");
      const modalClose = document.getElementById("modal-close");
      const modalImage = document.getElementById("modal-text");

      if(loginYN != ""){ 

        for(let th of boardWriter){
          if(th.innerText != "관리자"){ /* 여기 추가했습니다. */
            th.addEventListener("click", () => {
                modal.classList.toggle("show");
                modalImage.setAttribute("src", th.getAttribute("src"));
                selectMember(th.id);
            });
          }
        }
        
        // x버튼 동작
        modalClose.addEventListener("click", () => {
            // hide 클래스를 추가해서 0.5초 동안 투명해지는 애니메이션 수행
            modal.classList.toggle("hide");
            // 0.5초 후에 show, hide 클래스를 모두 제거
            setTimeout(() => {
                modal.classList.remove("show", "hide");
            }, 500);
        });

      }
  }

  /* 게시글 상세보기에서 실행될겁니당당당~ */
  const commentList = document.querySelector(".comment-list");
  if(commentList != null){
    
    // 프로필 가져오깅
    const writerProfile = document.getElementsByClassName("proImg");

    // Modal 관련 요소 얻어오기
    const modal = document.querySelector(".modal");
    const modalClose = document.getElementById("modal-close");
    const modalImage = document.getElementById("modal-text");

    for(let wPro of writerProfile){
      wPro.addEventListener("click", ()=>{
        modal.classList.toggle("show");
        modalImage.setAttribute("src", wPro.getAttribute("src"));
        selectMember(wPro.id);
      });
    }

    // x버튼 동작
    modalClose.addEventListener("click", () => {
        // hide 클래스를 추가해서 0.5초 동안 투명해지는 애니메이션 수행
        modal.classList.toggle("hide");
        // 0.5초 후에 show, hide 클래스를 모두 제거
        setTimeout(() => {
            modal.classList.remove("show", "hide");
        }, 500);
    });

  }

})();

const modalImgarea = document.getElementById("modalImgarea");
const img = document.createElement("img");
img.classList.add("image");
modalImgarea.append(img);

const memberNickname = document.getElementById("memberNickname");
const modalSignUpDate = document.getElementById("modalSignUpDate");
const modal = document.querySelector(".modal");

const selectMember = (memberNo) => {
  // 신고 당한 프로필의 회원번호 
  targetMemberNo = memberNo;
  console.log(targetMemberNo);

  $.ajax({
    url : "/board/member/" + memberNo,
    data : {"memberNo" : memberNo},
    dataType : "JSON",
    success : (member)=>{

      console.log(member.profileImg);
      if(member.profileImg != null) {
        img.setAttribute("src", member.profileImg);
        modalImgarea;
      }else {
        img.setAttribute("src", "/resources/images/myPage/profile/profileImg.png");
        modalImgarea;
      };

      memberNickname.innerText = member.memberNickname;
      memberNickname.setAttribute("id", member.memberNo);
      modalSignUpDate.innerText = "가입일 :" + member.signUpDate;
    }, 
    error : ()=>{
      console.log("ajax 통신 실패");
      if(confirm("로그인 후 이용해주세요.") == true){
        console.log("성공");
        modal.classList.toggle("hide");
        // 문제점 : alert창 확인 누르고 모달창 꺼지면 버튼 클릭이 안됨
      } else{
        console.log("실패");
      }
    }
  })

}
