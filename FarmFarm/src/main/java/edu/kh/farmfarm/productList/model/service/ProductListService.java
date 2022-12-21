package edu.kh.farmfarm.productList.model.service;

import java.util.List;

import edu.kh.farmfarm.category.model.vo.Category;
import edu.kh.farmfarm.productDetail.model.vo.Product;

public interface ProductListService {

	List<Category> getCategoryList();

	List<Product> getProductListAll();
	
	
}
