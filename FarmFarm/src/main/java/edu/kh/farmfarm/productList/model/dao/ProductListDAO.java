package edu.kh.farmfarm.productList.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ProductListDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	
}
