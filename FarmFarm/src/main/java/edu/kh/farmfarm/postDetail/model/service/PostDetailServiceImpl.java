package edu.kh.farmfarm.postDetail.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.postDetail.model.dao.PostDetailDAO;
import edu.kh.farmfarm.postDetail.model.vo.Post;

@Service
public class PostDetailServiceImpl implements PostDetailService{
	
	@Autowired
	private PostDetailDAO dao;

	/** 판매글 상세 조회
	 *
	 */
	@Override
	public Post selectPost(int postNo) {
		return dao.selectPost(postNo);
	}
	
	/** 판매글 이미지 목록 조회
	 *
	 */
	@Override
	public List<String> selectPostImageList() {
		return dao.selectPostImageList();
	}
	
	/** 판매글 조회수 증가
	 *
	 */
	@Override
	public int updateViewCount(int postNo) {
		return dao.updateViewCount(postNo);
	}
}
