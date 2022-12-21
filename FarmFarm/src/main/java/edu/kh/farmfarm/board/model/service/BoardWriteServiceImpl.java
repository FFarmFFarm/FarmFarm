package edu.kh.farmfarm.board.model.service;

import java.io.File;
import java.io.IOException;
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
	public int boardWrite(Board board, List<MultipartFile> imgList, String webPath, String folderPath) throws IOException {
		
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
					String originalFileName = imgList.get(i).getOriginalFilename();
					img.setBoardImgAddress(webPath + originalFileName);
					img.setBoardNo(boardNo);
					img.setBoardImgOrder(i);
					
					boardImgList.add(img);
				}
			}
			
			// 업로드 된 이미지 있을 경우
			if(!boardImgList.isEmpty()) {
				
				int result = dao.insertBoardImgList(boardImgList);
				
				if(result == boardImgList.size()) {
					for(int i=0; i<result; i++) {
						int index = boardImgList.get(i).getBoardImgOrder();
						
						imgList.get(index).transferTo(new File(folderPath));
					}
				}
			}
			
		}else boardNo = 0;
		
		return boardNo;
	}
	
	
}
