package edu.kh.farmfarm.common;

import lombok.Getter;
import lombok.Setter;

// 검색에 사용되는 객체입니다.
@Getter
@Setter
public class SearchItem {
	
	private String keyword; // 검색어
	private int category; // 선택한 카테고리
	
}
