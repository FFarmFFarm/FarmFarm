package edu.kh.farmfarm.productDetail.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ProductDetailDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

}
