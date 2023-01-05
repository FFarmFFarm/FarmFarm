package edu.kh.farmfarm.postDetail.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.postDetail.model.dao.PostDetailDAO;
import edu.kh.farmfarm.postDetail.model.vo.Post;

public interface PostDetailService {


	public Post selectPost(int postNo);

	public List<String> selectPostImageList();
}
