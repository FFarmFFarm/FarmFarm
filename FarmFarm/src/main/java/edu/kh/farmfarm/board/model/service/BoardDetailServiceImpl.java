package edu.kh.farmfarm.board.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.board.model.dao.BoardDetailDAO;

@Service
public class BoardDetailServiceImpl implements BoardDetailService{
	
	@Autowired
	private BoardDetailDAO dao;

}
