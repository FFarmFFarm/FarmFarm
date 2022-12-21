package edu.kh.farmfarm.board.model.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BoardImg {
	
	private int boardImgNo;
	private int boardNo;
	private String boardImgAddress;
	private int boardImgOrder;

}
