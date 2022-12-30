package edu.kh.farmfarm.productDetail.model.vo;

import java.util.List;

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
	private int productNo;
	private String createDate;
	private String productName;
	private String productThumbnail;
	
	private int likeCheck;
	private int likeCount;
	private int orderNo;
	
	private String memberNickname;
	private String profileImg;
	private int memberNo;
	
	private List<ReviewImg> imgList;
}
