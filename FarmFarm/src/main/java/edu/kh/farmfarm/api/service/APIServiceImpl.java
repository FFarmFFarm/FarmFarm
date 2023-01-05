package edu.kh.farmfarm.api.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import edu.kh.farmfarm.api.vo.APIVO;
import edu.kh.farmfarm.order.model.dao.OrderDAO;
import edu.kh.farmfarm.order.model.vo.ImpToken;
import netscape.javascript.JSObject;

@Service
public class APIServiceImpl implements APIService {

	@Autowired
	private OrderDAO dao;
	
	private HttpHeaders headers = new HttpHeaders();
	
	private RestTemplate restTemplate = new RestTemplate();

	@Override
	public List<APIVO> foodList(int cp) throws IOException, Exception {
		StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/1390802/AgriFood/FdFoodCkryImage/getKoreanFoodFdFoodCkryImageList");
		urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=7KB%2B3qxnM6IslhoJLACIPUOC%2BwMDKZ3fsbUPRKAr3s82xRrm9Xk33uq8X1JxKl9xyFIeraHodKrkozZU0kxjQg%3D%3D");
		urlBuilder.append("&" + URLEncoder.encode("service_Type","UTF-8") + "=" + URLEncoder.encode("json","UTF-8"));
		urlBuilder.append("&" + URLEncoder.encode("Page_No","UTF-8") + "=" + URLEncoder.encode(toString().valueOf(cp), "UTF-8"));
		urlBuilder.append("&" + URLEncoder.encode("Page_Size","UTF-8") + "=" + URLEncoder.encode("10", "UTF-8"));
//		urlBuilder.append("&" + URLEncoder.encode("food_Name","UTF-8") + "=" + URLEncoder.encode("밥", "UTF-8"));
//		urlBuilder.append("&" + URLEncoder.encode("ckry_Name","UTF-8") + "=" + URLEncoder.encode("조리", "UTF-8"));
		
		URL url = new URL(urlBuilder.toString());
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setRequestMethod("GET");
		conn.setRequestProperty("Content-type", "application/json");
		System.out.println("Response code: " + conn.getResponseCode());
		
		BufferedReader rd;
		
		if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
			rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
		} else {
			rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
		}
		
		StringBuilder sb = new StringBuilder();
		String line;
		
		while((line = rd.readLine()) != null) {
			sb.append(line);
		}
		
//		String result = rd.readLine();
//		System.out.println(line);
		JSONParser jsonParser = new JSONParser();
		JSONObject jsonObject = (JSONObject)jsonParser.parse(sb.toString());
//		System.out.println(jsonObject.toString());
		JSONObject response = (JSONObject)jsonObject.get("response");
//		System.out.println(response.toString());
		
		JSONArray list = (JSONArray)response.get("list");
//		System.out.println(list.toString());
		
		System.out.println(((JSONObject)list.get(0)).get("no"));
		JSONArray objectList = new JSONArray();
		JSONObject object = new JSONObject();
		
		List<APIVO> apiList = new ArrayList<APIVO>();
		
		JSONObject object1 = new JSONObject();
		for(int y=0; y<response.size(); y++) {
			JSONObject obj = (JSONObject)list.get(y);
			
			System.out.println(obj.get("page_No"));
			object1.put("page_No", obj.get("page_No"));
			objectList.add(object1);
		}
		
		for(int i=0 ; i<list.size() ; i++) {
			JSONObject obj = (JSONObject)list.get(i);
			
			object1.put("upper_Fd_Grupp_Nm", obj.get("upper_Fd_Grupp_Nm"));
			object1.put("fd_Nm", obj.get("fd_Nm"));
			object1.put("ckry_Sumry_Info", obj.get("ckry_Sumry_Info"));
			
			objectList.add(object1);
			
			System.out.println(obj.get("upper_Fd_Grupp_Nm"));
			System.out.println(obj.get("fd_Nm"));
			System.out.println(obj.get("ckry_Sumry_Info"));
			
			
			JSONArray foodList = (JSONArray)obj.get("food_List");
			for(int x=0 ; x<foodList.size() ; x++) {
				JSONObject foodObj = (JSONObject)foodList.get(x);
				
				object1.put("allrgy_Info", obj.get("allrgy_Info"));
				object1.put("food_Image_Address", obj.get("food_Image_Address"));
				
				objectList.add(object1);
				
				System.out.println(foodObj.get("allrgy_Info"));
				System.out.println(foodObj.get("food_Image_Address"));
			}
			
			JSONArray ckryList = (JSONArray)obj.get("ckry_List");
			for(int x=0 ; x<ckryList.size() ; x++) {
				JSONObject ckry = (JSONObject)ckryList.get(x);
				
				object1.put("ckry_Info", obj.get("ckry_Info"));
				object1.put("ckry_Image_Address", obj.get("ckry_Image_Address"));
				
				objectList.add(object1);
				
				ObjectMapper objectMapper = new ObjectMapper();
				APIVO api = objectMapper.readValue(object1.toString(), APIVO.class);
				
				apiList.add(api);
				
				System.out.println(ckry.get("ckry_Info"));
				System.out.println(ckry.get("ckry_Image_Address"));
			}
			
			System.out.println("=========================");
		}
		
		rd.close();
		conn.disconnect();
//		System.out.println(sb.toString());
		
		
		
		return apiList;
	}


	
	
	
	
}
