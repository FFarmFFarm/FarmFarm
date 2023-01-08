/* 
    * 아이콘
    상품 수령: <i class="fa-solid fa-box"></i>
    주문 완료: <i class="fa-solid fa-envelope-open-text"></i>
    후기 요청: <i class="fa-solid fa-pen"></i>
    관리자 문의: <i class="fa-solid fa-circle-exclamation"></i>
    댓글 / 대댓글 : <i class='fa-regular fa-comment-dots'></i>
    채팅 리마인더: <i class="fa-solid fa-message"></i> 
*/


/*     
    * 형식 예시
    header.jsp의 < div class='myDropdown1' > 의 자손 요소 < ul id = 'notifyDropdown' ></ul > 에 추가

    * 추가 방법

    < li >
        <div class="notify-widget-box">
            <div class="notify-widget-icon">
                <i class="..."></i> 원하는 아이콘 추가
            </div>
            <div class="notify-widget-main">
                <div class="notify-widget-header">
                    <div class="notify-widget-title">
                        새로운 댓글이 달렸어요
                    </div>
                    <div class="notify-widget-date">
                        오후 12:30
                    </div>
                    <div class="notify-widget-delBtn">
                        x
                    </div>
                </div>
                <div class="notify-widget-content">
                    "안녕안녕.."
                </div>
            </div>
        </div>
    </li> 

*/

/* 알림 팝업 버튼을 누를 때마다, 자신의 알림 목록을 받아올 예정 */
/* axios.post 방식을 사용함 */
/* dropdown-btn[0] */

// 요소에 클래스, 값을 넣어서 반환하는 함수
const packupElement = (element, classname, inputValue) => {
    element.classList.add(classname);

    if (inputValue != -1) {
        element.innerHTML = inputValue;
    }
}

// 요소에 클래스, 값을 넣어서 반환하는 함수
const packUpElement = (element, classname, inputValue) => {
    element.classList.add(classname);

    if (inputValue != -1) {
        element.innerHTML = inputValue;
    }
}


// 로딩이 처음 되었을 때, 내 알림 목록을 가져옴
addEventListener('load', ()=>{
    requestNotifyWidgetList();
})

/* 내 알림 목록을 가져오는 함수 */
const selectNotifyWidgetList = () => {

    axios.post('/notify/widget/list' // 연결
    ).then(function (response) {
        if (response.data != undefined) { // 받아온 데이터가 있을 때에만 실행

            const notifyDropdown = document.getElementById('notifyDropdown');

            notifyDropdown.innerHTML = '';

            const notifyList = response.data.notifyList;

            fillNotifyWidget(notifyList);
        }

        notifyDropdown.style.display = 'block';

    }).catch(function (error) {
        console.log(error)
    })
}


// 알림 드롭다운 열기 버튼
const dropbtn1 = document.querySelector('.dropbtn1');
if (dropbtn1 != null) {

    dropbtn1.addEventListener('click', () => {
        const notifyDropdown = document.querySelector('.dropdown-message');

        if (
            notifyDropdown.style.display == 'none' ||
            notifyDropdown.style.display == ''
        ) {
            selectNotifyWidgetList();
        } else {
            notifyDropdown.style.display = 'none';
        }

    });
}

/* 외부 영역 클릭 시 알림 드롭다운 가림 */
const notifyDropdown = document.querySelector(".dropdown-message");
if (notifyDropdown != null) {
    addEventListener('click', (e) => {
        const target = e.target;
        if (!document.getElementById('myDropdown1').contains(e.target)) {
            document.getElementById('myDropdown1').style.display = '';
            
            // 닫을 때도 동기화
            requestNotifyWidgetList();
        }
    })
}


// 요소에 클래스, 값을 넣어서 반환하는 함수
const packupWidgetElement = (element, classname, inputValue) => {
    element.classList.add(classname);

    if (inputValue != -1) {
        element.innerHTML = inputValue;
    }
}

/* 알림 채워넣음 */
const fillNotifyWidget = (notifyList) => {

    const notifyDropdown = document.getElementById('notifyDropdown');

    notifyDropdown.innerHTML = '';

    for (let notify of notifyList) {

        // 1. 재료 준비
        const notifyWidgetBox = document.createElement('div');
        const notifyWidgetAnchor = document.createElement('a');

        const notifyWidgetIcon = document.createElement('div');

        const notifyWidgetMain = document.createElement('div');

        const notifyWidgetHeader = document.createElement('div');
        const notifyWidgetTitle = document.createElement('div');
        const notifyWidgetDate = document.createElement('div');
        const notifyWidgetDelBtn = document.createElement('div');

        const notifyWidgetContent = document.createElement('div');

        const notifyWidgetNo = document.createElement("input");

        // 2. 재료 손질
        
        // 링크
        packupWidgetElement(notifyWidgetBox, 'notify-widget-box', null);
        packupWidgetElement(notifyWidgetAnchor, 'notify-widget-anchor', null);
        notifyWidgetAnchor.setAttribute('href', notify.quickLink);

        // 이벤트:클릭 시 읽음처리 부여
        notifyWidgetAnchor.addEventListener('click', (e) => {
            readThisWidgetNotify(e.currentTarget.parentElement);
        })

        // 알림 유형 아이콘
        let icon;
        switch (notify.notifyTypeNo) {
            case 101: icon = '<i class="fa-solid fa-message"></i>'; break;
            case 201: icon = '<i class="fa-solid fa-comment-dots"></i>'; break;
            case 202: icon = '<i class="fa-solid fa-comment-dots"></i>'; break;
            case 301: icon = '<i class="fa-solid fa-envelope-open-text"></i>'; break;
        }

        packupWidgetElement(notifyWidgetIcon, 'notify-widget-icon', icon);

        packupWidgetElement(notifyWidgetMain, 'notify-widget-main', null);
        packupWidgetElement(notifyWidgetHeader, 'notify-widget-header', null);

        /* 삭제를 위한 알림 번호 */
        notifyWidgetNo.setAttribute('value', notify.notifyNo);
        notifyWidgetNo.setAttribute('type', "input");
        notifyWidgetNo.hidden = true;

        // 알림 유형 제목(단축버전)
        let title;

        // switch (notify.notifyTypeNo) {
        //   case 201: title = '댓글 알림'; break;
        //   case 202: title = '댓글 알림'; break;
        // }

        // packupWidgetElement(notifyWidgetTitle, 'notify-widget-title', title);
        packupWidgetElement(notifyWidgetTitle, 'notify-widget-title', notify.notifyTitle);

        // 알림 시간
        packupWidgetElement(notifyWidgetDate, 'notify-widget-date', notify.notifyDate);

        // 알림 삭제 버튼
        packupWidgetElement(notifyWidgetDelBtn, 'notify-widget-delBtn', '<i class="fa-solid fa-xmark"></i>');
        notifyWidgetDelBtn.addEventListener('click', () => {
            deleteWidgetNotify(notifyWidgetBox);
        })

        // 알림 내용
        packupWidgetElement(notifyWidgetContent, 'notify-widget-content', notify.notifyContent);

        // 3. 조리
        notifyWidgetHeader.append(notifyWidgetTitle, notifyWidgetDate);
        notifyWidgetMain.append(notifyWidgetHeader, notifyWidgetContent);
        notifyWidgetAnchor.append(notifyWidgetIcon, notifyWidgetMain);
        notifyWidgetBox.append(notifyWidgetNo, notifyWidgetAnchor, notifyWidgetDelBtn);

        // 4. 플레이팅 전 읽음 여부 검사
        let notifyStatus = notify.notifyStatus;
        if (notifyStatus == 0) {
            notifyWidgetBox.classList.add('read');
        } else {
            // 않읽은게 하나라도 있으면 빨간점
            redDotOn();
        }


        // 5. 플레이팅
        notifyDropdown.append(notifyWidgetBox);
    }
}


/* 알림 목록을 요청 */
const requestNotifyWidgetList = () => {
    // 닫을 때도 동기화
    axios.post('/notify/widget/list' // 연결
    ).then(function (response) {

        if (response.data != undefined) { // 받아온 데이터가 있을 때에만 실행

            const notifyList = response.data.notifyList;

            fillNotifyWidget(notifyList);
        }

    }).catch(function (error) {
        console.log(error)
    })
}

/* 알림 삭제 */
const deleteWidgetNotify = (parent) => {

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

    selectNotifyWidgetList();

    // 요소가 없는지 확인해서 없으면 empty-box 노출
    checkEmpty();
}

/* 알림 읽음처리 */
const readThisWidgetNotify = (parent) => {

    let notifyNo = parent.children[0].value;
    let formData = new FormData;
    formData.append("notifyNo", notifyNo);

    // 번호를 서버로 보내 읽음처리함
    axios.post('/notify/update', formData
    ).then(function (response) {
        console.log('알림이 읽음 처리 되었습니다.')
    }).catch(function (error) {
        console.log('읽음 처리 과정에서 오류가 발생했습니다.')
        console.log(error)
    })

    // 동기화하기
    parent.classList.add('read');
}