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
	private String productContent;
	private String productMessage;
	private String regDate;
	private int productPrice;
	private String productDelFl;
	private int memberNo;
	private int categoryNo;
	private int stock;
	
	private List<ProductImg> imgList;
	
	

}
