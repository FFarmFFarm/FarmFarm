package edu.kh.farmfarm.admin.model.service;

import java.util.Map;


public interface AdminService {

	
	/** 관리자인지 확인
	 * @return result
	 */
	int checkAdmin();

	
	/** 대시보드 통계 조회
	 * @return statMap
	 */
	Map<String, Object> selectStats();


	/** 전체 회원 조회(페이지네이션, 정렬)
	 * @param paramMap
	 * @param cp
	 * @return map
	 */
	Map<String, Object> selectMember(Map<String, Object> paramMap, int cp);



}
