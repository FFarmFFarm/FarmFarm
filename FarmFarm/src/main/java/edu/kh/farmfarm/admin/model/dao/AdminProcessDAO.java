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
	
	
	/** 회원 강제 탈퇴
	 * @param inputMemberId
	 * @return result
	 */
	public int memberKickout(int hiddenNo) {
		return sqlSession.update("adminMapper.memberKickout", hiddenNo);
	}


	/** 신고 상태 변경, 신고 일자 업데이트
	 * @param hiddenId
	 * @return result
	 */
	public int changeReportStatus(int hiddenNo) {
		return sqlSession.update("adminMapper.changeReportStatus", hiddenNo);
	}


	/** 신고 회원 계정 정지
	 * @param hiddenNo
	 * @return
	 */
	public int reportMemberBanned(int hiddenNo) {
		// 위 신고 상태 변경과 같은 쿼리문 사용.
		// 여기에 탈퇴까지 하면 -> 강퇴  // 여기서 멈추면 -> 정지
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
