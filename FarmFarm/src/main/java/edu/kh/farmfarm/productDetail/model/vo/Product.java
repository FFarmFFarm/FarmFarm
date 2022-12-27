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
	private String productPrice;
	private String productImg;
	private String productDelFl;
	private String categoryName;
	private String wishDate;
	private int categoryNo;
	private int stock;
	private int productAmount;
	private int memberNo;
	private int wishCheck;
	private String soldoutFl;
	private String sortFl;
	private int reviewCheck;
	
	private List<ProductImg> imgList;
	
	private List<ReviewImg> reviewImgAll;
	
	// 썸네일 이미지
	private String thumbnailImg;
	// 판매량
	private String rates;
	
	
	
}
