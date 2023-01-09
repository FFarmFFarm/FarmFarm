
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

    /* 소켓에 메세지가 오면, 동기화하기 */
    // 로그인 여부 확인을 위해, axios 이용해서 회원 번호를 요청
    // axios.post('/check/login'
    // ).then(function (response){

    //     // 회원 정보가 있을 때에만 웹소켓에 연결
    //     if(response.data == 0) {
            
    //         // 새 SockJS 객체 notifySock 생성, 서버는 /echo/notify과 연결
    //         notifySock = new SockJS("/echo/notify");
    
    //         // notifySock 객체가 null이 아닐 때에만, 웹소켓 서버로부터 알림을 수신
    //         if(notifySock != null) {
    //             notifySock.onmessage = function(e){
    //                 selectNotifyList();
    //             }
    //         }
    //     }

    // }). catch(function (error){
    //     console.log('로그인 여부 확인 중 오류 발생')
    // })
})


/* ---------------------------------------------------- 함수 목록 --------------------------------------------------- */

/* 요소에 클래스와 내용을 세팅하는 함수 */
/* notifyWidget에 들어있음 */
// const packupElement = (element, className, elementContent) => {
//     element.classList.add(className); // 클래스 이름 지정
//     if(elementContent != null) { // 내용이 null이 아닌 경우
//         element.innerHTML = elementContent; // 내용을 집어넣음
//     }
// }

/* --------------------------------- 내 알림 목록을 요청하는 함수 ----------------------------------- */
const selectNotifyList = () => {
    axios.post('/notify/center/select'
        ).then( function(response){
            
            // 1. 응답에서 알림 목록 꺼내기
            const notifyList = response.data.notifyList;

            // 2. 응답을 넣을 알림 목록 비우고
            const notifyViewArea = document.querySelector('.notify-view-area');
            notifyViewArea.innerHTML = '';

            // 3. 비어있을 때에만 출력할 default 요소 추가
            const notifyEmpty = document.createElement('div');
            packupElement(notifyEmpty, 'notify-empty', '알림이 없어요~!')
            notifyEmpty.classList.add('hide');
            notifyViewArea.append(notifyEmpty);

            // 4-A. 응답이 있을 때에만 알림 목록 생성 구문을 실행하기
            if(notifyList.length > 0){
                
                // 5. 받아온 목록에서 요소 추가
                for(let notify of notifyList) {

                    // 5-1. 사용할 요소를 준비
                    const notifyBox = document.createElement("a");          // 알림 목록 하나의 최상위 부모
                    const notifyIcon = document.createElement("div");       // 알림 아이콘
                    const notifyMain = document.createElement("div");       // 알림 제목과 내용의 부모
                    const notifyContent = document.createElement("div");    // 알림 내용
                    const notifyTitle = document.createElement("div");      // 알림 제목
                    const notifyDate = document.createElement("div");       // 알림 날짜
                    const notifyDelBtn = document.createElement("div");    // 삭제 버튼
                    const notifyNo = document.createElement("input");       // 번호를 담을 input

                    // 5-2. 요소에 클래스, 내용을 세팅하는 함수
                    // (1) 알림 목록 하나의 최상위 부모를 만들고 링크 부여
                    packupElement(notifyBox, 'notify-box', null);
                    notifyBox.setAttribute('href', notify.quickLink);

                    // (2) 정렬을 위해서 class값을 추가 + (3) 알림 아이콘
                    let icon;

                    switch(notify.notifyTypeNo) {
                        case 101: { // 채팅
                            packupElement(notifyBox, 'chat', null);
                            icon = '<i class="fa-solid fa-message"></i>';
                            break; 
                        }       
                        case 201: { // 댓글
                            packupElement(notifyBox, 'board', null);
                            icon = '<i class="fa-solid fa-comment-dots"></i>';
                            break; 
                        }       
                        case 202: { // 답글
                            packupElement(notifyBox, 'board', null);
                            icon = '<i class="fa-solid fa-comment-dots"></i>'; 
                            break;
                        }            
                        case 301: { // 주문 완료
                            packupElement(notifyBox, 'shop', null);
                            icon = '<i class="fa-solid fa-envelope-open-text"></i>'; 
                            break;   
                        }
                        case 302: { // 배송중
                            packupElement(notifyBox, 'shop', null);
                            icon = '<i class="fa-solid fa-truck"></i>';
                             break;                  
                        }
                        case 303: { // 주문 취소
                            packupElement(notifyBox, 'shop', null);
                            icon = '<i class="fa-solid fa-envelope-open"></i>'; 
                            break;                  
                        }
                    }

                    packupElement(notifyIcon, 'notify-icon', icon);

                    // (4) 내용, 제목, 날짜가 들어가는 notify-main
                    packupElement(notifyMain, 'notify-main', null);

                    // (5) 내용
                    packupElement(notifyContent, 'notify-content', notify.notifyContent);

                    // (6) 제목
                    packupElement(notifyTitle, 'notify-title', notify.notifyTitle);

                    // (7) 날짜
                    packupElement(notifyDate, 'notify-date', notify.notifyDate);

                    // (8) 삭제버튼
                    packupElement(notifyDelBtn, 'notify-del-btn', "<i class='fa-solid fa-xmark'></i>");

                    // (9) 번호
                    notifyNo.setAttribute('value', notify.notifyNo);
                    notifyNo.setAttribute('type', "input");
                    notifyNo.hidden = true;

                    // 5-3. 요소 읽음 여부 확인
                    if(notify.notifyStatus < 1){
                        notifyBox.classList.add('read');
                        notifyBox.addEventListener('click', (e)=>{
                        readThisNotify(e.currentTarget);
                        })
                    }

                    // 5-4. 준비된 요소를 포장
                    notifyMain.append(notifyIcon, notifyTitle, notifyContent, notifyDate);
                    notifyBox.append(notifyNo, notifyMain, notifyDelBtn);

                    // 5-5. 준비된 notifyBox에 이벤트:클릭 시 읽음처리 부여
                    notifyMain.addEventListener('click', (e)=>{
                        readThisNotify(e.currentTarget.parentElement);
                    })

                    // 5-6. 준비된 notifyBox에 이벤트:클릭 시 삭제 부여
                    notifyDelBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        deleteNotify(e.currentTarget.parentElement);
                    })

                    // 9. 목록 페이지에 세팅
                    notifyViewArea.append(notifyBox);
                }

            } else { // 만약 응답이 비어있는 경우, 비어있다는 문구를 띄움
                notifyEmpty.classList.remove('hide');
            }

        }).catch(function(error){
            console.log('알림 목록 요청에 실패하였습니다.');
            console.log(error);

        }); 
}

/* ----------------------------------- 알림 카테고리 필터링  ----------------------------------------*/

/* 라디오 버튼을 눌렀을 때 특정한 요소만 남기는 함수 */
const typeFilter = (option) => {
    const typeList = document.getElementsByClassName('notify-box');

    let boxExist = false;

    document.querySelector('.notify-empty').classList.add('hide');

    for(let type of typeList){
        if(!type.classList.contains(option)){
            type.classList.add('hide');
            document.querySelector('.notify-empty').classList.add('hide');
        } else {
            type.classList.remove('hide');
            boxExist = true;
        }
    }
    // 만약 요소가 하나도 없으면...
    if(!boxExist){
        document.querySelector('.notify-empty').classList.remove('hide');
    }
}

/* 필터링을 해제하는 함수 */
const typeFilterRemove = () => {
    // 필터로 사용되는 타입 리스트
    const typeList = document.getElementsByClassName('notify-box');

    // 알림이 존재하는지 점검하는 변수
    let boxExist = false;

    // empty 박스 비우기
    document.querySelector('.notify-empty').classList.add('hide');

    for(let type of typeList){
        type.classList.remove('hide');
        boxExist = true;
    }

    // 만약 요소가 하나도 없으면...
    if(!boxExist){
        document.querySelector('.notify-empty').classList.add('hide');
    }
}

/* 필터 버튼에 필터링 부여 */
document.getElementById('categoryAll').addEventListener('click', (e)=>{
    if(e.target.checked) typeFilterRemove();
})

document.getElementById('categoryShop').addEventListener('click', (e)=>{
    if(e.target.checked) typeFilter('shop');
})

document.getElementById('categoryBoard').addEventListener('click', (e)=>{
    if(e.target.checked) typeFilter('board');
})

document.getElementById('categoryInquiry').addEventListener('click', (e)=>{
    if(e.target.checked) typeFilter('inquiry');
})

document.getElementById('categoryChat').addEventListener('click', (e)=>{
    if(e.target.checked) typeFilter('chat');
})

/* --------------------------------------- 알림 카테고리 끝 -------------------------------- */


/* ------------------------------------- 알림 선택 관련 기능 ------------------------------- */

/* 알림 읽음처리 */
const readThisNotify = (parent) => {

    let notifyNo = parent.children[0].value;
    let formData = new FormData;
    formData.append("notifyNo", notifyNo);

    // 번호를 서버로 보내 읽음처리함
    axios.post('/notify/update', formData
        ).then( function(response){
            console.log('알림이 읽음 처리 되었습니다.')
        }).catch( function(error){
            console.log('읽음 처리 과정에서 오류가 발생했습니다.')
            console.log(error)
        })

    // 동기화하기
    parent.classList.add('read');
}

/* 알림 삭제 */
const deleteNotify = (parent) => {

    let notifyNo = parent.children[0].value;
    let formData = new FormData;
    formData.append("notifyNo", notifyNo);

    // 번호를 서버로 보내 읽음처리함
    axios.post('/notify/delete', formData
    ).then(function (response) {
        console.log('알림이 삭제 되었습니다.')
    }).catch(function (error) {
        console.log('읽음 처리 과정에서 오류가 발생했습니다.')
        console.log(error)
    })

    // 동기화하기
    parent.classList.add('hide');

    // 요소가 없는지 확인해서 없으면 empty-box 노출
    checkEmpty();
}

/* 요소가 없는지 확인하는 함수 */
const checkEmpty = () => {
    // notify box 목록
    const typeList = document.getElementsByClassName('notify-box');

    // 알림이 존재하는지 점검하는 변수
    let boxExist = false;

    // empty 박스 비우기
    document.querySelector('.notify-empty').classList.add('hide');

    // notify box 확인
    for (let type of typeList) {

        if(!type.classList.contains('hide')) {
            boxExist = true;
            break;
        }
    }

    // 만약 요소가 하나도 없으면...
    if (!boxExist) {
        document.querySelector('.notify-empty').classList.remove('hide');
    }
}

/* ------------------------------------- 알림 선택 관련 기능 끝 ------------------------------- */


/* 알림 부가 기능들 */

// 1. 알림 전부 조회 처리
document.getElementById("notifyReadAll").addEventListener("click", ()=>{
    let memberNickname = document.querySelector('.member-nickname').innerText;

    let formData = new FormData();
    formData.append("memberNickname", memberNickname);

    axios.post("/notify/update/all", formData
        ).then(function(response){
            // 동기화 작업 하기

            let notifyBoxes = document.getElementsByClassName('notify-box');

            for(let notifyBox of notifyBoxes){
                notifyBox.classList.add('read');
            }

        }).catch(function(error){
            console.log("알림 전부 조회 처리 실패")
            console.log(error)
        })

})