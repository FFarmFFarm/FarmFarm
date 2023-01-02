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