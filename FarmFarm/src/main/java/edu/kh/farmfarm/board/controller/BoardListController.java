package edu.kh.farmfarm.board.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import edu.kh.farmfarm.board.model.service.BoardListService;

@Controller
public class BoardListController {
	
	@Autowired
	private BoardListService service;

}
