package edu.kh.farmfarm.board.model.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Comment {
	
	private int commentNo; // 댓글 번호
	private String commentContent; // 댓글 내용
	private String commentDate; // 댓글 작성일
	private int commentParent; // 부모 댓글 번호
	private String commentDelFlg; // 댓글 삭제 여부
	private int memberNo; // 회원 번호
	private int boardNo; // 게시글 번호
	
	private String memberNickname; // 회원 닉네임

}
