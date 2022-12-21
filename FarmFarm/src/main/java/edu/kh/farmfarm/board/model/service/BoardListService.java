package edu.kh.farmfarm.board.model.service;

import java.util.List;
import java.util.Map;

import edu.kh.farmfarm.board.model.vo.Board;

public interface BoardListService {
	
	// 와글와글 게시판 목록 조회
	List<Map<String, Object>> boardTypeList();

}
