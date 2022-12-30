package edu.kh.farmfarm.cart.model.vo;

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
}
