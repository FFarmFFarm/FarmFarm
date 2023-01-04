package edu.kh.farmfarm.api.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
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

import com.google.gson.Gson;

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
	public String foodList() throws IOException, Exception {
		StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/1390802/AgriFood/FdFoodCkryImage/getKoreanFoodFdFoodCkryImageList");
		urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=7KB%2B3qxnM6IslhoJLACIPUOC%2BwMDKZ3fsbUPRKAr3s82xRrm9Xk33uq8X1JxKl9xyFIeraHodKrkozZU0kxjQg%3D%3D");
		urlBuilder.append("&" + URLEncoder.encode("service_Type","UTF-8") + "=" + URLEncoder.encode("json","UTF-8"));
		urlBuilder.append("&" + URLEncoder.encode("Page_No","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8"));
		urlBuilder.append("&" + URLEncoder.encode("Page_Size","UTF-8") + "=" + URLEncoder.encode("20", "UTF-8"));
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
		System.out.println(line);
		JSONParser jsonParser = new JSONParser();
		JSONObject jsonObject = (JSONObject)jsonParser.parse(sb.toString());
		System.out.println(jsonObject.toString());
		JSONObject response = (JSONObject)jsonObject.get("response");
		System.out.println(response.toString());
		
		JSONArray list = (JSONArray)response.get("list");
		System.out.println(list.toString());
		
		Map<String, Object> map = new HashMap<String, Object>();
		map = new Gson().fromJson(list.toString(), map.getClass());
		
		
		
		
		rd.close();
		conn.disconnect();
//		System.out.println(sb.toString());
		
		
		return null;
	}

//	@Override
//	public String foodList() {
////	headers.setContentType();
//		
//		JSONObject body = new JSONObject();
//		body.put("serviceKey", "7KB%2B3qxnM6IslhoJLACIPUOC%2BwMDKZ3fsbUPRKAr3s82xRrm9Xk33uq8X1JxKl9xyFIeraHodKrkozZU0kxjQg%3D%3D");
//		body.put("service_Type", "json");
//		body.put("Page_No", "1");
//		body.put("Page_Size", "20");
//		
//		
//		try {
//			HttpEntity<JSONObject> entity = new HttpEntity<>(body , headers);
//			APIVO apiVo = restTemplate.postForObject("http://apis.data.go.kr/1390802/AgriFood/FdFoodCkryImage/getKoreanFoodFdFoodCkryImageList", entity, APIVO.class);
//			// JSON 타입 
//			System.out.println(apiVo.toString());
//		} catch (Exception e) {
//			e.printStackTrace();
//			System.out.println("getTokenError");
//		} finally {
//			headers.clear();
//			body.clear();
//		}
//		
//		return null;
//	}
	
	
	
	
}
