package edu.kh.farmfarm.productDetail.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.productDetail.model.dao.ProductDetailDAO;

@Service
public class ProductDetailServiceImpl implements ProductDetailService{
	
	@Autowired
	private ProductDetailDAO dao;

}
