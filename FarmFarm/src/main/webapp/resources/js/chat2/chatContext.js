// var Contextmenu = !function () {
//     var id = 'contextmenu';
//     {
//         var div = document.createElement('div');
//         div.id = id;
//         div.style = 'display:none;position:fixed;width:150px; height:200px; background: #fff;box-shadow:1px 1px 5px 0 rgba(0, 0, 0, 0.54)';
//         document.body.appendChild(div);
//     }
//     var div = document.getElementById(id);
//     document.addEventListener("contextmenu", function (e) {

//         e.preventDefault();

//         var x = e.pageX + 'px';
//         var y = e.pageY + 'px';
//         div.style.display = 'block';
//         div.style.left = x;
//         div.style.top = y;
//     })
//     document.addEventListener("click", function (e) { div.style.display = 'none' })
// }()

let selectedChatNo = 0;


// 보낸 채팅 우클릭 이벤트
document.addEventListener('contextmenu', (e) => {

    // 챗의 id를 가져오고, 우클릭 이벤트를 막음
    if( (e.target.classList.contains('sent-bubble')) || (e.target.parentElement.classList.contains('sent-bubble')) ) {
        // 우클릭한게 sent-bubble이면
        e.preventDefault(); 

        // id를 변수에 저장하고
        if(e.target.classList.contains('sent-bubble')) {
            selectedChatNo=e.target.id;
        }
        if(e.target.parentElement.classList.contains('sent-bubble')) {
            selectedChatNo=e.target.parentElement.id;
        }
        // 준비된 context 메뉴를 노출
        let x = e.pageX + 'px';
        let y = e.pageY + 'px';

        // sent 메세지용 context 메뉴를 선택
        let contextMenu = document.getElementById('sentBubbleContextMenu');
        contextMenu.style.display='block';
        contextMenu.style.left=x;
        contextMenu.style.top=y;

        // 각 칸에 이벤트를 부여함
        document.getElementById('deleteChat').addEventListener('click',()=>{
            // 모달 그림자
            document.getElementById('chatRoomMenuModal').classList.remove('hide');
            // 삭제 모달 보이기
            document.querySelector('.delete-menu').classList.remove('hide');

        })

    } else { // 다른 영역 우클릭 시 닫음
        document.getElementById('sentBubbleContextMenu').style.display='none';
    }
    addEventListener('click',()=>{ // 클릭 시 닫음
        document.getElementById('sentBubbleContextMenu').style.display = 'none';
    })
    document.getElementById('readingArea').addEventListener('scroll', () => {
        document.getElementById('sentBubbleContextMenu').style.display = 'none';
    })


})


// 받은 채팅 우클릭 이벤트
addEventListener('contextmenu', (e)=>{
    if(e.target.classList.contains('received-bubble') || e.target.parentElement.classList.contains('received-bubble')){
        // 우클릭한게 received-bubble이면
        e.preventDefault();

        // id를 변수에 저장하고
        if (e.target.classList.contains('received-bubble')) {
            selectedChatNo = e.target.id;
        }
        if (e.target.parentElement.classList.contains('received-bubble')) {
            selectedChatNo = e.target.parentElement.id;
        }
        // 준비된 context 메뉴를 노출
        let x = e.pageX + 'px';
        let y = e.pageY + 'px';

        // sent 메세지용 context 메뉴를 선택
        let contextMenu = document.getElementById('receivedBubbleContextMenu');
        contextMenu.style.display = 'block';
        contextMenu.style.left = x;
        contextMenu.style.top = y;

        // 각 칸에 이벤트를 부여함
        document.getElementById('reportChat').addEventListener('click', () => {
            // 모달 그림자
            document.getElementById('chatRoomMenuModal').classList.remove('hide');
            // 삭제 모달 보이기
            document.querySelector('.report-menu').classList.remove('hide');
        })
    } else { // 다른 영역 우클릭 시 닫음
        document.getElementById('receivedBubbleContextMenu').style.display = 'none';
    }
    addEventListener('click', () => { // 클릭 시 닫음
        document.getElementById('receivedBubbleContextMenu').style.display = 'none';
    })
    document.getElementById('readingArea').addEventListener('scroll',()=>{
        document.getElementById('receivedBubbleContextMenu').style.display = 'none';  
    })

})



/* 클립보드에 복사하기 */
// const copy = (text) => {
//     // 임시의 textarea 생성
//     const $textarea = document.createElement("textarea");

//     // body 요소에 존재해야 복사가 진행됨
//     document.body.appendChild($textarea);

//     // 복사할 특정 텍스트를 임시의 textarea에 넣어주고 모두 셀렉션 상태
//     $textarea.value = text;
//     $textarea.select();

//     // 복사 후 textarea 지우기
//     document.execCommand('copy');
//     document.body.removeChild($textarea);
// };

/* 삭제하기 이벤트 */

// 각 버튼 별 이벤트 부여하기
const deleteMenuCalcelBtn = document.getElementById('deleteMenuCalcelBtn');
const deleteMenuConfirmBtn = document.getElementById('deleteMenuConfirmBtn');

// 취소 버튼 누르면 그냥 닫음
deleteMenuCalcelBtn.addEventListener('click', () => {
    document.getElementById('chatRoomMenuModal').classList.add('hide');
    document.querySelector('.delete-menu').classList.add('hide');
})

// 확인 버튼 누르면 삭제 요청함
if (deleteMenuConfirmBtn) {
    deleteMenuConfirmBtn.addEventListener('click', () => {
        let formData = new FormData();
        formData.append("chatNo", selectedChatNo);
        axios.post("/chat/delete", formData
        ).then(function (response) {
            if (response.data > 0) {
                console.log("삭제되었습니다.")

                // 삭제 동기화를 위해서 채팅방을 불러옴
                selectChatList(selectedRoomNo);

                // 채팅방에 참가중인 다른 이용자의 채팅 동기화를 위해서 빈 메세지를 전달함
                let obj = {
                    "roomNo": selectedRoomNo,
                    "chatType": 'U' // Update하라는 의미입니다.
                };

                chattingSock.send(JSON.stringify(obj));

                // 모달창 닫음
                document.getElementById('chatRoomMenuModal').classList.add('hide');
                document.querySelector('.delete-menu').classList.add('hide');

                // 선택 채팅 초기화
                selectedChatNo = 0;
            }

        }).catch(function (error) {
            console.log("채팅 삭제 중 오류 발생")
            console.log(error)
        })
    })
}

/* 신고하기 이벤트 */

// 각 버튼 별 이벤트 부여하기
const reportMenuCalcelBtn = document.getElementById('reportMenuCalcelBtn');
const reportMenuConfirmBtn = document.getElementById('reportMenuConfirmBtn');

// 취소 버튼 누르면 그냥 닫음
reportMenuCalcelBtn.addEventListener('click', () => {
    document.getElementById('chatRoomMenuModal').classList.add('hide');
    document.querySelector('.report-menu').classList.add('hide');
})

// 확인 버튼 누르면 신고 진행함
if (reportMenuConfirmBtn) {
    reportMenuConfirmBtn.addEventListener('click', () => {


        /* 
        
        신고 관련 기능은 이곳에 적어주세요!!
        
        */

        console.log('신고 기능 준비중입니다.')
        console.log('선택한 채팅의 작성자 번호는 ' + selectedChatNo + "입니다." );
    })
}