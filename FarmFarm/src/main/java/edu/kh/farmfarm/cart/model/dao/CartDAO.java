package edu.kh.farmfarm.cart.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class CartDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;
	
}
