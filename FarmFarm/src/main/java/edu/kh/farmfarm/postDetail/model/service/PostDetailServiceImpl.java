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

	@Override
	public Post selectPost(int postNo) {
		return dao.selectPost(postNo);
	}
	
	@Override
	public List<String> selectPostImageList() {
		return dao.selectPostImageList();
	}
}
