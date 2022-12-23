package edu.kh.farmfarm.postDetail.model.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.postDetail.model.dao.PostDetailDAO;
import edu.kh.farmfarm.postDetail.model.vo.Post;

@Service
public class PostDetailService {

	@Autowired
	private PostDetailDAO dao;

	public Post selectPost(int postNo) {
		return dao.selectPost(postNo);
	}

}
