/* 로딩되면.. */
addEventListener('load', ()=>{
    console.log('이모티콘을 불러옵니다.')
    selectEmoticonCategoryList();
})


/* 요소 채우기 */
const packupEmoticonElement = (element, className, elementContent) => {
    element.classList.add(className); // 클래스 이름 지정
    if (elementContent != null) { // 내용이 null이 아닌 경우
        element.innerHTML = elementContent; // 내용을 집어넣음
    }
}

/* 버튼 누르면 이모티콘 페이지 나옴 */
document.getElementById('addEmoticonBtn').addEventListener('click', ()=>{
    document.querySelector('.emoticon-container').classList.toggle('emoticon-hide');

    // 사진 영역 제거
    document.getElementById('inputImgPreview').removeAttribute('src');
    document.getElementById('inputImgPreviewBox').style.height = 0;
    document.getElementById('inputImgPreviewBox').style.opacity = 0;
})
document.querySelector('.emoticon-close-btn').addEventListener('click', ()=>{
    document.querySelector('.emoticon-container').classList.toggle('emoticon-hide');

    // 사진 영역 제거
    document.getElementById('inputImgPreview').removeAttribute('src');
    document.getElementById('inputImgPreviewBox').style.height = 0;
    document.getElementById('inputImgPreviewBox').style.opacity = 0;
})



/* 이모티콘 카테고리 리스트 */
const selectEmoticonCategoryList = () => {
    axios.post("/chat/select/emoticon/category"
        ).then(function(response){
            
            // 목록을 상수로 저장
            const emoticonCategoryList = response.data;

            // 요소를 채워넣음
            if(emoticonCategoryList != null) {

                // 영역을 선택
                const emoticonCategoryListArea = document.querySelector('.emoticon-category-list');

                for(let i=0; i<emoticonCategoryList.length; i++){
                    // 썸네일 경로 만들기
                    const imgPath = "/resources/images/chat2/emoticon/" + emoticonCategoryList[i].emoticonCategoryName + "/thumbnail.png";
                    
                    // 박스에 채워넣기
                    const emoticonCategoryBox = document.createElement('div');
                    packupEmoticonElement(emoticonCategoryBox, 'emoticon-category-box', "<img src=" + imgPath + ">")

                    // 영역에 추가하기
                    emoticonCategoryListArea.append(emoticonCategoryBox);

                    // 이벤트 추가하기
                    emoticonCategoryBox.addEventListener('click', ()=>{
                        selectEmoticonList(emoticonCategoryList[i].emoticonCategoryNo, emoticonCategoryList[i].emoticonCategoryName);
                    })
                }
            
            }

        }
        ).catch(function(error){
            console.log("카테고리 불러오기 실패");
            console.log(error);
        })
}


/* 카테고리 선택 이벤트 */
const selectEmoticonList = (emoticonCategoryNo, emoticonCategoryName) => {
    
    // 이모티콘 리스트를 불러올게요

    console.log(emoticonCategoryNo);

    let formData = new FormData();
    formData.append("emoticonCategoryNo", emoticonCategoryNo);

    axios.post("/chat/select/emoticon/list", formData
        ).then(function(response){

            const emoticonList = response.data;

            if(emoticonList != null) {
                // 1. 영역을 비워줌
                const emoticonListArea = document.querySelector('.emoticon-list');
                emoticonListArea.innerHTML = '';

                // 2. 영역을 채워줌
                for(let i=0; i<emoticonList.length; i++){
                    // 썸네일 경로 만들기
                    const imgPath = "/resources/images/chat2/emoticon/" + emoticonCategoryName + "/" + emoticonList[i].emoticonName;

                    // 박스에 채워넣기
                    const emoticonListBox = document.createElement('div');
                    packupEmoticonElement(emoticonListBox, 'emoticon-list-box', "<img src=" + imgPath + ">")

                    // 영역에 추가하기
                    emoticonListArea.append(emoticonListBox);

                    emoticonListBox.addEventListener('click', ()=>{
                        sendEmoticon(imgPath);
                    })
                }
            }

        }).catch(function(error){
            console.log("목록 불러오기 실패");
            console.log(error)
        })
}

/* 이모티콘 전송 이벤트 */
const sendEmoticon = (imgPath) => {

    console.log('이모티콘이 날아가요')

    let obj = {
        "roomNo": selectedRoomNo,
        "memberNo": myMemberNo,
        "memberNickname": myMemberNickname,
        "profileImg": myProfileImg,
        "chatContent": imgPath,
        "chatType": 'E'
    }

    chattingSock.send(JSON.stringify(obj))

    // 스크롤을 하단으로 내림
    const nowScrollHeight = readingArea.scrollHeight;
    readingArea.scrollTo(0, nowScrollHeight);
};