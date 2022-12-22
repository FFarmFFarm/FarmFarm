package edu.kh.farmfarm.productDetail.model.vo;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Product {
	
	private int productNo;
	private String productName;
	private String productMessage;
	private String regDate;
	private int productPrice;
	private String productDelFl;
	private String categoryName;
	private int categoryNo;
	private int stock;
	private int productAmount;
	private int memberNo;
	private int wishCheck;
	
	private List<ProductImg> imgList;
	
	private List<ReviewImg> reviewImgAll;
	
	// 썸네일 이미지
	private String thumbnailImg;
	
	
	
}
