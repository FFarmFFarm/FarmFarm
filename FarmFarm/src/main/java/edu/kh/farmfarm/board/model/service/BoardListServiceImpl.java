package edu.kh.farmfarm.board.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.board.model.dao.BoardListDAO;
import edu.kh.farmfarm.board.model.vo.Board;

@Service
public class BoardListServiceImpl implements  BoardListService{
	
	@Autowired
	private BoardListDAO dao;

	// 와글와글 네브 조회
	@Override
	public List<Map<String, Object>> boardTypeList() {
		return dao.boardTypeList();
	}

	// 와글와글 게시판 목록
	@Override
	public Map<String, Object> selectBoardList(int boardTypeNo, int cp) {
		// TODO Auto-generated method stub
		return null;
	}


}
