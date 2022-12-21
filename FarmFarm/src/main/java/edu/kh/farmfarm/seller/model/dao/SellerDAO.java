package edu.kh.farmfarm.seller.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class SellerDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;
	
}
