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
	public List<Member> selectMember(Map<String, Object> paramMap, Pagination pagination) {
		
		int offset = (pagination.getCurrentPage() -1) * 15;
		RowBounds rowBounds = new RowBounds(offset, 15);
		
		return sqlSession.selectList("adminMapper.selectMemberList", paramMap, rowBounds);
	}



	/** 회원 강제 탈퇴
	 * @param inputMemberId
	 * @return result
	 */
	public int memberKickout(String inputMemberId) {
		return sqlSession.update("adminMapper.memberKickout", inputMemberId);
	}







}
