package edu.kh.farmfarm.seller.model.dao;


import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.postDetail.model.vo.Post;
import edu.kh.farmfarm.seller.model.vo.SellerPagination;

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

	/** 판매글 리스트 조회
	 * @param pagination
	 * @param memberNo
	 * @return map
	 */
	public List<Post> selectPostList(SellerPagination pagination, int memberNo) {
		
		int offset = (pagination.getCurrentPage()-1)*pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return sqlSession.selectList("sellerMapper.selectPostList", memberNo, rowBounds);
	}
	
}
