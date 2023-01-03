package edu.kh.farmfarm.admin.model.dao;

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
	
	
	/** 회원 강제 탈퇴 (회원관리, 신고x)
	 * @param inputMemberId
	 * @return result
	 */
	public int memberKickout(int hiddenNo) {
		return sqlSession.update("adminMapper.memberKickout", hiddenNo);
	}


	/** 신고 회원 강제 탈퇴(신고o)
	 * @param hiddenId
	 * @return result
	 */
	public int changeReportStatus(int hiddenNo) {
		return sqlSession.update("adminMapper.changeReportStatus", hiddenNo);
	}


	/** 신고 회원 반려
	 * @param hiddenNo
	 * @return
	 */
	public int reportMemberLeave(int hiddenNo) {
		return sqlSession.update("adminMapper.reportMemberLeave", hiddenNo);
	}

	
	

}
