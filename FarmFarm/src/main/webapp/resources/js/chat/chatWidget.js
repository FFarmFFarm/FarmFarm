/* 채팅 위젯 표시 */
const chatWidget = document.getElementById('chatWidget');
const chatWidgetContainer = document.getElementById('chatWidget-container');

chatWidget.addEventListener('click', (e)=>{
    if(e.checked) {
        console.log('checked!')
    }
})