package edu.kh.farmfarm.admin.model.service;

public interface AdminProcessService {
	
	/** 관리자인지 확인
	 * @return result
	 */
	int checkAdmin();
	
	
	/** 회원 강제 탈퇴 (회원관리, 신고내역X)
	 * @param inputMemberId
	 * @return result
	 */
	int memberKickout(int hiddenNo);


	/** 회원 강제 탈퇴 (신고 내역O)
	 * @param hiddenId
	 * @return result
	 */
	int reportMemberKickout(int hiddenNo);

}
