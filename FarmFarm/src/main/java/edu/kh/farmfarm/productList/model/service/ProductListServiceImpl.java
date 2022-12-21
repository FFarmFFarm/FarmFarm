package edu.kh.farmfarm.productList.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.productList.model.dao.ProductListDAO;

@Service
public class ProductListServiceImpl implements ProductListService {
	
	@Autowired
	private ProductListDAO dao;
}
