package edu.kh.farmfarm.common;

// 페이지네이션 VO
public class Pagination {
	// 페이징 처리에 필요한 값?
	
	// 현재 페이지
	private int currentPage;
		
	// 전체 게시글 수
	private int listCount;
	
	// 한 페이지에 보여줄 게시글 수
	private int limit = 10;
	
	// 페이지 번호 개수
	private int pageSize = 10;
	
	// 마지막 페이지 번호
	private int maxPage;
	
	// 화면 내 페이지 번호 첫 번째
	private int startPage;
	
	// 화면 내 페이지 번호 마지막
	private int endPage;
	
	// 이전 페이지의 맨 뒤
	private int prevPage;
	
	// 다음 페이지의 맨 앞
	private int nextPage;
	
	
	
	// --- getter, setter 시작 ---
	public int getCurrentPage() {
		return currentPage;
	}
	
	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}

	public int getListCount() {
		return listCount;
	}

	public void setListCount(int listCount) {
		this.listCount = listCount;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getMaxPage() {
		return maxPage;
	}

	public void setMaxPage(int maxPage) {
		this.maxPage = maxPage;
	}

	public int getStartPage() {
		return startPage;
	}

	public void setStartPage(int startPage) {
		this.startPage = startPage;
	}

	public int getEndPage() {
		return endPage;
	}

	public void setEndPage(int endPage) {
		this.endPage = endPage;
	}

	public int getPrevPage() {
		return prevPage;
	}

	public void setPrevPage(int prevPage) {
		this.prevPage = prevPage;
	}

	public int getNextPage() {
		return nextPage;
	}

	public void setNextPage(int nextPage) {
		this.nextPage = nextPage;
	}
	
	// --- getter, setter 끝 ---
	
	/** 전달받은 전체 아이템 개수, 현재 페이지 정보를 이용해서 페이지 객체를 생성함
	 * @param listCount
	 * @param currentPage
	 */
	public Pagination(int listCount, int currentPage) {
		this.listCount = listCount;
		this.currentPage = currentPage;
		
		makePagination();
	}

	/** 전달받은 전체 아이템 개수, 현재 페이지 정보를 이용해서 페이지 객체를 생성함
	 *  + 한 페이지에 출력할 목록 개수 조절
	 * @param listCount
	 * @param currentPage
	 * @param limit
	 */
	public Pagination(int listCount, int currentPage, int limit) {
		this.listCount = listCount;
		this.currentPage = currentPage;
		this.limit = limit;
		
		makePagination();
	}
	
	
	/** 전달받은 전체 아이템 개수, 현재 페이지 정보를 이용해서 페이지 객체를 생성함
	 *  + 한 페이지에 출력할 데이터 목록 개수 조절
	 *  + 페이지 묶음 목록 개수 조절 (<< < 1 2 3 4 5 > >>)
	 * 
	 * @param listCount
	 * @param currentPage
	 * @param limit
	 * @param pageSize
	 */
	public Pagination(int listCount, int currentPage, int limit, int pageSize) {
		this.listCount = listCount;
		this.currentPage = currentPage;
		this.limit = limit;
		this.pageSize = pageSize;
	  
		makePagination();
	}


	// 페이지 생성자
	private void makePagination() {
		// 1. 마지막 페이지 번호(maxPage)
		// limit = 10, listCount = 105, maxPage = 11
		// listCount / limit = 10.5
		// 반올림 -> 11
		maxPage = (int)Math.ceil((double)listCount / limit);
	
		// 2. 화면 내 시작 페이지 번호(startPage)
		// pageSize = 10
		// currentPage = 2, startPage = 1 endPage = 10
		// currentPage = 20, startPage = 11 endPage = 20
		startPage = (currentPage - 1) / pageSize * pageSize + 1;
		
		// 3. 화면 내 종료 페이지 번호(endPage)
		endPage = startPage + pageSize - 1;
		
		// 3-1. 만약 endPage > maxPage인 경우
		if(endPage > maxPage) {
			endPage = maxPage;
		}
		
		// 4. prevPage 이전 페이지
		if(currentPage <= 10) {
			prevPage = 1;
		} else {
			prevPage = startPage - 1;
		}

		// 5. nextPage 이후 페이지
		if(endPage == maxPage ) {
			nextPage = maxPage;
		} else {
			nextPage = endPage + 1;
		}
	}
}
