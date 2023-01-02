package edu.kh.farmfarm.admin.model.service;

import java.util.List;
import java.util.Map;

import edu.kh.farmfarm.admin.model.vo.Admin;


public interface AdminService {

	
	/** 관리자인지 확인
	 * @return result
	 */
	int checkAdmin();

	
	/** 대시보드 통계 조회
	 * @return statMap
	 */
	Map<String, Object> selectStats();


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
	Map<String, Object> selectMemberDetail(String hiddenId);

	
	
	/** 회원 강제 탈퇴
	 * @param inputMemberId
	 * @return result
	 */
	int memberKickout(String hiddenId);


	
	
	
	/** 판매자 인증 조회
	 * @param preSellerFilter
	 * @param cp
	 * @return map
	 */
	Map<String, Object> selectSeller(int sellerFilter, int cp);


	/** 판매자 인증 신청서 조회
	 * @param hiddenNo
	 * @return authPaper
	 */
	Admin selectAuthPaper(int hiddenNo);


	/** 판매자 인증 승인
	 * @param hiddenNo
	 * @return result
	 */
	int sellerApprove(int hiddenNo);

	
	// 판매자 인증 거절
	
	
	
	
	
	
	
	

	/** 미처리 신고 조회
	 * @param sortFilter
	 * @param cp
	 * @return map
	 */
	Map<String, Object> selectNewReport(String sortFilter, int cp);












}
