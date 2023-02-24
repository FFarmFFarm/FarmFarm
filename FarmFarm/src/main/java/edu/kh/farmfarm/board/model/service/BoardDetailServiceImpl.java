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

import edu.kh.farmfarm.board.model.dao.BoardDetailDAO;
import edu.kh.farmfarm.board.model.exception.BoardUpdateException;
import edu.kh.farmfarm.board.model.vo.Board;
import edu.kh.farmfarm.board.model.vo.BoardImg;
import edu.kh.farmfarm.common.Util;

@Service
public class BoardDetailServiceImpl implements BoardDetailService{
	
	@Autowired
	private BoardDetailDAO dao;

	
	// 게시글 상세보기
	@Override
	public Board boardDetail(int boardNo) {
		return dao.boardDetail(boardNo);
	}


	// 로그인 멤버가 좋아요 눌렀는지 확인
	@Override
	public int checkLike(Map<String, Object> likeMap) {
		return dao.checkLike(likeMap);
	}
	
	
	
	// 게시글 좋아요 취소
	@Override
	public int boardLikeDelete(Map<String, Object> likeMap) {
		return dao.boardLikeDelete(likeMap);
	}


	// 게시글 좋아요
	@Override
	public int boardLikeInsert(Map<String, Object> likeMap) {
		return dao.boardLikeInsert(likeMap);
	}


	// 조회수 증가
	@Override
	public int updateBoardView(int boardNo) {
		return dao.updateBoardView(boardNo);
	}


	// 게시글 삭제
	@Override
	public int boardDelete(int boardNo) {
		return dao.boardDelete(boardNo);
	}


	// 게시글 수정
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int updateBoard(Board board, String deleteImgList, List<MultipartFile> imgList, String webPath,
			String folderPath) throws IOException {
		
		// 게시글 XSS 처리 해줍시다
		board.setBoardTitle(Util.XSSHandling(board.getBoardTitle()));
		board.setBoardContent(Util.XSSHandling(board.getBoardContent()));
		board.setBoardContent(Util.newLineHandling(board.getBoardContent()));
		
		int result = dao.updateBoard(board);
		
		// 게시글이 정상적으로 수정 되었습니다.
		if(result>0) {
			
			// 삭제된 이미지있음.
			if(!deleteImgList.equals("")) {
				
				String condition = "WHERE BOARD_NO = " + board.getBoardNo() 
						+ "AND BOARD_IMG_ORDER IN(" + deleteImgList +")";
				
				result = dao.updateDeleteImg(condition);
				
				// 이미지 삭제 실패
				if(result == 0) {
					throw new BoardUpdateException("이미지 삭제 실패");
				}
			} // if 끝
			
			// 새로운 이미지 삽입
			List<BoardImg> boardImgList = new ArrayList<BoardImg>();
			List<String> renameList = new ArrayList<String>();
			
			for(int i=0; i<imgList.size(); i++) {
				
				if(imgList.get(i).getSize() > 0) { // 이미지가 있으면
					
					BoardImg img = new BoardImg();
					
					String rename = Util.fileRename(imgList.get(i).getOriginalFilename());
					renameList.add(rename);
					
					img.setBoardImgAddress(webPath+rename);
					img.setBoardNo(board.getBoardNo());
					img.setBoardImgOrder(i);
					
					boardImgList.add(img);
					
					result  = dao.updateBoardImg(img);
					
					if(result == 0) {
						result = dao.boardImgInsert(img);
						
						if(result == 0) {
							throw new BoardUpdateException("이미지 수정/삽입 예외 발생!");
						}
					}
				} // if 끝
			} // for 끝
			
			// 파일을 저장해볼까요?
			if(!boardImgList.isEmpty()) {
				
				for(int i=0; i<boardImgList.size(); i++) {
					int index = boardImgList.get(i).getBoardImgOrder();
					imgList.get(index).transferTo(new File(folderPath + renameList.get(i)));
				}
			}
		}
		
		
		return result;
	}



}
