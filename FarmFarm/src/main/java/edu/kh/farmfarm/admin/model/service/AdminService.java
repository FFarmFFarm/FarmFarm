package edu.kh.farmfarm.admin.model.service;

import java.util.List;
import java.util.Map;

import edu.kh.farmfarm.admin.model.vo.Admin;
import edu.kh.farmfarm.admin.model.vo.Graph;
import edu.kh.farmfarm.inquire.model.vo.InquireRoom;


public interface AdminService {

	
	/** 관리자인지 확인
	 * @return result
	 */
	int checkAdmin();

	
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
	Map<String, Object> selectMemberDetail(int hiddenNo);

	
	
	
	
	/** 판매자 인증 조회
	 * @param preSellerFilter
	 * @param cp
	 * @return map
	 */
	Map<String, Object> selectSeller(Map<String, Object> paramMap, int cp);


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

	
	
	/** 판매자 인증 거절
	 * @param hiddenNo
	 * @return result
	 */
	int sellerDeny(int hiddenNo);
	
	

	/** 미처리 신고 조회
	 * @param sortFilter
	 * @param cp
	 * @return map
	 */
	Map<String, Object> selectNewReport(String sortFilter, int cp);


	/** 미처리 신고 상세 조회(모달)
	 * @param hiddenNo
	 * @return newReportDetail
	 */
	Admin selectNewReportDetail(int hiddenReportNo);



	/** 신고 누적 기록 조회(모달)
	 * @param reportType
	 * @param memberNo
	 * @param contentNo
	 * @return map
	 */
	Map<String, Object> selectReportAccumulate(String reportType, int memberNo, int contentNo, String allNew);


	/** 전체 신고 내역 조회
	 * @param typeFilter
	 * @param cp
	 * @return map
	 */
	Map<String, Object> selectReportAllList(Map<String, Object> paramMap, int c);


	/** 전체 신고 상세 조회
	 * @param hiddenReportNo
	 * @return reportDetail
	 */
	Admin selectReportDetail(int hiddenReportNo);











	
	
	









}
