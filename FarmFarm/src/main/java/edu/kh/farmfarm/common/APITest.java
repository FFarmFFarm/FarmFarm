package edu.kh.farmfarm.common;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import com.google.gson.Gson;

public class APITest {
	public static void main(String[] args) throws Exception{
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
//		System.out.println(line);
		JSONParser jsonParser = new JSONParser();
		JSONObject jsonObject = (JSONObject)jsonParser.parse(sb.toString());
//		System.out.println(jsonObject.toString());
		JSONObject response = (JSONObject)jsonObject.get("response");
//		System.out.println(response.toString());
		
		JSONArray list = (JSONArray)response.get("list");
//		System.out.println(list.toString());
		
		System.out.println(((JSONObject)list.get(0)).get("no"));
		for(int i=0 ; i<list.size() ; i++) {
			JSONObject obj = (JSONObject)list.get(i);
			
			System.out.println(obj.get("upper_Fd_Grupp_Nm"));
			System.out.println(obj.get("fd_Nm"));
			System.out.println(obj.get("ckry_Sumry_Info"));
			
			JSONArray foodList = (JSONArray)obj.get("food_List");
			for(int x=0 ; x<foodList.size() ; x++) {
				JSONObject foodObj = (JSONObject)foodList.get(x);
				
				System.out.println(foodObj.get("allrgy_Info"));
				System.out.println(foodObj.get("food_Image_Address"));
			}
			
			JSONArray ckryList = (JSONArray)obj.get("ckry_List");
			for(int x=0 ; x<ckryList.size() ; x++) {
				JSONObject ckry = (JSONObject)ckryList.get(x);
				
				System.out.println(ckry.get("ckry_Info"));
				System.out.println(ckry.get("ckry_Image_Address"));
			}
			
			System.out.println("=========================");
		}
		
		rd.close();
		conn.disconnect();
	}
}
