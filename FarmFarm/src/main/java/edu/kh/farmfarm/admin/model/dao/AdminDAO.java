package edu.kh.farmfarm.admin.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.admin.model.vo.Admin;
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
		
		// 반품 조회
		
		
		
		// 신고 미처리
		int askReportStat = sqlSession.selectOne("adminMapper.askReportStat");
		
		
		// 판매자 인증
		int authSellerStat = sqlSession.selectOne("adminMapper.authSellerStat");
		
		
		Map<String, Object> statMap = new HashMap<String, Object>();
		statMap.put("newOrderStat", newOrderStat);
		statMap.put("askReportStat", askReportStat);
		statMap.put("authSellerStat", authSellerStat);
		
		return statMap;
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
	public Admin selectMemberDetail(String hiddenId) {
		return sqlSession.selectOne("adminMapper.selectMemberDetail", hiddenId);
	}

	

	/** 회원 상세 조회(계정상태 변경 내역)
	 * @param inputMemberId
	 * @return memberHistoryList
	 */
	public List<Admin> selectMemberHistory(String hiddenId) {
		return sqlSession.selectList("adminMapper.selectMemberHistory", hiddenId);
	}

	
	
	/** 회원 강제 탈퇴
	 * @param inputMemberId
	 * @return result
	 */
	public int memberKickout(String hiddenId) {
		return sqlSession.update("adminMapper.memberKickout", hiddenId);
	}



	/** 판매자 수
	 * @param preSellerFilter
	 * @return sellerListCount
	 */
	public int sellerListCount(int sellerFilter) {
		return sqlSession.selectOne("adminMapper.sellerListCount", sellerFilter);
	}



	/** 판매자 조회 (인증대기 포함)  +정렬
	 * @param preSellerFilter
	 * @param pagination
	 * @return sellerList
	 */
	public List<Admin> selectSeller(int sellerFilter, Pagination pagination) {
		
		int offset = (pagination.getCurrentPage() -1) * pagination.getLimit();  // limit = 10
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return sqlSession.selectList("adminMapper.selectSeller", sellerFilter, rowBounds);
	}



	/** 판매자 인증신청서 조회
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


	
	// 판매자 인증 거절
	
	
	
	
	
	
	
	
	/** 미처리 신고 개수
	 * @param sortFilter
	 * @return reportListCount
	 */
	public int reportListCount(String sortFilter) {
		return sqlSession.selectOne("adminMapper.reportListCount", sortFilter);
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
















}
