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
	

	// 전체 회원 조회
	@Override
	public Map<String, Object> selectMember(Map<String, Object> paramMap, int cp) {

		
		/* 페이지네이션 */
		// 1. 전체 개수를 가져옴.
		int memberListCount = dao.memberListCount();
		
		// 2. 가져온 개수와 현재 페이지를 이용해서 페이지네이션 객체 생성
		Pagination pagination = new Pagination(memberListCount, cp, 15);
		
		// 3. 페이네이션 객체를 생성해 목록 불러오기
		// 전체 회원 조회(정렬 포함)
		List<Member> memberList = dao.selectMember(paramMap, pagination);
		
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("memberListCount", memberListCount);
		map.put("pagination", pagination);
		map.put("memberList", memberList);
		
		return map;
	}
	
	

}
