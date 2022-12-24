package edu.kh.farmfarm.board.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.board.model.dao.BoardDetailDAO;
import edu.kh.farmfarm.board.model.vo.Board;

@Service
public class BoardDetailServiceImpl implements BoardDetailService{
	
	@Autowired
	private BoardDetailDAO dao;

	
	// 게시글 상세보기
	@Override
	public Board boardDetail(int boardNo) {
		return dao.boardDetail(boardNo);
	}

}
