package edu.kh.farmfarm.find.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.farmfarm.find.dao.FindDAO;
import edu.kh.farmfarm.member.model.VO.Member;

@Service
public class FindServiceImpl implements FindService {

	@Autowired
	private FindDAO dao;
	
	@Autowired
	private BCryptPasswordEncoder bcrypt;

	/** 
	 * 아이디 찾기 
	 * @return
	 */
	@Override
	public Member findId(Member inputMember) {
		return dao.findId(inputMember);
	}

	/** 
	 * 비밀번호 찾기 
	 * @return
	 */
	@Override
	public Member findPw(Member inputMember) {
		return dao.findPw(inputMember);
	}

	/** 
	 * 비밀번호 변경   
	 * @return
	 */
	@Transactional
	@Override
	public int changePw(Map<String, Object> paramMap) {
		String newPw = bcrypt.encode((String)paramMap.get("memberPw"));
		
		paramMap.put("newPw", newPw);
		
		int result = dao.changePw(paramMap);
		
      System.out.println("입력한 비밀번호 : " + newPw);
      System.out.println("암호화 비밀번호 : " + bcrypt.encode(newPw) );
		return result;
	}
	
}
