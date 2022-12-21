package edu.kh.farmfarm.board.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.board.model.dao.BoardListDAO;

@Service
public class BoardListServiceImpl implements  BoardListService{
	
	@Autowired
	private BoardListDAO dao;

}
