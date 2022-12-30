package edu.kh.farmfarm.cart.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.cart.model.dao.CartDAO;

@Service
public class CartServiceImpl implements CartService{

	@Autowired
	private CartDAO dao;
	
}
