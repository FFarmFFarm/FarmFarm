package edu.kh.farmfarm.common;

import lombok.Getter;
import lombok.Setter;

// 상품 목록 출력(productList, postList)에 사용되는 객체입니다.
@Getter
@Setter
public class SearchItem {
	
	private String keyword; 	// 검색어
	private int category; 		// 선택한 카테고리
	private String sort; 		// 정렬 옵션
}
