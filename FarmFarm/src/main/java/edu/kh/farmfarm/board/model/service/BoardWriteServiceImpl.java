package edu.kh.farmfarm.board.model.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import edu.kh.farmfarm.board.model.dao.BoardWriteDAO;
import edu.kh.farmfarm.board.model.vo.Board;
import edu.kh.farmfarm.board.model.vo.BoardImg;
import edu.kh.farmfarm.common.Util;

@Service
public class BoardWriteServiceImpl implements BoardWriteService {

	@Autowired
	private BoardWriteDAO dao;

	@Override
	public List<Map<String, Object>> boardTypeList() {
		return dao.boardTypeList();
	}

	
	// 와글와글 글쓰기
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int boardWrite(Board board, List<MultipartFile> imgList, String webPath) {
		
		// 개행문자 처리
		board.setBoardTitle(Util.XSSHandling(board.getBoardTitle()));
		board.setBoardContent(Util.XSSHandling(board.getBoardContent()));
		board.setBoardContent(Util.newLineHandling(board.getBoardContent()));
		
		// 글쓰기 결과
		int boardNo = dao.boardWrtie(board);
		
		if(boardNo>0) {

			List<BoardImg> boardImgList = new ArrayList<BoardImg>();
			
			for(int i=0; i<imgList.size(); i++) {
				if(imgList.get(i).getSize() > 0) {
					BoardImg img = new BoardImg();
					
				}
			}
			
		}
		
		return 0;
	}
	
	
}
