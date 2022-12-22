package edu.kh.farmfarm.board.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.board.model.dao.BoardListDAO;
import edu.kh.farmfarm.board.model.vo.Board;
import edu.kh.farmfarm.common.Pagination;

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
		
		// 와글와글 게시판 수 조회
		int listCount = dao.getListCount(boardTypeNo);
		
		Pagination pagination = new Pagination(listCount, cp);
		
		List<Board> boardList = dao.seleteBoardList(pagination, boardTypeNo);
		
		Map<String, Object> boardtMap = new HashMap<String, Object>();
		boardtMap.put("boardList", boardList);
		boardtMap.put("pagination", pagination);
		
		return boardtMap;
	}


}
