package edu.kh.farmfarm.member.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.member.model.dao.DupDAO;

@Service
public class DupServiceImpl implements DupService {

	@Autowired
	private DupDAO dao;

	@Override
	public int idDupCheck(String memberId) {
		return dao.idDupCheck(memberId);
	}

//	@Override
//	public int nameDupCheck(String memberName) {
//		return dao.nameDupCheck(memberName);
//	}

	@Override
	public int nicknameDupCheck(String memberNickname) {
		return dao.nicknameDupCheck(memberNickname);
	}

	// 전화번호 중복 검사 
	@Override
	public int tellDupCheck(String to) {
		return dao.tellDupCheck(to);
	}
}
