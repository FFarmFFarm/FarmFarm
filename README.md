<div align="center">
<img width="20%" src="https://user-images.githubusercontent.com/110653581/211257489-34757022-4c71-443f-afe7-94d240788288.png" />
<h2>팜팜</h2>
<h3>내 손으로 키운 작물, 손쉽게 거래하세요.</h3>
<br>
<br>
</div>



# :pushpin: FarmFarm
> **농산물 직거래 플랫폼 및 농사 용품 판매 쇼핑몰**
> **[FarmFarm 바로가기](http://129.154.53.250:8080) <br>
(Test ID: user01 PW: pass01! | Admin ID: admin01 PW: admin01!)**

### 프로젝트 개요

- Java와 Spring 프레임워크를 이용하여 온라인 쇼핑몰 구축
- 상품 정보, 주문 정보, 회원 정보 등을 관리하는 기능 제공
- 개인간 거래, 커뮤니티 게시판, 채팅 및 알림 기능 제공

</br>

## 1. 제작 기간 & 참여 인원 & 구현 기능
- 2022년 12월 12일 ~ 2023년 1월 11일
- 6인 팀 프로젝트
- 구현 기능 및 기여
  - 전체 프로젝트 기획 및 개발 참여
  - JSP를 활용한 게시판 CRUD
    - 사용자 경험 향상을 위한 비동기 페이지네이션 및 정렬
    - AJAX를 활용한 비동기 댓글 CRUD
    - 대댓글, 비밀 댓글 기능 추가
  - 테스트 단계에서 자발적으로 테스터로 참여
      - 오류와 사용자 경험 문제를 찾아 문제를 조기에 해결할 수 있도록 함
  - 장바구니 배송지 추가 기능
  - 설계 단계에서 원활한 프로젝트 진행을 위한 공동 문서 작성

- 프로젝트 구조
![](https://user-images.githubusercontent.com/110797113/221120531-819fca85-1d0c-457e-a9b1-d46d717c21cb.png)



</br>

## 2. 사용 기술

<div align="center">
  
### **Back-end**
<img src="https://img.shields.io/badge/Java11-007396?style=for-the-badge&logo=java&logoColor=white"> 
  <img src="https://img.shields.io/badge/Spring5.3.14-6DB33F?style=for-the-badge&logo=spring&logoColor=white">
  <img src="https://img.shields.io/badge/Oracle21C-F80000?style=for-the-badge&logo=oracle&logoColor=white">
  <br>
  <img src="https://img.shields.io/badge/Apache Tomcat9.0-F8DC75?style=for-the-badge&logo=apachetomcat&logoColor=white">
    <img src="https://img.shields.io/badge/Apache Maven-C71A36?style=for-the-badge&logo=ApacheMaven&logoColor=white">
    <img src="https://img.shields.io/badge/Spring Sequrity-6DB33F?style=for-the-badge&logo=SpringSecurity&logoColor=white">

### **Front-end**
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 

</div>

</br></br>

<br><br>

## 3. ERD 설계
[FarmFarm ERD](https://www.erdcloud.com/d/xpKBdcyyrs6Ef2k9F) 

<br>

![FarmFarm ERD](https://user-images.githubusercontent.com/110797113/220540302-1945744a-7fa8-41ab-aac2-13c9b57dc5b2.png)
<br><br>

## 4. 핵심 기능
게시판 CRUD 기능 구현
<details> 
<summary> 핵심 기능 설명 펼치기 </summary>

### 4-1. 게시판 목록
<img width="610" alt="1" src="https://user-images.githubusercontent.com/110797113/220551339-9f5f47ed-682f-4f47-a534-21ed7b59ba61.png">
<br>

- 카테고리 별 게시판 목록이 나옴.
- 원하는 검색어를 원하는 조건별(제목, 내용, 제목+내용)로 검색 가능.
- 원하는 정렬 방식(최신순, 조회수, 좋아요)을 선택해 게시글 조회.
- 페이지네이션을 이용해 게시판 페이지를 이동.
- 코드 보러 가기
  - [Controller](https://github.com/Seo-de/FarmFarm/blob/main/FarmFarm/src/main/java/edu/kh/farmfarm/board/controller/BoardListController.java)
  - [Service](https://github.com/Seo-de/FarmFarm/blob/main/FarmFarm/src/main/java/edu/kh/farmfarm/board/model/service/BoardListServiceImpl.java)
  - [JS](https://github.com/Seo-de/FarmFarm/blob/main/FarmFarm/src/main/webapp/resources/js/board/boardList.js)
  <br>
  
### 4-2. 게시글 작성
- 로그인 한 일반회원과 관리자에게 글쓰기 버튼이 나와 글쓰기 가능.
- 코드 보러 가기
  - [Controller](https://github.com/Seo-de/FarmFarm/blob/main/FarmFarm/src/main/java/edu/kh/farmfarm/board/controller/BoardWriteController.java)
  - [Service](https://github.com/Seo-de/FarmFarm/blob/main/FarmFarm/src/main/java/edu/kh/farmfarm/board/model/service/BoardWriteServiceImpl.java)
  - [JS](https://github.com/Seo-de/FarmFarm/blob/main/FarmFarm/src/main/webapp/resources/js/board/boardWrite.js)
  <br>
  
 ### 4-3. 게시글 조회, 수정, 삭제
 <img width="693" alt="화면 캡처 2023-01-08 181633" src="https://user-images.githubusercontent.com/110797113/220554471-a8ba3ffa-1792-4ba8-bd7c-524d7557fb4c.png">
<br>

- 게시글 작성자, 작성일 및 게시글 조회 가능.
  - 게시글 작성자 O : 게시글 수정하기, 게시글 삭제하기가 가능.
  - 게시글 작성자 X : 게시글 좋아요, 신고하기 가능.
- 코드 보러 가기
  - [Controller](https://github.com/Seo-de/FarmFarm/blob/main/FarmFarm/src/main/java/edu/kh/farmfarm/board/controller/BoardDetailController.java)
  - [Service](https://github.com/Seo-de/FarmFarm/blob/main/FarmFarm/src/main/java/edu/kh/farmfarm/board/model/service/BoardDetailServiceImpl.java)
  - [JS](https://github.com/Seo-de/FarmFarm/blob/main/FarmFarm/src/main/webapp/resources/js/board/boardDetail.js)
  - [게시글 수정 JS](https://github.com/Seo-de/FarmFarm/blob/main/FarmFarm/src/main/webapp/resources/js/board/boardUpdate.js)
  <br>
  
  
### 4-4. 댓글 기능
- 게시글에 댓글 및 비밀 댓글, 답글 달기 가능.
  - 댓글 관련 기능들은 ajax로 불러와 댓글 등록, 수정, 삭제 가능.
  - 댓글 작성 시 작성한 댓글로 스크롤 이동.
- 코드 보러 가기
  - [Controller](https://github.com/Seo-de/FarmFarm/blob/main/FarmFarm/src/main/java/edu/kh/farmfarm/board/controller/CommentController.java)
  - [Service](https://github.com/Seo-de/FarmFarm/blob/main/FarmFarm/src/main/java/edu/kh/farmfarm/board/model/service/CommentServiceImpl.java)
  - [JS](https://github.com/Seo-de/FarmFarm/blob/main/FarmFarm/src/main/webapp/resources/js/board/comment.js)
<br>

</details>


</br>

## 5. 트러블 슈팅
**게시글 수정**
- 주소창에서 게시글 수정하는 주소를 작성한 경우 다른 사람이 작성한 글도 수정이 가능했음.
- [수정 전 코드 보기](https://github.com/Seo-de/FarmFarm/blob/main/FarmFarm/src/main/java/edu/kh/farmfarm/board/controller/BoardDetailController.java#L189-L204)
- **해결**
  - 게시글 수정 페이지로 이동할 때 로그인 멤버의 멤버 번호와 게시글 작성한 사람의 멤버 번호가 같을 경우라는 조건문을 추가.
  - [수정 코드 보기](https://github.com/Seo-de/FarmFarm/blob/main/FarmFarm/src/main/java/edu/kh/farmfarm/board/controller/BoardDetailController.java#L206-L231)


**게시판 조회 정렬**
- 게시글 검색은 잘 되었으나 게시글을 정렬이 페이지네이션 이동 시 적용되지 않았음.
- 정렬 적용 후 게시글을 조회 후 목록으로 돌아오면 해당 정렬이 적용되지 않았음.
- **해결**
  - 정렬을 실시간으로 적용되게 해주기 위해 비동기로 게시글 리스트 조회.
  - 게시글 상세보기의 주소를 가져와 목록으로 버튼을 누르면 주소에 있는 쿼리들을 읽어와 비동기로 게시글 리스트 조회.

**댓글 조회 시 조건에 따른 댓글 내용 보이게 하기**
- 비밀댓글과 관리자의 경우에 따른 경우의 수를 지정해줘야 했음.
- **해결**
  - 댓글 작성자에 따른 버튼 활성화
    - 댓글 작성자 O : 답글달기, 수정하기, 삭제하기 버튼 나오게 하기
    - 댓글 작성자 X : 답글달기, 신고하기 버튼 나오게 하기
    - 관리자는 모든 댓글 답글달기, 삭제하기 버튼 나오게 하기 / 관리자가 작성한 댓글은 수정하기 버튼 추가
    - [코드 보러 가기](https://github.com/Seo-de/FarmFarm/blob/main/FarmFarm/src/main/webapp/resources/js/board/comment.js#L216-L250)
  - 비밀 댓글에 따른 내용
    - 게시글 작성자 O + 비밀댓글 작성자 O : 비밀댓글 내용 보이게 하기 / 답글달기, 신고하기 버튼 나오게 하기
    - 게시글 작성자 X + 비밀댓글 작성자 O : 비밀댓글 내용 보이게 하기 / 답글달기, 수정하기, 삭제하기
    - 그 외 : 댓글 내용에 '비밀댓글입니다.' 나오게 설정
    - [코드 보러 가기](https://github.com/Seo-de/FarmFarm/blob/main/FarmFarm/src/main/webapp/resources/js/board/comment.js#L125-L162)

## 6. 프로젝트 결과 및 회고

**프로젝트 결과**
- 온라인 쇼핑몰 프로토타입 완성
- 학원 최우수상
- WBS에 계획한 일정에 맞춰 프로젝트 구현

<br>

**한 줄 회고** <br><br>
팜팜 프로젝트를 끝내면서 혼자서 게시판 기능을 구현했다는 점, 프로젝트가 끝났지만 같이 스터디하며 성장할 수 있는 좋은 팀원들을 만난 즐거운 프로젝트였습니다. <br>
