package edu.kh.farmfarm.api.vo;

import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONObject;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class APIVO {

	private List<JSONObject> response = new ArrayList<JSONObject>();
}
