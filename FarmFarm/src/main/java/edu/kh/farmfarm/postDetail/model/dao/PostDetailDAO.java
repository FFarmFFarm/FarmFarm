package edu.kh.farmfarm.postDetail.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.postDetail.model.vo.Post;

@Repository
public class PostDetailDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	/** 판매글 상세 조회
	 * @param postNo
	 * @return
	 */
	public Post selectPost(int postNo) {
		return sqlSession.selectOne("postDetailMapper.selectPost", postNo);
	}

	/** 판매글 이미지 목록 조회
	 * @return
	 */
	public List<String> selectPostImageList() {
		return sqlSession.selectList("postDetailMapper.selectPostImageList");
	}

	/** 판매글 조회수 증가
	 * @param postNo
	 * @return
	 */
	public int updateViewCount(int postNo) {
		return sqlSession.update("postDetailMapper.updateViewCount", postNo);
	}

}
