package edu.kh.farmfarm.mypage.model.service;

import java.util.List;
import java.util.Map;

import edu.kh.farmfarm.mypage.model.vo.Comment;

public interface MyPageService {

	Map<String, Object> selectCommentList(int memberNo, int cp);

}
