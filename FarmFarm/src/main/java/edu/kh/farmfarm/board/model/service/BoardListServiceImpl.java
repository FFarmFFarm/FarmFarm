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
	public Map<String, Object> selectBoardList(Map<String, Object> pm, int cp) {
		// 검색 결과에 맞는 게시글 수 조회
		int listCount = dao.getListCount(pm);
		
		// 페이지네이션 객체 생성
		Pagination pagination = new Pagination(listCount, cp);
		
		// 검색 조건에 맞는 리스트 가져오기
		List<Board> boardList = dao.selecBoardtList(pagination, pm);
		
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
		List<Board> boardList = dao.selecBoardtListSearch(pagination, searchMap);
		
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

	/** 게시판 이미지 이름 조회
	 *
	 */
	@Override
	public List<String> selectBoardImageList() {
		return dao.selectBoardImageList();
	}



}
