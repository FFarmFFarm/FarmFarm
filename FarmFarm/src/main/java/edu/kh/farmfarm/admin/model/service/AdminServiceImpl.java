package edu.kh.farmfarm.admin.model.service;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.admin.model.dao.AdminDAO;
import edu.kh.farmfarm.admin.model.vo.Admin;
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
	public Map<String, Object> selectSeller(int sellerFilter, int cp) {
		
		/* 페이지네이션 */
		// 1. 전체 개수 가져오기
		int sellerListCount = dao.sellerListCount(sellerFilter);
		
		// 2. 가져온 개수와 현재 페이지를 이용하여 페이지네이션 객체 발생
		Pagination pagination = new Pagination(sellerListCount, cp, 10);
		
		// 3. 페이지네이션 객체를 생성해 목록 불러오기
		// 전체 판매자(인증대기포함) 조회 (정렬 포함)
		List<Admin> sellerList = dao.selectSeller(sellerFilter, pagination);
		
		
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
	
	
	// 판매자 인증 거절
	
	
	
	
	
	
	
	
	
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
		
		
		// 신고 중복 포함된 전체 개수
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
	
	
	
	
	
	
	
	
	
}
