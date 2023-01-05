package edu.kh.farmfarm.api.vo;

import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONObject;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class APIVO {

	private String upper_Fd_Grupp_Nm;
	private String fd_Nm;
	private String ckry_Sumry_Info;
	private String allrgy_Info;
	private String food_Image_Address;
	private String ckry_Info;
	private String ckry_Image_Address;
	
	private List<JSONObject> response = new ArrayList<JSONObject>();
}
