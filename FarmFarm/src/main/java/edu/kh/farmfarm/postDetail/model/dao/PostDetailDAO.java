package edu.kh.farmfarm.postDetail.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.postDetail.model.vo.Post;

@Repository
public class PostDetailDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	public Post selectPost(int postNo) {
		return sqlSession.selectOne("postDetailMapper.selectPost", postNo);
	}

}
