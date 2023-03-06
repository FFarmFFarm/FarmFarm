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
	

	
	
	
}
