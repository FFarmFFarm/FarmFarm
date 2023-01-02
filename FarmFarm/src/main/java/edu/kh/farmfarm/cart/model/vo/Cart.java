package edu.kh.farmfarm.cart.model.vo;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Cart {
	private int memberNo;
	private int productNo;
	private int productAmount;
	private String productPrice;
	private String productTotalPrice;
	private String productName;
	private String productImg;
	private int stock;
	
	private List<Cart> cartList;
}
