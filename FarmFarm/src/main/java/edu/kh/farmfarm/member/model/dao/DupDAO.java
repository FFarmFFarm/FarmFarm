package edu.kh.farmfarm.member.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class DupDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;

	public int idDupCheck(String memberId) {
		return sqlSession.selectOne("dupMapper.idDupCheck", memberId);
	}

	public int nameDupCheck(String memberName) {
		return sqlSession.selectOne("dupMapper.nameDupCheck", memberName);
	}

	public int nicknameDupCheck(String memberNickname) {
		return sqlSession.selectOne("dupMapper.nicknameDupCheck",memberNickname);
	}
}
