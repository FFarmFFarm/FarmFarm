package edu.kh.farmfarm.seller.model.dao;


import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.common.Pagination;
import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.postDetail.model.vo.Post;
import edu.kh.farmfarm.postDetail.model.vo.PostImg;

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
	public List<Post> selectPostList(Pagination pagination, int memberNo) {
		
		int offset = (pagination.getCurrentPage()-1)*pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return sqlSession.selectList("sellerMapper.selectPostList", memberNo, rowBounds);
	}
	

	/** 게시글 등록
	 * @param post
	 * @return postNo
	 */
	public int enrollPost(Post post) {
		int result = sqlSession.insert("sellerMapper.enrollPost", post);
		
		if(result>0) {
			result = post.getPostNo();
		}
		return result;
	}

	/** 이미지 삽입
	 * @param imgList
	 * @return result
	 */
	public int insertPostImgList(List<PostImg> imgList) {
		return sqlSession.insert("sellerMapper.insertPostImgList", imgList);
	}

	/** 판매완료 처리
	 * @param postNo
	 * @return result
	 */
	public int soldoutPost(int postNo) {
		return sqlSession.update("sellerMapper.soldoutPost",postNo);
	}

	/** 상품삭제
	 * @param postNo
	 * @return result
	 */
	public int deletePost(int postNo) {
		return sqlSession.update("sellerMapper.deletePost", postNo);
	}
	
	
	/** 게시글 수정페이지로 이동(상세조회)
	 * @param postNo
	 * @return
	 */
	public Post selectPostDetail(int postNo) {
		return sqlSession.selectOne("sellerMapper.selectPost", postNo);
	}

	/** 게시글 수정
	 * @param post
	 * @return result
	 */
	public int updatePost(Post post) {
		return sqlSession.update("sellerMapper.updatePost", post);
	}

	/** 이미지 삭제
	 * @param condition
	 * @return result
	 */
	public int postImgDelete(String condition) {
		return sqlSession.delete("sellerMapper.postImgDelete", condition);
	}

	/** 이미지 업데이트
	 * @param img
	 * @return result
	 */
	public int postImgUpdate(PostImg img) {
		return sqlSession.update("sellerMapper.postImgUpdate", img);
	}

	/** 이미지 삽입
	 * @param img
	 * @return result
	 */
	public int postImgInsert(PostImg img) {
		return sqlSession.insert("sellerMapper.postImgInsert", img);
	}

	
	/** 판매중인 물품 수
	 * @param memberNo
	 * @return listCount
	 */
	public int getSellListCount(int memberNo) {
		return sqlSession.selectOne("sellerMapper.getSellListCount", memberNo);
	}

	
	/** 판매중인 물품만 보기
	 * @param pagination
	 * @param memberNo
	 * @return postList
	 */
	public List<Post> selectSellList(Pagination pagination, int memberNo) {
		
		int offset = (pagination.getCurrentPage()-1)*pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return sqlSession.selectList("sellerMapper.selectSellList", memberNo, rowBounds);
	}


	
	
	
	
	
	
	
	
	
}
