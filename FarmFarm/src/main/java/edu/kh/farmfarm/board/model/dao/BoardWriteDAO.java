package edu.kh.farmfarm.board.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class BoardWriteDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

}
