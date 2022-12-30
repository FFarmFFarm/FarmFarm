package edu.kh.farmfarm.find.dao;

import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.member.model.VO.Member;

@Repository
public class FindDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;

	/** 
	 * 아이디 찾기 
	 * @return
	 */
	public Member findId(Member inputMember) {
		return sqlSession.selectOne("memberMapper.findId", inputMember);
	}
	
	/** 
	 * 비밀번호 찾기 
	 * @return
	 */
	public Member findPw(Member inputMember) {
		return sqlSession.selectOne("memberMapper.findPw", inputMember);
	}

	/** 
	 * 비밀번호 변경   
	 * @return
	 */
	public int changePw(Map<String, Object> paramMap) {
		return sqlSession.update("memberMapper.changePw", paramMap);
	}
}
