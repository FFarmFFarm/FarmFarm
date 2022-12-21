package edu.kh.farmfarm.mypage.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.mypage.model.dao.MyPageDAO;
import edu.kh.farmfarm.mypage.model.vo.Comment;
import edu.kh.farmfarm.mypage.model.vo.CommentPagination;

@Service
public class MyPageServiceImpl implements MyPageService {
	
	@Autowired
	private MyPageDAO dao;
	
	@Override
	public Map<String, Object> selectCommentList(int memberNo, int cp) {
		
		
		int commentCount = dao.commentCount(memberNo);
		
		CommentPagination pagination = new CommentPagination(commentCount, cp);
		
		List<Comment> commentList = dao.selectCommentList(memberNo, pagination);
		 
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("pagination", pagination);
		map.put("commentList", commentList);
		
		return map;
	}

}
