package edu.kh.farmfarm.board.model.exception;

public class BoardUpdateException extends RuntimeException {
	
	public BoardUpdateException() {
		super("게시글 수정 중 예외 발생");
	}
	
	public BoardUpdateException(String message) {
		super(message);
	}

}
