package edu.kh.farmfarm.admin.model.service;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import edu.kh.farmfarm.admin.model.dao.AdminDAO;
import edu.kh.farmfarm.admin.model.vo.Admin;
import edu.kh.farmfarm.admin.model.vo.Graph;
import edu.kh.farmfarm.common.Pagination;
import edu.kh.farmfarm.common.Util;
import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.seller.model.vo.Seller;

@Service
public class AdminServiceImpl implements AdminService{
	
	@Autowired
	private AdminDAO dao;
	
	// 관리자인지 확인
	@Override
	public int checkAdmin() {
		return dao.checkAdmin();
	}
	
	
	// 대시보드 통계 조회
	@Override
	public Map<String, Object> selectStats() {
		return dao.selectStats();
	}
	
	
	// 대시보드 회원가입자수, 주문수 조회
	@Override
	public Map<String, Object> selectGraph() {
		return dao.selectGraph();
	}
		
	
	
	
	
	

	// 전체 회원 조회 (정렬, 페이지네이션, 검색)
	@Override
	public Map<String, Object> selectMember(Map<String, Object> paramMap, int cp) {

		
		/* 페이지네이션 */
		// 1. 전체 개수를 가져옴.
		int memberListCount = dao.memberListCount(paramMap);
		
		// 2. 가져온 개수와 현재 페이지를 이용해서 페이지네이션 객체 생성
		Pagination pagination = new Pagination(memberListCount, cp, 15);
		
		// 3. 페이네이션 객체를 생성해 목록 불러오기
		// 전체 회원 조회(정렬 포함)
		List<Admin> memberList = dao.selectMember(paramMap, pagination);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("memberListCount", memberListCount);
		map.put("pagination", pagination);
		map.put("memberList", memberList);
		
		
		return map;
	}

	
	// 회원 상세 조회
	@Override
	public Map<String, Object> selectMemberDetail(int hiddenNo) {
		
		// 회원 상세 조회(회원 정보)
		Admin memberDetailInfo = dao.selectMemberDetail(hiddenNo);
		
		// 회원 상세 조회(계정상태 변경 내역)
		List<Admin> memberHistoryList = dao.selectMemberHistory(hiddenNo);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("memberDetailInfo", memberDetailInfo);
		map.put("memberHistoryList", memberHistoryList);
		
		return map;
	}
	
	
			

	
	
	// 판매자 인증 조회
	@Override
	public Map<String, Object> selectSeller(Map<String, Object> paramMap, int cp) {
		
		/* 페이지네이션 */
		// 1. 전체 개수 가져오기
		int sellerListCount = dao.sellerListCount(paramMap);
		
		// 2. 가져온 개수와 현재 페이지를 이용하여 페이지네이션 객체 발생
		Pagination pagination = new Pagination(sellerListCount, cp, 10);
		
		// 3. 페이지네이션 객체를 생성해 목록 불러오기
		// 전체 판매자(인증대기포함) 조회 (정렬 포함)
		List<Admin> sellerList = dao.selectSeller(paramMap, pagination);
		
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("sellerListCount", sellerListCount);
		map.put("sellerList", sellerList);
		map.put("pagination", pagination);
		
		return map;
		
	}
	
	
	// 인증 신청서 조회
	@Override
	public Admin selectAuthPaper(int hiddenNo) {
		
		Admin authPaper = dao.selectAuthPaper(hiddenNo);
		
		return authPaper;
	}
	
	
	// 판매자 인증 승인
	@Override
	public int sellerApprove(int hiddenNo) {
		
		// 회원 권한을 판매자로 변경
		int result = dao.sellerApprove(hiddenNo);
		
		if(result > 0) {
			// 판매자 인증 처리 일자 수정
			result = dao.updateAuthDate(hiddenNo);
		}
		return result;
	}
	
	
	
	
	// 판매자 인증 보류
	@Override
	public int sellerDeny(int hiddenNo, String denyReason) {
		
		// 회원 권한을 인증 보류로 변경
		int result = dao.sellerDeny(hiddenNo, denyReason);
		
		if(result > 0) {
			
			// 판매자 인증 처리 일자 수정
			result = dao.updateAuthDate(hiddenNo);
		}
		
		return result;
	}
	
	
	
	// 판매자 인증 보류 사유 가져오기
	@Override
	public String selectDenyReason(int memberNo) {
		return dao.selectDenyReason(memberNo);
	}
	
	
	
	// 판매자 인증 사진 업데이트
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int updateSellerImage(int memberNo, String webPath, String folderPath, 
								MultipartFile farmImg) throws IOException {
		
		// 이미지 삽입
		String rename = null;
		Seller farmImage = new Seller();
		
		int result = 0;
		
		// 업로드된 파일이 있다면
		if(farmImg.getSize() > 0) {
			
			// 원본 파일명을 변경된 파일명으로 변경
			rename = Util.fileRename(farmImg.getOriginalFilename()); 
			
			farmImage.setMemberNo(memberNo);
			farmImage.setFarmImg(rename);
			
			result = dao.updateSellerImage(farmImage);
			
			if(result > 0) {
				// 실제 파일로 변환
				farmImg.transferTo(new File(folderPath + rename));
			}
			
		}
		
		return result;
	}
	
	
	
	// 미처리 신고 조회
	@Override
	public Map<String, Object> selectNewReport(String sortFilter, int cp) {
		
		/* 페이지네이션 */
		// 1. 전체 개수 가져오기 (신고 중복 제거)
		int reportListCount = dao.reportListCount(sortFilter);
		
		// 2. 가져온 개수와 현재 페이지를 이용하여 페이지네이션 객체 발생
		Pagination pagination = new Pagination(reportListCount, cp, 15);
		
		// 3. 페이지네이션 객체를 생성해 목록 불러오기
		// 미처리 신고 조회
		List<Admin> newReportList = dao.selectNewReport(sortFilter, pagination);
		
		
		// 신고 중복 포함된 미처리 신고 전체 개수 
		int reportAllListCount = dao.reportAllListCount();
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("reportListCount", reportListCount);
		map.put("newReportList", newReportList);
		map.put("pagination", pagination);
		map.put("reportAllListCount", reportAllListCount);
		
		return map;
	}
		

	
	// 미처리 신고 상세 조회
	@Override
	public Admin selectNewReportDetail(int hiddenReportNo) {
		return dao.selectNewReportDetail(hiddenReportNo);
	}
	
	
	// 신고 누적 기록 
@	Override
	public Map<String, Object> selectReportAccumulate(String reportType, int memberNo, int contentNo, String allNew) {
		return dao.selectReportAccumulate(reportType, memberNo, contentNo, allNew);
	}	
	
	
	// 전체 신고 기록	
	@Override
	public Map<String, Object> selectReportAllList(Map<String, Object> paramMap, int cp) {

		// 1. 전체 페이지네이션 개수 가져오기
		// reportAllListCount: 미처리신고 전체 개수(중복포함)
		// reportAllCount : 전체 신고 개수(중복X, 페이지네이션용)
		int reportAllCount = dao.reportAllCount(paramMap);
		
		// 2. 가져온 개수와 현재 페이지를 이용하여 페이지네이션 객체 발생
		Pagination pagination = new Pagination(reportAllCount, cp, 15);
		
		// 3. 페이지네이션 객체를 생성해 목록 불러오기
		// 전체 신고 조회
		List<Admin> reportAllList = dao.selectReportAllList(paramMap, pagination);
		
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("reportAllCount", reportAllCount);
		map.put("pagination", pagination);
		map.put("reportAllList", reportAllList);
		
		return map;
	}
	
	
	// 전체 신고 기록 - 상세 내역
	@Override
	public Admin selectReportDetail(int hiddenReportNo) {
		return dao.selectReportDetail(hiddenReportNo);
	}
	
	
	
}
