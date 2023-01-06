package edu.kh.farmfarm.admin.model.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.admin.model.vo.Admin;
import edu.kh.farmfarm.admin.model.vo.Graph;
import edu.kh.farmfarm.common.Pagination;
import edu.kh.farmfarm.member.model.VO.Member;

@Repository
public class AdminDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;
	

	/** 관리자인지 조회
	 * @return result
	 */
	public int checkAdmin() {
		return sqlSession.selectOne("adminMapper.checkAdmin");
	}
	
	
	
	/** 대시보드_통계 조회
	 * @return statMap
	 */
	public Map<String, Object> selectStats() {
		
		// 신규 주문
		int newOrderStat = sqlSession.selectOne("adminMapper.newOrderStat");
		
		// 반품 진행중
		int returnStat = sqlSession.selectOne("adminMapper.returnStat");
		
		
		// 신고 미처리
		int askReportStat = sqlSession.selectOne("adminMapper.askReportStat");
		
		
		// 판매자 인증
		int authSellerStat = sqlSession.selectOne("adminMapper.authSellerStat");
		
		
		Map<String, Object> statMap = new HashMap<String, Object>();
		statMap.put("newOrderStat", newOrderStat);
		statMap.put("askReportStat", askReportStat);
		statMap.put("authSellerStat", authSellerStat);
		statMap.put("returnStat", returnStat);
		
		return statMap;
	}

	
	

	/** 대시보드 회원가입자 수 조회
	 * @return signUpGraphList
	 */
	public List<Graph> selectSignUpGraph() {
		return sqlSession.selectList("graphMapper.selectSignUpGraph");
	}




	
	
	
	
	
	
	


	/** 전체 회원 수(관리자 제외)
	 * @return memberListCount
	 */
	public int memberListCount(Map<String, Object> paramMap) {
		return sqlSession.selectOne("adminMapper.memberListCount", paramMap);
	}



	/** 전체 회원 조회(정렬 포함)
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

	
	/** 회원 상세 조회(회원정보)
	 * @param inputMemberId
	 * @return memberDetailList
	 */
	public Admin selectMemberDetail(int hiddenNo) {
		return sqlSession.selectOne("adminMapper.selectMemberDetail", hiddenNo);
	}

	

	/** 회원 상세 조회(계정상태 변경 내역)
	 * @param inputMemberId
	 * @return memberHistoryList
	 */
	public List<Admin> selectMemberHistory(int hiddenNo) {
		return sqlSession.selectList("adminMapper.selectMemberHistory", hiddenNo);
	}

	
	

	/** 판매자 수
	 * @param preSellerFilter
	 * @return sellerListCount
	 */
	public int sellerListCount(Map<String, Object> paramMap) {
		return sqlSession.selectOne("adminMapper.sellerListCount", paramMap);
	}



	/** 판매자 조회 (인증대기 포함)  +정렬
	 * @param preSellerFilter
	 * @param pagination
	 * @return sellerList
	 */
	public List<Admin> selectSeller(Map<String, Object> paramMap, Pagination pagination) {
		
		int offset = (pagination.getCurrentPage() -1) * pagination.getLimit();  // limit = 10
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return sqlSession.selectList("adminMapper.selectSeller", paramMap, rowBounds);
	}



	/** 판매자 인증신청서 상세 조회
	 * @param hiddenNo
	 * @return authPaper
	 */
	public Admin selectAuthPaper(int hiddenNo) {
		return sqlSession.selectOne("adminMapper.selectAuthPaper", hiddenNo);
	}



	/** 판매자 인증 승인
	 * @param hiddenNo
	 * @return result
	 */
	public int sellerApprove(int hiddenNo) {
		return sqlSession.update("adminMapper.sellerApprove", hiddenNo);
	}



	/** 판매자 인증 처리 일자 수정
	 * @param hiddenNo
	 * @return result
	 */
	public int updateAuthDate(int hiddenNo) {
		return sqlSession.update("adminMapper.updateAuthDate", hiddenNo);
	}


	
	/** 판매자 인증 거절
	 * @param hiddenNo
	 * @return
	 */
	public int sellerDeny(int hiddenNo) {
		return sqlSession.update("adminMapper.sellerDeny", hiddenNo);
	}

	
	
	
	
	
	
	/** 미처리 신고 개수 (중복제거) _힌 아이디당 한 번씩 조회
	 * @param sortFilter
	 * @return reportListCount
	 */
	public int reportListCount(String sortFilter) {
		return sqlSession.selectOne("adminMapper.reportListCount", sortFilter);
	}

	
	
	/** 미처리 신고 개수 (중복포함) _ 한 아이디가 신고된 모든 개수 조회
	 * @return reportAllListCount
	 */
	public int reportAllListCount() {
		return sqlSession.selectOne("adminMapper.askReportStat");  // 대시보드 미처리 신고내역 통계와 같음.
	}

	
	

	/** 미처리 신고 조회
	 * @param sortFilter
	 * @param pagination
	 * @return newReportList
	 */
	public List<Admin> selectNewReport(String sortFilter, Pagination pagination) {
		
		int offset = (pagination.getCurrentPage() -1) * 15;  
		RowBounds rowBounds = new RowBounds(offset, 15);
		
		return sqlSession.selectList("adminMapper.selectNewReport", sortFilter, rowBounds);
	}



	/** 미처리 신고 상세 조회
	 * @param hiddenNo
	 * @return newReportDetail
	 */
	public Admin selectNewReportDetail(int hiddenReportNo) {
		return sqlSession.selectOne("adminMapper.selectNewReportDetail", hiddenReportNo);
	}



	/** 누적 신고 기록 조회
	 * @param reportType
	 * @param memberNo
	 * @param contentNo
	 * @return map
	 */
	public Map<String, Object> selectReportAccumulate(String reportType, int memberNo, int contentNo) {
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("reportType", reportType);
		paramMap.put("contentNo", contentNo);
		
		List<Admin> accumMemberList = new ArrayList<Admin>();
		List<Admin> accumContentList = new ArrayList<Admin>();
		
		if(reportType != null) {
			if(reportType.equals("M")) {
				accumMemberList = sqlSession.selectList("adminMapper.accumMemberList", memberNo);
				
			} else {
				accumContentList = sqlSession.selectList("adminMapper.accumContentList", paramMap);
			}
		}
		
		 Map<String, Object> map = new HashMap<String, Object>();
		 map.put("accumMemberList", accumMemberList);
		 map.put("accumContentList", accumContentList);
		
		return map;
	}





















}
