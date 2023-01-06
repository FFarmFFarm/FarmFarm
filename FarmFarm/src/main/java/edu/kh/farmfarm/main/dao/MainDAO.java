package edu.kh.farmfarm.main.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.postDetail.model.vo.Post;
import edu.kh.farmfarm.productDetail.model.vo.Product;

@Repository
public class MainDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;
	
	public List<Post> getPostListAll() {
		return sqlSession.selectList("postListMapper.getPostListAll");
	}

	public List<Product> getProductListAll() {
		return sqlSession.selectList("productListMapper.getProductListAll");
	}

}
