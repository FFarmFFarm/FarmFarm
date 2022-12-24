package edu.kh.farmfarm.admin.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.admin.model.dao.AdminDAO;
import edu.kh.farmfarm.member.model.VO.Member;

@Service
public class AdminServiceImpl implements AdminService{
	
	@Autowired
	private AdminDAO dao;
	
	// 관리자인기 확인
	@Override
	public int checkAdmin() {
		return dao.checkAdmin();
	}
	
	
	// 대시보드 통계 조회
	@Override
	public Map<String, Object> selectStats() {
		return dao.selectStats();
	}
	

	// 회원 전체 조회
	@Override
	public List<Member> selectMemberAll(int memberNo) {
		return dao.selectMemberAll(memberNo);
	}

}
