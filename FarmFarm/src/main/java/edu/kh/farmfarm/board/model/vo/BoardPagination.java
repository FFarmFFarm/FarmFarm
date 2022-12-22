package edu.kh.farmfarm.board.model.vo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class BoardPagination {
	
	private int currentPage; // 현재 페이지 번호
	private int listCount; // 전체 게시글 수
	
	private int limit = 10; // 한 페이지에 보여질 게시글 수
	private int pageSize = 10; // 보여질 페이지 번호 개수
	
	private int maxPage; // 맨 마지막 페이지 번호
	private int startPage; // 보여지는 맨 앞 페이지 번호
	private int endPage; // 보여지는 맨 뒤 페이지 번호
	
	private int prevPage; // 이젠 페이지의 페이지 번호 맨 끝
	private int nextPage; // 다음 페이지의 페이지 번호 맨 앞
	
	
	public BoardPagination(int listCount, int currentPage) {
		this.listCount = listCount;
		this.currentPage = currentPage;
		
//		makeBoardPagination();
		
	}

}
