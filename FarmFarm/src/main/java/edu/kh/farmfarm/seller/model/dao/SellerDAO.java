package edu.kh.farmfarm.seller.model.dao;


import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.member.model.VO.Member;

@Repository
public class SellerDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;

	/** 멤버 정보 조회
	 * @param memberNo
	 * @return memberInfo
	 */
	public Member selectMemberInfo(int memberNo) {
		return sqlSession.selectOne("sellerMapper.selectMemberInfo", memberNo);
	}

	/** 판매글 수 조회
	 * @param memberNo
	 * @return listCount
	 */
	public int getListCount(int memberNo) {
		return sqlSession.selectOne("sellerMapper.getListCount", memberNo);
	}
	
}
