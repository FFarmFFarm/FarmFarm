package edu.kh.farmfarm.member.model.service;

import org.springframework.stereotype.Service;

import edu.kh.farmfarm.member.model.dao.MemberDAO;

@Service
public class MemberServiceImpl implements MemberService {

	private MemberDAO dao;
}
