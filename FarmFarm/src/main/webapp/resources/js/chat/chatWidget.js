/* 채팅 위젯 표시 */
// const btnChat = document.querySelector('.btn-chat');

// btnChat.addEventListener('click', ()=>{
//     let showChatWidget = document.getElementById('showChatWidget');
//     console.log(showChatWidget.checked);
// })

/* 채팅 위젯 열기  */
document.getElementById('showChatWidget').addEventListener('change', (e)=>{
    if(e.target.checked) {
        document.querySelector('.chatWidget-container').style.display='block';
    } else {
        document.querySelector('.chatWidget-container').style.display='none';
    }
})

/* 채팅 내역 받아오기 */


/* 소켓 열어서 받아오기만 하기 */
