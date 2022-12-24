package edu.kh.farmfarm.chat.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ChatDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;
}
