package edu.kh.farmfarm.admin.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.admin.model.vo.Admin;

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
	public int memberKickout(int memberNo) {
		return sqlSession.update("adminReportMapper.memberKickout", memberNo);
	}


	/** 신고 상태 변경, 신고 일자 업데이트 (계정)
	 * @param hiddenNo
	 * @return result
	 */
	public int changeReportStatus(int memberNo) {
		return sqlSession.update("adminReportMapper.changeReportStatus", memberNo);
	}
	
	
	
	/** 강제 탈퇴된 판매자의 판매글 삭제
	 * @param hiddenNo
	 * @return result
	 */
	public int deletePostofSeller(int memberNo) {
		return sqlSession.update("adminReportMapper.deletePostofSeller", memberNo);
	}



	/** 신고 회원 계정 정지
	 * @param hiddenNo
	 * @return result
	 */
	public int reportMemberBanned(int memberNo) {
		// 위 신고 상태 변경과 같은 쿼리문 사용.
		// 여기에 탈퇴까지 하면 -> 강퇴  // 여기서 멈추면 -> 정지
		return sqlSession.update("adminReportMapper.changeReportStatus", memberNo);  
	}

	
	/** 신고 회원 반려
	 * @param hiddenNo
	 * @return result
	 */
	public int reportMemberLeave(int memberNo) {
		return sqlSession.update("adminReportMapper.reportMemberLeave", memberNo);
	}


	
	/** 신고 커뮤니티게시글 삭제
	 * @param hiddenContentNo
	 * @return result
	 */
	public int reportDeleteBoard(int contentNo) {
		return sqlSession.update("adminReportMapper.reportDeleteBoard", contentNo);
	}


	/** 신고 판매글 삭제
	 * @param hiddenContentNo
	 * @return result
	 */
	public int reportDeletePost(int contentNo) {
		return sqlSession.update("adminReportMapper.reportDeletePost", contentNo);
	}

	

	/** 신고 댓글 삭제
	 * @param hiddenContentNo
	 * @return result
	 */
	public int reportDeleteComment(int contentNo) {
		return sqlSession.update("adminReportMapper.reportDeleteComment", contentNo);
	}

	

	/** 신고 상태 변경, 신고 일자 업데이트 (계정)
	 * @param paramMap
	 * @return result
	 */
	public int changeReportStatusCt(Map<String, Object> paramMap) {
		return sqlSession.update("adminReportMapper.changeReportStatusCt", paramMap);
	}


	/** 신고 게시글 반려
	 * @param paramMap
	 * @return
	 */
	public int reportLeaveContent(Map<String, Object> paramMap) {
		return sqlSession.update("adminReportMapper.reportLeaveContent", paramMap);
	}


	/** 정지된 계정 리스트 조회(스케쥴링)
	 * @return bannedAccountList
	 */
	public List<Admin> selectBannedAccountList() {
		return sqlSession.selectList("adminReportMapper.selectBannedAccountList");
	}


	/** 정지된 계정 활성화(스케쥴링)
	 * @param targetNo
	 * @return result
	 */
	public int activateAccount(int targetNo) {
		// processDate는 변경하지 않음!!
		return sqlSession.update("adminReportMapper.activateAccount", targetNo);
	}






}
