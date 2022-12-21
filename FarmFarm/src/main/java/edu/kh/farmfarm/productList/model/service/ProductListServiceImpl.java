package edu.kh.farmfarm.productList.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.category.model.vo.Category;
import edu.kh.farmfarm.productDetail.model.vo.Product;
import edu.kh.farmfarm.productList.model.dao.ProductListDAO;

@Service
public class ProductListServiceImpl implements ProductListService {
	
	@Autowired
	private ProductListDAO dao;

	@Override
	public List<Category> getCategoryList() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Product> getProductListAll() {
		// TODO Auto-generated method stub
		return null;
	}
}
