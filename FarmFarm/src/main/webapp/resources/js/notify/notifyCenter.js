/* 

<가이드라인>


--------------------------------------- 유형 코드 -----------------------------------------
알림 유형
- 채팅(101)
- 채팅 리마인더(102)

- 게시글에 댓글(201)
- 댓글에 대댓글(202)

- 상품 주문 완료(301)
- 구매 확정 요청(302)
- 후기 요청(303)

- 문의 답변(401)

- 신고(501)

---------------------------------------  아이콘 -------------------------------------------

채팅 리마인더 : <i class="fa-solid fa-message"></i>      
배송 알림 : <i class="fa-solid fa-box"></i>
댓글 : <i class="fa-solid fa-comment"></i>
대댓글 : <i class="fa-solid fa-comments"></i>
new 댓글 : <i class="fa-solid fa-comment-dots"></i>
주문 알림 : <i class="fa-solid fa-envelope-open-text"></i>
후기 요청 : <i class="fa-solid fa-pen"></i>
신고 : <i class="fa-solid fa-circle-exclamation"></i>

------------------------------------------ 예시 ------------------------------------------

<div class="notify-box">
    <div class="notify-icon">
        <i class="fa-solid fa-box"></i>
    </div>
    <div class="notify-main">
        <div class="notify-content">
            고구마맛 감자채볶음
        </div>
        <div class="notify-title">
            상품을 받으셨나요?<br>구매 확정 버튼을 눌러주시면 판매자에게 도움이 됩니다!
        </div>
    </div>
    <div class="notify-date">
        2022-11-11
    </div>
</div>

*/

window.addEventListener('DOMContentLoaded', ()=>{
    // 페이지가 이동했을 때, 목록을 요청함
    selectNotifyList();
})




/* ---------------------------------------------------- 함수 목록 --------------------------------------------------- */

/* 요소에 클래스와 내용을 세팅하는 함수 */
// const packupElement = (element, className, elementContent) => {
//     element.classList.add = className; // 클래스 이름 지정
//     if(elementContent != null) { // 내용이 null이 아닌 경우
//         element.innerHTML = elementContent; // 내용을 집어넣음
//     }
// }


/* 내 알림 목록을 요청하는 함수 */
const selectNotifyList = () => {
    axios.post('/notify/center/select'
        ).then( function(response){
            
            // 1. 응답에서 알림 목록 꺼내기
            const notifyList = response.data.notifyList;

            console.log(notifyList);

            // 2. 응답이 있을 때에만 알림 목록 생성 구문을 실행하기
            if(notifyList.length > 0){

                // 3. 목록이 들어갈 영역을 비움
                const notifyViewArea = document.querySelector('.notify-view-area');
                notifyViewArea.innerHTML = '';

                for(let notify of notifyList) {
                    console.log('목록')

                    // 2-1. 사용할 요소를 준비
                    const notifyBox = document.createElement("div");        // 알림 목록 하나의 최상위 부모
                    const notifyIcon = document.createElement("div");       // 알림 아이콘
                    const notifyMain = document.createElement("div");       // 알림 제목과 내용의 부모
                    const notifyContent = document.createElement("div");    // 알림 내용
                    const notifyTitle = document.createElement("div");      // 알림 제목
                    const notifyDate = document.createElement("div");       // 알림 날짜
    
                    // 2-2. 요소에 클래스, 내용을 세팅하는 함수
                    // (1) 알림 목록 하나의 최상위 부모
                    packupElement(notifyBox, 'notify-box', null);
                    
                    // (2) 알림 아이콘
                    let icon;

                    switch(notify.notifyTypeNo) {
                        case 201: icon = '<i class="fa-solid fa-comment-dots"></i>'; break;         // 댓글
                        case 202: icon = '<i class="fa-solid fa-comment-dots"></i>'; break;         // 답글
                        case 301: icon = '<i class="fa-solid fa-envelope-open-text"></i>'; break;   // 주문 완료
                        case 302: icon = '<i class="fa-solid fa-box"></i>'; break;                  // 구매 확정 요청
                        case 303: icon = '<i class="fa-solid fa-pen"></i>'; break;                  // 후기 요청
                        case 401: icon = '<i class="fa-solid fa-circle-exclamation"></i>'; break;   // 문의 답변
                    }

                    packupElement(notifyIcon, 'notify-icon', icon);

                    // (3) 내용, 제목, 날짜가 들어가는 notify-main
                    packupElement(notifyMain, 'notify-main', null);

                    // (4) 내용
                    packupElement(notifyContent, 'notify-content', notify.notifyContent);

                    // (5) 제목
                    packupElement(notifyTitle, 'notify-title', notify.notifyTitle);

                    // (6) 날짜
                    packupElement(notifyDate, 'notify-date', notify.notifyDate);

                    // 3. 준비된 요소를 포장
                    notifyMain.append(notifyContent, notifyTitle);
                    notifyBox.append(notifyIcon, notifyMain, notifyDate);

                    // 4. 목록 페이지에 세팅
                    notifyViewArea.append(notifyBox);
                }


            } else { // 만약 응답이 비어있는 경우, 비어있다는 문구를 띄움
                const notifyEmpty = document.createElement('div');
                packupElement(notifyEmpty, 'notify-empty', '알림이 없어요~');
            }

        }).catch(function(error){
            
            console.log('알림 목록 요청에 실패하였습니다.');
            console.log(error);


        }); 
}

