package edu.kh.farmfarm.productDetail.model.vo;

import lombok.Getter;
import lombok.ToString;
import lombok.Setter;

@Getter
@Setter
@ToString
public class Review {
	private int reviewNo;
	private String reviewContent;
	private String reviewDelFl;
	private int memberNo;
	private int productNo;
	

}
