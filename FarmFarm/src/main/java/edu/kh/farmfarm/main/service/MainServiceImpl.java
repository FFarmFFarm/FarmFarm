package edu.kh.farmfarm.main.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.main.dao.MainDAO;
import edu.kh.farmfarm.postDetail.model.vo.Post;
import edu.kh.farmfarm.productDetail.model.vo.Product;

@Service
public class MainServiceImpl implements MainService {

	@Autowired
	private MainDAO dao;

	@Override
	public List<Post> getPostListAll() {
		List<Post> postList = dao.getPostListAll();
		return postList;
	}

	@Override
	public List<Product> getProductListAll() {
		List<Product> productList = dao.getProductListAll();
		return productList;
	}
}
