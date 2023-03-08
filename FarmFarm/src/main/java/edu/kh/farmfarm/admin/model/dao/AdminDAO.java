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
import edu.kh.farmfarm.seller.model.vo.Seller;

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

	

	/** 대시보두 가입자수, 주문수 조회
	 * @return
	 */
	public Map<String, Object> selectGraph() {
		
		// 가입자 수
		List<Graph> singUpGraphList = sqlSession.selectList("graphMapper.selectSignUpGraph");
		
		// 주문 수
		List<Graph> orderGraphList = sqlSession.selectList("graphMapper.selectOrderGraph");
		
		// 7일 매출
		List<Graph> orderWeekList = sqlSession.selectList("graphMapper.orderWeekList");
		
		// top 5
		List<Graph> productRankingList = sqlSession.selectList("graphMapper.productRankingList");
		
		
		Map<String, Object> graphMap = new HashMap<String, Object>();
		graphMap.put("signUpGraphList", singUpGraphList);
		graphMap.put("orderGraphList", orderGraphList);
		graphMap.put("orderWeekList", orderWeekList);
		graphMap.put("productRankingList", productRankingList);
		
		return graphMap;
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
	public Admin selectMemberDetail(int memberNo) {
		return sqlSession.selectOne("adminMapper.selectMemberDetail", memberNo);
	}

	

	/** 회원 상세 조회(계정상태 변경 내역)
	 * @param inputMemberId
	 * @return memberHistoryList
	 */
	public List<Admin> selectMemberHistory(int memberNo) {
		return sqlSession.selectList("adminMapper.selectMemberHistory", memberNo);
	}

	


}
