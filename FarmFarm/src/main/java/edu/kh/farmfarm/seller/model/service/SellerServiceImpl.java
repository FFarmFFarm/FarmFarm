package edu.kh.farmfarm.seller.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.seller.model.dao.SellerDAO;

@Service
public class SellerServiceImpl implements SellerService{

	@Autowired
	private SellerDAO dao;
	
}
