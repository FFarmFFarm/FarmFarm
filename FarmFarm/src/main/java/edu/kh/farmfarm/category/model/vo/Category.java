package edu.kh.farmfarm.category.model.vo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class Category {

	// 상위 카테고리 : CATEGORY
	private int categoryNo;
	private String categoryName;
	
}
