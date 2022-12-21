package edu.kh.farmfarm.board.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import edu.kh.farmfarm.board.model.vo.Board;

public interface BoardWriteService {
	
	List<Map<String, Object>> boardTypeList();

	// 와글와글 쓰기
	int boardWrite(Board board, List<MultipartFile> imgList, String webPath);

}
