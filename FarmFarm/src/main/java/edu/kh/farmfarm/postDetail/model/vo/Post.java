package edu.kh.farmfarm.postDetail.model.vo;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class Post {
	
	private int postNo;
	private String postTitle;
	private String postContent;
	private int postView;
	private String postDate;
	private String unitPrice;
	private String openDate;
	private int postSoldoutFl;
	private String postDelFl;
	private int memberNo;
	private String memberNickname;
	private int categoryNo;
	private String categoryName;
	private String postImgAddress;
	
	private List<PostImg> imgList;
	
	private String thumbnailImg;
}
