package edu.kh.farmfarm.admin.model.service;

import java.util.List;
import java.util.Map;

import edu.kh.farmfarm.member.model.VO.Member;

public interface AdminService {

	
	/** 관리자인지 확인
	 * @return result
	 */
	int checkAdmin();

	
	/** 대시보드 통계 조회
	 * @return statMap
	 */
	Map<String, Object> selectStats();


	/** 전체 회원 조회
	 * @param memberNo
	 * @return memberAllList
	 */
	List<Member> selectMemberAll(int memberNo);


}
