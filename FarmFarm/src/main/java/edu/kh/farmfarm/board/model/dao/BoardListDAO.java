package edu.kh.farmfarm.board.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class BoardListDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;

	public List<Map<String, Object>> boardTypeList() {
		return sqlSession.selectList("boardMapper.boardTypeList");
	}
}
