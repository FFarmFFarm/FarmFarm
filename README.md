<div align="center">
<img width="20%" src="https://user-images.githubusercontent.com/110653581/211257489-34757022-4c71-443f-afe7-94d240788288.png" />
<h2>팜팜</h2>
<h3>내 손으로 키운 작물, 손쉽게 거래하세요.</h3>
<br>
</div>

# :pushpin: FarmFarm
> **농산물 직거래 플랫폼 및 농사 용품 판매 쇼핑몰** <br>
> **[FarmFarm 바로가기](http://129.154.53.250:8080)**

<br>

## 1. 프로젝트 소개
- **제작 기간** : 2022년 12월 12일 ~ 2023년 1월 11일
- **참여 인원** : 6인 팀 프로젝트
- **프로젝트 개요**
  - Java와 Spring 프레임워크를 이용하여 온라인 쇼핑몰 구축
  - 상품 정보, 주문 정보, 회원 정보 등을 관리하는 기능 제공
  - 개인간 거래, 커뮤니티 게시판, 채팅 및 알림 기능 제공
- **담당 기능**
  - 전체 프로젝트 기획 및 개발 참여
  - 일반 회원, 판매자, 게시글, 댓글 등 대상별 신고 기능 구현
  - 관리자 페이지의 편의성 향상을 위해 AJAX를 활용한 기능 구현
    - 회원 관리 : 판매자 등록 상태, 회원 활동 상태에 따른 비동기 조회
    - 신고 관리 : 강제 탈퇴, 정지, 게시글 삭제 등 신고 처리 기능 구현
  - @Scheduled를 활용하여 정지 계정 자동 활성화
  - Chart.js를 활용한 관리자 대시보드 그래프 구현

- **성과**
  - 온라인 쇼핑몰 프로토타입 완성
  - 교육원 내 프로젝트 최우수상 수상
  - WBS에 계획한 일정에 맞춰 프로젝트 구현
  
<br>
<br>

- **프로젝트 구조**
![](https://user-images.githubusercontent.com/110653573/221127291-cec3ff02-76a7-4de3-a5e0-59ac00119050.png)


<br>
<br>

## 2. 사용 기술
<div align="center">
  
### **Back-end**
<img src="https://img.shields.io/badge/Java 11-007396?style=for-the-badge&logo=java&logoColor=white"> 
  <img src="https://img.shields.io/badge/Spring 5.3.14-6DB33F?style=for-the-badge&logo=spring&logoColor=white">
  <img src="https://img.shields.io/badge/Oracle 21C-F80000?style=for-the-badge&logo=oracle&logoColor=white">
  <br>
  <img src="https://img.shields.io/badge/Apache Tomcat 9.0-F8DC75?style=for-the-badge&logo=apachetomcat&logoColor=white">
    <img src="https://img.shields.io/badge/Apache Maven-C71A36?style=for-the-badge&logo=ApacheMaven&logoColor=white">
    <img src="https://img.shields.io/badge/Spring Sequrity-6DB33F?style=for-the-badge&logo=SpringSecurity&logoColor=white">

### **Front-end**
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 

</div>

<br>
<br>

## 3. ERD 설계
![](https://user-images.githubusercontent.com/110653573/221079293-fcda70a5-1aeb-4744-94cc-6a2033d95ebe.png)

<br>
<br>

## 4. 핵심 기능

<details>
<summary><b>핵심 기능 설명 펼치기</b></summary>
<div markdown="1">

<br>
	
<details>
<summary><b>4.1. 신고하기</b></summary>
<div markdown="1">
	
![](https://user-images.githubusercontent.com/110653573/222202403-a3a38c67-fc1b-41f1-8853-d4f022a3f709.png)

**총 6가지 신고** <br>

(1) 페이지별 신고 대상이 하나인 경우 <br>
  - 판매자(seller), 판매 게시글(post), 채팅 회원(chat) <br>
  - 주소의 pathname을 이용하여 조건 분리

 ```java
 
// pathname: 각 기능 메인 주소
var pathname = location.pathname.substring(1, location.pathname.lastIndexOf("/"));

// postNo(판매글), seller에서 memberNo(판매자)
var targetNo = location.pathname.substring(location.pathname.lastIndexOf("/")+1);

var reportType;
var reportTargetNo;


// 신고하기 버튼 클릭 시
reportBtn.addEventListener("click", () => {

    if(reportTargetNo == 0){
        messageModalOpen("관리자는 신고 대상이 아닙니다.");
	
    } else{
        openReportModal();  // 신고하기 모달
        switch(pathname){
            case 'seller': reportType = 'M'; reportTargetNo = targetNo; break;
            case 'post': reportType = 'P'; reportTargetNo = targetNo; break;
            case 'chat': reportType = 'M'; reportTargetNo = selectedChatNo; break; // chatContext.js에서 선언한 변수 사용
        }
    
    }
});

```
<br>

(2) 페이지별 신고 대상이 둘 이상인 경우 (각 대상의 식별 번호 이용)<br>
  - 커뮤니티 게시글 작성자 신고, 게시글 신고, 댓글 신고
	
```java

// 1) 댓글 신고
for(let i=0; i<reportCommentBtn.length; i++){

    // 댓글의 신고하기 버튼 누르면
    reportCommentBtn[i]. addEventListener("click", () => {

	// 신고 모달 열리기
	openReportModal();

	// 각 댓글의 댓글 번호
	const targetCommentNo = document.getElementsByClassName('targetCommentNo');

	// 신고유형, 신고번호 매칭
	if(targetCommentNo[i] != null){
	    reportType = 'C';
	    reportTargetNo = targetCommentNo[i].value;

	}
    })
}



// 2) 댓글 작성자 신고
document.getElementById('reportMemberBtn').addEventListener('click', () =>{

				    // memberNo = "${loginMember.memberNo}";
				    // 본인 계정 신고x
    if(targetMemberNo != null && targetMemberNo != memberNo){
	// 신고 모달 열리기
	openReportModal();
	reportType = 'M';
	reportTargetNo = targetMemberNo;
    }

    if(targetMemberNo == memberNo){
	messageModalOpen("본인의 계정은 신고할 수 없습니다.");
    }
})



// 3) 커뮤니티 게시글 신고
document.getElementById('reportBoardBtn').addEventListener('click', () => {

    if(boardNo != null){
	// 신고 모달 열리기
	openReportModal();
	reportType = 'B';
	reportTargetNo = boardNo;
    }
})

```

	
<details>
<summary>Controller</summary>
<div markdown="1">

```java
@Controller
public class ReportController {
	
	@Autowired
	private ReportService service;

	// 신고하기
	@PostMapping("/report")
	@ResponseBody
	public int insertReport(@SessionAttribute(value = "loginMember") Member loginMember,
				@RequestParam(value="reportType", required=false) String reportType,
				@RequestParam(value="reportTargetNo", required=false, defaultValue="0") int reportTargetNo,
				@RequestParam(value="reportReason", required=false) String reportReason,
				@RequestParam(value="reportContent", required=false)  String reportContent
				) {

		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("reportType", reportType);
		map.put("reportTargetNo", reportTargetNo);
		map.put("reportReason", reportReason);
		map.put("reportContent", reportContent);
		map.put("memberNo", loginMember.getMemberNo());
		
		int result = 0;
		
		if(loginMember != null) {

			result = service.insertReport(map);
			
		}
		
		return result;
	}
}

```

</div>
</details>
	
<details>
<summary>mapper</summary>
<div markdown="1">

```xml
<insert id="insertReport">
	INSERT INTO REPORT VALUES(SEQ_REPORT_NO.NEXTVAL, #{reportType}, #{memberNo}, #{reportTargetNo}, #{reportReason},
		DEFAULT, NULL, NULL, #{reportContent})
</insert>
```

</div>
</details>

</div>
</details>	
	

<br>
	
<details>
<summary><b>4.2. ajax를 활용한 관리자페이지 기능 구현</b></summary>
<div markdown="1">


![](https://user-images.githubusercontent.com/110653573/222202930-e17bb192-4755-411b-ab83-674712b217ab.png)

<br>
<h4>(1) 필터, 검색 기능 구현</h4>
	
<details>
<summary>회원관리 Controller</summary>
<div markdown="1">

```java
@Controller
public class AdminController {
	
	@Autowired
	private AdminService service;
	
	//..(중략)..

	// 전체 회원 조회 (정렬, 페이지네이션, 검색)
	@GetMapping("/admin/memberList")
	@ResponseBody
	public String selectMember(@SessionAttribute(value="loginMember") Member loginMember, 
				   @RequestParam(value="cp", required=false, defaultValue="1") int cp,
				   @RequestParam(value="authFilter", required=false, defaultValue="0") String authFilter,
				   @RequestParam(value="statFilter", required=false, defaultValue="0") String statFilter,
				   @RequestParam(value="keyword", required=false) String keyword) {

		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("authFilter", authFilter); // 판매자 인증 필터 정렬
		paramMap.put("statFilter", statFilter); // 계정 상태 필터 

		if(keyword != null) {
			paramMap.put("keyword", keyword);
		}

		// 관리자인지 확인 (관리자면 result==1)
		int result = service.checkAdmin();

		Map<String, Object> map = new HashMap<String, Object>();

		if(result == 1 && loginMember != null) {

			// 전체 회원 정보 조회 + 페이지네이션 + 정렬
			map = service.selectMember(paramMap, cp);

		} else {
			System.out.println("관리자만 접근 가능합니다.");
		}


		return new Gson().toJson(map);
	}
	
	//..(중략)..
}
```

</div>
</details>
	
<details>
<summary>회원관리 Service</summary>
<div markdown="1">

```java
@Service
public class AdminServiceImpl implements AdminService{
	
	@Autowired
	private AdminDAO dao;
	
	//..(중략)..
	
	// 전체 회원 조회 (정렬, 페이지네이션, 검색)
	@Override
	public Map<String, Object> selectMember(Map<String, Object> paramMap, int cp) {


		/* 페이지네이션 */
		// 1. 전체 개수를 가져옴.
		int memberListCount = dao.memberListCount(paramMap);

		// 2. 가져온 개수와 현재 페이지를 이용해서 페이지네이션 객체 생성
		Pagination pagination = new Pagination(memberListCount, cp, 15);

		// 3. 페이네이션 객체를 생성해 목록 불러오기
		// 전체 회원 조회(정렬 포함)
		List<Admin> memberList = dao.selectMember(paramMap, pagination);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("memberListCount", memberListCount);
		map.put("pagination", pagination);
		map.put("memberList", memberList);


		return map;
	}
	
	//..(중략)..

}
```

</div>
</details>


<details>
<summary>회원관리 DAO</summary>
<div markdown="1">

```java
@Repository
public class AdminDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	//..(중략)..
	
	/** 전체 회원 조회(페이지네이션, 정렬 포함)
	 * @param paramMap
	 * @param pagination
	 * @return
	 */
	public List<Admin> selectMember(Map<String, Object> paramMap, Pagination pagination) {

		// RowBounds 객체(마이바티스) : 여러 행 조회 결과 중 특정 위치부터 지정된 행의 개수만 조회하는 객체
		int offset = (pagination.getCurrentPage() -1) * 15;
		RowBounds rowBounds = new RowBounds(offset, 15);

		return sqlSession.selectList("adminMapper.selectMemberList", paramMap, rowBounds);
	}
	
	//..(중략)..
	
}
```

</div>
</details>
	
	
	
<details>
<summary>회원관리 mapper</summary>
<div markdown="1">

```xml
<!-- 전체 회원 정보 조회 (정렬 별로 포함) -->
<select id="selectMemberList" resultMap="admin_rm">
SELECT *
FROM (SELECT 
		(CASE 
			WHEN REPORT_TYPE = 'M' THEN 'M'
			WHEN REPORT_TYPE IS NULL THEN NULL
			ELSE NULL
		END)REPORT_TYPE,
		RANK() OVER(PARTITION BY REPORT_TYPE, REPORT_TARGET_NO ORDER BY REPORT_NO DESC) AS RANKING,
		RANK() OVER(PARTITION BY MEMBER_NO ORDER BY REPORT_TYPE DESC) AS DUPL_FLAG,
		MEMBER_NO, REPORT_TARGET_NO,
		MEMBER_ID, MEMBER_NAME, MEMBER_NICKNAME, MEMBER_TEL, MEMBER_DEL_FL, SIGNUP_DATE, AUTHORITY, PROFILE_IMG, MEMBER_BIRTH,
		REPLACE(MEMBER_ADDRESS, ',,', ' ') MEMBER_ADDRESS, DEFAULT_FL, FARM_IMG, REPORT_NO, REPORT_MEMBER_NO, REPORT_REASON, REPORT_DATE, 				REPORT_PENALTY, 
		PROCESS_DATE, REPORT_CONTENT
	FROM MEMBER 
	LEFT JOIN ADDRESS USING(MEMBER_NO)
	LEFT JOIN SELLER USING(MEMBER_NO)
	LEFT JOIN REPORT ON (MEMBER_NO = REPORT_TARGET_NO)
	WHERE MEMBER_ID != 'admin'
	AND DEFAULT_FL = 'Y'
	ORDER BY MEMBER_NO)
WHERE RANKING = 1 <!--누적 신고 중 제일 최근 값 가져오기 -->
AND DUPL_FLAG = 1 <!--reportTargetNo가 같을 때 신고 타입 'M'인 경우만 가져오기 -->
<if test='authFilter==0 and statFilter==0'> <!--전체 -->
</if>
<if test='authFilter==1'> <!--판매자인증: 미등록 -->
	AND AUTHORITY = 0
</if>		
<if test='authFilter==2'> <!--판매자인증: 판매자 -->
	AND AUTHORITY = 1
</if>
<if test='authFilter==3'> <!--판매자인증: 인증대기 -->
	AND AUTHORITY = 3
</if>
<if test='authFilter==4'> <!--판매자인증: 인증보류 -->
	AND AUTHORITY = 4
</if>

<if test='statFilter==1'> <!--상태: 활동중 -->
	AND MEMBER_DEL_FL = 'N'
	AND (REPORT_PENALTY IS NULL
	OR REPORT_PENALTY = 'N'
	OR REPORT_PENALTY = 'A')
	AND REPORT_TYPE = 'M'				
</if>
<if test='statFilter==2'> <!--상태: 정지 -->
	AND MEMBER_DEL_FL = 'N'
	AND REPORT_PENALTY = 'Y' 
	AND PROCESS_DATE IS NOT NULL
	AND REPORT_TYPE = 'M'
</if>
<if test='statFilter==3'> <!--상태: 강제 탈퇴 -->
	AND MEMBER_DEL_FL = 'Y'
</if>
<if test='keyword != null'>
	AND (LOWER(MEMBER_ID) LIKE LOWER('%${keyword}%')
	OR 	LOWER(MEMBER_NICKNAME) LIKE LOWER('%${keyword}%')
	OR MEMBER_NO LIKE ('%${keyword}%'))
</if>
</select>
```

</div>
</details>

<br>

[+]
<br>
[회원 관리 JS 코드](https://github.com/luejenie/FarmFarm/blob/main/FarmFarm/src/main/webapp/resources/js/admin/adminMember.js)	
	
<br>
	
<h4>(2) 회원 강제 탈퇴, 정지 / 게시글 삭제 등의 신고 처리 기능 구현</h4>
	
<details>
<summary>신고처리 Service</summary>
<div markdown="1">

```java
@Service
public class AdminProcessServiceImpl implements AdminProcessService{
	
	@Autowired
	private AdminProcessDAO dao;
	
	
	//..(중략)..
	
	
	// 회원 강제 탈퇴 (회원관리, 신고내역x)
	@Override
	public int memberKickout(int hiddenNo) {
		return dao.memberKickout(hiddenNo);
	}

	
	// 신고된 회원 강제 탈퇴 (신고내역 O)
	@Override
	public int reportMemberKickout(int hiddenNo, int authority) {
		
		int result = 0;
		
		// 강제 탈퇴 시키고
		result = dao.memberKickout(hiddenNo);
		
		// 강제 탈퇴가 성공한다면
		if(result > 0) {
			// 신고 상태 변경, 신고 처리일자 추가
			result = dao.changeReportStatus(hiddenNo);
			
			// 판매자라면, 판매글 
			if(authority == 1) {
				result = dao.deletePostofSeller(hiddenNo);
			}
		}
		
		return result;
	}
	
	
	// 신고된 회원 계정 정지
	@Override
	public int reportMemberBanned(int hiddenNo) {
		return dao.reportMemberBanned(hiddenNo);
	}
	
	
	// 신고 계정 - 반려
	@Override
	public int reportMemberLeave(int hiddenNo) {
		return dao.reportMemberLeave(hiddenNo);
	}	
	
	
	
	// 신고 게시글 - 삭제
	@Override
	public int reportDeleteContent(int hiddenContentNo, String reportType) {
		
		int result = 0;
		
		// 커뮤니티 게시글 삭제
		if(reportType.equals("B")) {
			result = dao.reportDeleteBoard(hiddenContentNo);
		
		// 판매글 삭제
		} else if(reportType.equals("P")) {
			result = dao.reportDeletePost(hiddenContentNo);

		// 댓글
		} else if(reportType.equals("C")) {
			result = dao.reportDeleteComment(hiddenContentNo);
		}
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("hiddenContentNo", hiddenContentNo);
		paramMap.put("reportType", reportType);
		
		// 삭제 후 신고 상태 변경, 처리 일자 추가
		if(result > 0) {
			result = dao.changeReportStatusCt(paramMap);
		}
		
		return result;
	}
	
	
	// 신고 게시글 - 반려
	@Override
	public int reportLeaveContent(Map<String, Object> paramMap) {
		return dao.reportLeaveContent(paramMap);
	}
	
	
	//..(중략)..
	
}
```

</div>
</details>
	
	
[신고 처리 Controller](https://github.com/luejenie/FarmFarm/blob/main/FarmFarm/src/main/java/edu/kh/farmfarm/admin/controller/AdminProcessController.java)
<br>	
[신고 처리 DAO](https://github.com/luejenie/FarmFarm/blob/main/FarmFarm/src/main/java/edu/kh/farmfarm/admin/model/dao/AdminProcessDAO.java)
	
<br>
[+]
<br>
	
[판매자인증 Controller](https://github.com/luejenie/FarmFarm/blob/main/FarmFarm/src/main/java/edu/kh/farmfarm/admin/controller/AdminSellerAuthController.java#L100) <br>
[신고 조회 Controller](https://github.com/luejenie/FarmFarm/blob/main/FarmFarm/src/main/java/edu/kh/farmfarm/admin/controller/AdminReportController.java)
	

</div>
</details>		
	
<br>	
 
<details>
<summary><b>4.3. @Scheduled를 활용하여 정지 계정 자동 활성화</b></summary>
<div markdown="1">
	
<br>
	
<details>
<summary>Controller</summary>
<div markdown="1">

```java
@Component
public class BannedAccountActivateScheduling {

	@Autowired
	private AdminProcessService service;
	
	int count = 0;
	
	// 신고되어 정지된 계정 7일 뒤에 풀기
	@Scheduled(cron = "0 * * * * *")  // 매 분 0초에 실행
	public void bannedAccountActivate() throws ParseException{
		
		System.out.println("[ADMIN] 정지 계정 해제 프로세스 진행합니다.");
		
		// 1. 정지된 계정 조회하기
		List<Admin> bannedAccountList = service.selectBannedAccountList();
		
		
		// 2. processDate의 일시 +7 이 현재시간을 지났는지 확인!
		for(Admin admin : bannedAccountList) {
			
			String processDate = admin.getProcessDate();
			
			//System.out.println(processDate); //2023-01-04 17:05:08

			
			// 1) 7일 뒤 날짜, 시간 구하기
	
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			
			// 날짜 연산을 위해 String을 Date 객체로 변경
			Date pDate = sdf.parse(processDate);
			
			// 날짜 연산을 위한 Calendar 객체 생성 후 date 대입
			Calendar cal = Calendar.getInstance();
			cal.setTime(pDate);
			
			//System.out.println(cal.getTime()); // Wed Jan 04 17:05:08 KST 2023
			
	
			// 7일 더하기
			cal.add(Calendar.DATE, 7);
			
			
			// processDate에서 7일 더한 날짜 (sdf 포맷으로 변경)
			String afterDate = sdf.format(cal.getTime());
			
			
			
			// 2) 현재 날짜, 시간
			LocalDateTime now = LocalDateTime.now();
			
			// 포맷 변경
			String sysdate = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
			
			
			// 3. 7일 뒤 날짜가 현재 시간을 지났으면! 해당 reportTargetNo 조회
			int result = afterDate.compareTo(sysdate);  
			// compareTo() 
			// result = 0 동일 시간
			// result < 0 afterDate는 sysdate 이전 날짜
			// result > 0 afterDate는 sysdate 이후 날짜
			
			
			if(result < 0) {
			
				int targetNo = admin.getReportTargetNo();
				String targetType = admin.getReportType();
				
				System.out.println(targetNo);
				
				// 4. 해당 계정 활성화
				if(targetType.equals("M")) {
					result = service.activateAccount(targetNo);
				}
				
				if(result > 0) {
					System.out.println("회원번호 " + targetNo + "의 계정이 활성화되었습니다.");
					count = result;
					
					
				} else {
					System.out.println("계정 활성화 실패");
				}
			}
		}
	}
}
	
```

</div>
</details>
	

</div>
</details>		

<br>
	
<details>
<summary><b>4.4. Chart.js를 활용한 관리자 대시보드 그래프 구현</b></summary>
<div markdown="1">
	
![](https://user-images.githubusercontent.com/110653573/222223557-1e67c613-2ebd-4d30-b897-4e76a429af04.png)
<br>

[대시보드 DAO](https://github.com/luejenie/FarmFarm/blob/main/FarmFarm/src/main/java/edu/kh/farmfarm/admin/model/dao/AdminDAO.java#L35)
<br>
[대시보드 JS](https://github.com/luejenie/FarmFarm/blob/main/FarmFarm/src/main/webapp/resources/js/admin/dashboard.js)
	
</div>
</details>	
	
<!-- 핵심기능 접기 -->
</div>
</details>



</br></br>

## 5. 트러블 슈팅

### 5.1. Oracle Cloud 호스팅 중 예외 발생

- Oracle Cloud FarmFarm 프로젝트 파일을 호스팅하는 도중 **예상치 못한 예외가 발생**함.
- 로컬에서 서버를 돌렸을 경우에는 문제 없이 진행되었기 때문에 팀원 모두 원인을 찾지 못하는 상황에서
- 원인은 Chart.js를 수행하기 위한 **SQL문의 WHERE절**인 것을 발견함.

</br>

<details>
<summary><b>기존 코드</b></summary>
<div markdown="1">

~~~xml
  <select id="selectOrderGraph" resultMap="graph_rm">
	  SELECT TO_CHAR(b.OD, 'MM-DD') AS ORDER_DATE
	    	 , NVL(SUM(a.cnt), 0) AS ORDER_COUNT
		FROM ( SELECT TO_CHAR(ORDER_DATE, 'YYYY-MM-DD') AS ORDER_DATE
		              ,COUNT(*) cnt
		        FROM "ORDER"
		        WHERE ORDER_DATE BETWEEN SYSDATE-31
		                             AND SYSDATE
		        GROUP BY ORDER_DATE
		        ) a
		      , (SELECT (TO_DATE(SYSDATE-30,'YY-MM-DD') + LEVEL) AS OD
				FROM dual 
				<![CDATA[CONNECT BY LEVEL <= 31]]>) b
		WHERE b.OD = a.ORDER_DATE(+)
		GROUP BY b.OD
		ORDER BY b.OD
  </select>
~~~

</div>
</details>

</br>

- 기존 코드의 WHERE절을 보면 **CHAR 타입 데이터와 DATE 타입 데이터를 형변환 없이 비교**하고 있다는 것을 알 수 있음..
- 로컬 서버 환경에서는 타입이 다른 날짜 데이터의 비교가 가능했지만, Linux 환경에서 Oracle Cloud에 호스팅 된 페이지에서는 두 데이터의 **타입이 서로 달라 예외가 발생**함.
- 단순히 타입을 수정하는 것에서 문제를 해결하지 않고, SQL문을 보기좋은 코드로 바꿀 수 있도록 고민하여 아래와 같이 코드를 개선할 수 있었음.

</br>

<details>
<summary><b>개선된 코드</b></summary>
<div markdown="1">

~~~xml
  <select id="selectOrderGraph" resultMap="graph_rm">
	  <![CDATA[
		SELECT ORDER_DATE, 
            (SELECT COUNT(*) 
            FROM "ORDER" o 
            WHERE TO_CHAR(o.ORDER_DATE , 'YYYY-MM-DD') = a.ORDER_DATE) ORDER_COUNT
	 	FROM (SELECT TO_CHAR(SYSDATE - 31 + LEVEL, 'YYYY-MM-DD') ORDER_DATE 
		FROM DUAL CONNECT BY LEVEL <=31) a]]>
  </select>
~~~

</div>
</details>


</br></br>

### 5.2.

- Oracle Cloud FarmFarm 프로젝트 파일을 호스팅하는 도중 **예상치 못한 예외가 발생**함.
- 로컬에서 서버를 돌렸을 경우에는 문제 없이 진행되었기 때문에 팀원 모두 원인을 찾지 못하는 상황에서
- 원인은 Chart.js를 수행하기 위한 **SQL문의 WHERE절**인 것을 발견함.

</br>

<details>
<summary><b>기존 코드</b></summary>
<div markdown="1">

~~~xml
 
~~~

</div>
</details>





<!--## 6. 그 외 트러블 슈팅-->

    
</br>

<!--
## 6. 회고 / 느낀점
>프로젝트 개발 회고 글
-->
