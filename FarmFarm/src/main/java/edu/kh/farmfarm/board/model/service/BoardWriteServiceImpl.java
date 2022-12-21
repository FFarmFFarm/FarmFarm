package edu.kh.farmfarm.board.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import edu.kh.farmfarm.board.model.dao.BoardWriteDAO;
import edu.kh.farmfarm.board.model.vo.Board;

@Service
public class BoardWriteServiceImpl implements BoardWriteService {

	@Autowired
	private BoardWriteDAO dao;

	@Override
	public List<Map<String, Object>> boardTypeList() {
		return dao.boardTypeList();
	}

	
	// 와글와글 글쓰기
	@Override
	public int boardWrite(Board board, List<MultipartFile> imgList) {
		return 0;
	}
	
	
}
