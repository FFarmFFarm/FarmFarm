package edu.kh.farmfarm.admin.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.admin.model.dao.AdminDAO;
import edu.kh.farmfarm.admin.model.vo.Admin;
import edu.kh.farmfarm.common.Pagination;
import edu.kh.farmfarm.member.model.VO.Member;

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
	public Map<String, Object> selectMemberDetail(String hiddenId) {
		
		// 회원 상세 조회(회원 정보)
		Admin memberDetailInfo = dao.selectMemberDetail(hiddenId);
		
		// 회원 상세 조회(계정상태 변경 내역)
		List<Admin> memberHistoryList = dao.selectMemberHistory(hiddenId);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("memberDetailInfo", memberDetailInfo);
		map.put("memberHistoryList", memberHistoryList);
		
		return map;
	}
	
	
			
	// 회원 강제 탈퇴
	@Override
	public int memberKickout(String hiddenId) {
		return dao.memberKickout(hiddenId);
	}
	
	
	
	// 판매자 인증 조회
	@Override
	public Map<String, Object> selectSeller(int preSellerFilter, int cp) {
		
		/* 페이지네이션 */
		// 1. 전체 개수 가져오기
		int sellerListCount = dao.sellerListCount(preSellerFilter);
		
		// 2. 가져온 개수와 현재 페이지를 이용하여 페이지네이션 객체 발생
		Pagination pagination = new Pagination(sellerListCount, cp, 10);
		
		// 3. 페이지네이션 객체를 생성해 목록 불러오기
		// 전체 판매자(인증대기포함) 조회 (정렬 포함)
		List<Admin> sellerList = dao.selectSeller(preSellerFilter, pagination);
		
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("sellerListCount", sellerListCount);
		map.put("sellerList", sellerList);
		map.put("pagination", pagination);
		
		return map;
		
	}
	
	

}
