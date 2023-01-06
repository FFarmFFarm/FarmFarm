package edu.kh.farmfarm.main.service;

import java.util.List;
import java.util.Map;

import edu.kh.farmfarm.postDetail.model.vo.Post;
import edu.kh.farmfarm.productDetail.model.vo.Product;

public interface MainService {

	List<Post> getPostListAll();

	List<Product> getProductListAll();

}
