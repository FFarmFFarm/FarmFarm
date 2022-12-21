package edu.kh.farmfarm.seller.model.dao;


import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.member.model.VO.Member;

@Repository
public class SellerDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;

	public Member selectMemberInfo(int memberNo) {
		return sqlSession.selectOne("sellerMapper.selectMemberInfo", memberNo);
	}
	
}
