package edu.kh.farmfarm.admin.model.service;

import java.util.Map;

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
	
	
	/** 신고 계정 정지
	 * @param hiddenNo
	 * @return result
	 */
	int reportMemberBanned(int hiddenNo);


	/** 신고 계정 반려
	 * @param hiddenNo
	 * @return result
	 */
	int reportMemberLeave(int hiddenNo);


	/** 신고 게시글 삭제
	 * @param paramMap
	 * @return result
	 */
	int reportDeleteContent(int hiddenContentNo, String reportType);


	/** 신고 게시글 반려
	 * @param paramMap
	 * @return result
	 */
	int reportLeaveContent(Map<String, Object> paramMap);






}
