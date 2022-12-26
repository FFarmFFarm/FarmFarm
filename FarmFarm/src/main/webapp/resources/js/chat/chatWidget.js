/* 채팅 위젯 표시 */
// const btnChat = document.querySelector('.btn-chat');

// btnChat.addEventListener('click', ()=>{
//     let showChatWidget = document.getElementById('showChatWidget');
//     console.log(showChatWidget.checked);
// })

document.getElementById('showChatWidget').addEventListener('change', (e)=>{
    if(e.target.checked) {
        document.querySelector('.chatWidget-container').style.display='block';
    } else {
        document.querySelector('.chatWidget-container').style.display='none';
    }
})