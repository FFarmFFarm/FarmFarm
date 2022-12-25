package edu.kh.farmfarm.board.model.vo;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Board {
	
	private int boardNo; // 게시글 번호
	private String boardTitle; // 게시글 제목
	private String boardContent; // 게시글 내용
	private String boardDate; // 게시글 작성일
	private String boardUpdateDate; // 게시글 수정일
	private int boardView; // 게시글 조회수
	private String boardDelFlag; // 게시글 삭제여부
	private int memberNo; // 회원번호
	private int boardTypeNo; // 게시판 번호
	
	private String boardName; // 게시판 이름 (1:물물교환 2:팁 3:질문)
	
	private String memberNickname; // 회원 닉네임
	
	private int boardNo2; // 게시글 좋아요 번호
	private int memberNo2; // 게시글 좋아요 누른 회원 번호
	
	// 이미지 목록을 나타내는 리스트
//	private List<BoardImg> imgList;
	private List<BoardImg> imgList;
	
	private int commentCount;
	private int likeCount;
	
	private String thumbnail;

	private String profileImg;
}
