package edu.kh.farmfarm.board.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.board.model.dao.BoardListDAO;
import edu.kh.farmfarm.board.model.vo.Board;
import edu.kh.farmfarm.common.Pagination;
import edu.kh.farmfarm.member.model.VO.Member;

@Service
public class BoardListServiceImpl implements  BoardListService{
	
	@Autowired
	private BoardListDAO dao;

	// 와글와글 네브 조회
	@Override
	public List<Map<String, Object>> boardTypeList() {
		return dao.boardTypeList();
	}

	
	// 와글와글 게시판 목록
	@Override
	public Map<String, Object> selectBoardList(int boardTypeNo, int cp) {
		
		// 와글와글 게시판 수 조회
		int listCount = dao.getListCount(boardTypeNo);
		
		// 페이지네이션 객체 생성
		Pagination pagination = new Pagination(listCount, cp);
		
		// 게시판 리스트 가져오기
		List<Board> boardList = dao.seleteBoardList(pagination, boardTypeNo);
		
		Map<String, Object> boardtMap = new HashMap<String, Object>();
		boardtMap.put("boardList", boardList);
		boardtMap.put("pagination", pagination);
		
		return boardtMap;
	}
	

	@Override
	public Map<String, Object> selectBoardList(Map<String, Object> searchMap, int cp) {
		// 검색 결과에 맞는 게시글 수 조회
				int listCount = dao.getListCount(searchMap);
				
				// 페이지네이션 객체 생성
				Pagination pagination = new Pagination(listCount, cp);
				
				// 검색 조건에 맞는 리스트 가져오기
				List<Board> boardList = dao.selecBoardtList(pagination, searchMap);
				
				Map<String, Object> boardMap = new HashMap<String, Object>();
				boardMap.put("boardList", boardList);
				boardMap.put("pagination", pagination);
				
				return boardMap;
	}




	// 와글 와글 게시판 검색 + 목록 조회
	@Override
	public Map<String, Object> selecBoardtListSearch(Map<String, Object> searchMap, int cp) {
		
		// 검색 결과에 맞는 게시글 수 조회
		int listCount = dao.getListCount(searchMap);
		
		// 페이지네이션 객체 생성
		Pagination pagination = new Pagination(listCount, cp);
		
//		if(searchMap.get(boardSelectNVL) != null) {
//			
//			
//			
//		}else {
			
			// 검색 조건에 맞는 리스트 가져오기
			List<Board> boardList = dao.selecBoardtListSearch(pagination, searchMap);
//		}
		
		
		Map<String, Object> boardMap = new HashMap<String, Object>();
		boardMap.put("boardList", boardList);
		boardMap.put("pagination", pagination);
		
		return boardMap;
	}


	// 프로필 클릭시 모달 
	@Override
	public Member selectMember(int memberNo) {
		return dao.selectMember(memberNo);
	}





}
