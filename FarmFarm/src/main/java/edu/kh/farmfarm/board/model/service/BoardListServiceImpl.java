package edu.kh.farmfarm.board.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.board.model.dao.BoardListDAO;

@Service
public class BoardListServiceImpl implements  BoardListService{
	
	@Autowired
	private BoardListDAO dao;

	@Override
	public List<Map<String, Object>> boardTypeList() {
		return dao.boardTypeList();
	}

}
