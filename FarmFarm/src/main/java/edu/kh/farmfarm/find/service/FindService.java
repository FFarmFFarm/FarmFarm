package edu.kh.farmfarm.find.service;

import java.util.Map;

import edu.kh.farmfarm.member.model.VO.Member;

public interface FindService {

	/** 
	 * 아이디 찾기 
	 * @return
	 */
	Member findId(Member inputMember);

	/** 
	 * 비밀번호 찾기 
	 * @return
	 */
	Member findPw(Member inputMember);

	/** 
	 * 비밀번호 변경   
	 * @return
	 */
	int changePw(Map<String, Object> paramMap);
	
}
