package edu.kh.farmfarm.admin.model.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import edu.kh.farmfarm.admin.model.vo.Admin;
import edu.kh.farmfarm.admin.model.vo.Graph;
import edu.kh.farmfarm.inquire.model.vo.InquireRoom;


public interface AdminService {
	
	/** 대시보드 통계 조회
	 * @return statMap
	 */
	Map<String, Object> selectStats();
	
	
	/** 대시보드 회원가입자 수, 주문 수 조회
	 * @return signUpGraphList
	 */
	Map<String, Object> selectGraph();
	
	


	/** 전체 회원 조회(정렬, 페이지네이션, 검색)
	 * @param paramMap
	 * @param cp
	 * @return map
	 */
	Map<String, Object> selectMember(Map<String, Object> paramMap, int cp);

	
	/** 회원 상세 조회 (회원정보 + 계정 상태 변경 내역)
	 * @param inputMemberId
	 * @return map
	 */
	Map<String, Object> selectMemberDetail(int memberNo);



}
