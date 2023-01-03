package edu.kh.farmfarm.order.model.vo;

import org.json.simple.JSONObject;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class BuyerInfo {
	private String code;
	private String message;
	private JSONObject response = new JSONObject();

}
