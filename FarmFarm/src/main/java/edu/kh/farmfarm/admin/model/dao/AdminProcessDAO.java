package edu.kh.farmfarm.admin.model.dao;

import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class AdminProcessDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	
	
	/** 관리자인지 조회
	 * @return result
	 */
	public int checkAdmin() {
		return sqlSession.selectOne("adminMapper.checkAdmin");
	}
	
	
	/** 회원 강제 탈퇴
	 * @param inputMemberId
	 * @return result
	 */
	public int memberKickout(int hiddenNo) {
		return sqlSession.update("adminMapper.memberKickout", hiddenNo);
	}


	/** 신고 상태 변경, 신고 일자 업데이트 (계정)
	 * @param hiddenNo
	 * @return result
	 */
	public int changeReportStatus(int hiddenNo) {
		return sqlSession.update("adminMapper.changeReportStatus", hiddenNo);
	}


	/** 신고 회원 계정 정지
	 * @param hiddenNo
	 * @return result
	 */
	public int reportMemberBanned(int hiddenNo) {
		// 위 신고 상태 변경과 같은 쿼리문 사용.
		// 여기에 탈퇴까지 하면 -> 강퇴  // 여기서 멈추면 -> 정지
		return sqlSession.update("adminMapper.changeReportStatus", hiddenNo);  
	}

	
	/** 신고 회원 반려
	 * @param hiddenNo
	 * @return result
	 */
	public int reportMemberLeave(int hiddenNo) {
		return sqlSession.update("adminMapper.reportMemberLeave", hiddenNo);
	}


	
	/** 신고 커뮤니티게시글 삭제
	 * @param hiddenContentNo
	 * @return result
	 */
	public int reportDeleteBoard(int hiddenContentNo) {
		return sqlSession.update("adminMapper.reportDeleteBoard", hiddenContentNo);
	}


	/** 신고 판매글 삭제
	 * @param hiddenContentNo
	 * @return
	 */
	public int reportDeletePost(int hiddenContentNo) {
		return sqlSession.update("adminMapper.reportDeletePost", hiddenContentNo);
	}


	/** 신고 상태 변경, 신고 일자 업데이트 (계정)
	 * @param paramMap
	 * @return result
	 */
	public int changeReportStatusCt(Map<String, Object> paramMap) {
		return sqlSession.update("adminMapper.changeReportStatusCt", paramMap);
	}


	/** 신고 게시글 반려
	 * @param paramMap
	 * @return
	 */
	public int reportLeaveContent(Map<String, Object> paramMap) {
		return sqlSession.update("adminMapper.reportLeaveContent", paramMap);
	}


	
	

}
