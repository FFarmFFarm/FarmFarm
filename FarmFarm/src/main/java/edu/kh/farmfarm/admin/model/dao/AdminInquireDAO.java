package edu.kh.farmfarm.admin.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.inquire.model.vo.InquireRoom;
import edu.kh.farmfarm.inquire.model.vo.Message;

@Repository
public class AdminInquireDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;

	public List<InquireRoom> selectInquireList() {
		return sqlSession.selectList("inquireMapper.selectInquireList");
	}

	public List<Message> selectMessageList(int inquireNo) {
		return sqlSession.selectList("inquireMapper.selectInquire", inquireNo);
	}
	
}
