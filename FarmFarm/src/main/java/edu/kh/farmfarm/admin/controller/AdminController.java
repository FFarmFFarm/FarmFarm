package edu.kh.farmfarm.admin.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;

import edu.kh.farmfarm.admin.model.service.AdminService;
import edu.kh.farmfarm.admin.model.vo.Admin;
import edu.kh.farmfarm.admin.model.vo.Graph;
import edu.kh.farmfarm.common.Util;
import edu.kh.farmfarm.member.model.VO.Member;
import lombok.ToString;

@Controller
@ToString
public class AdminController {
	
	@Autowired
	private AdminService service;


	// 관리자페이지 --------------------------------------------------------
	
	// 대시보드 -----------------------------------------------------------
	// 통계 조회
	@GetMapping("/admin")
	public String dashboard(@SessionAttribute(value="loginMember") Member loginMember, Model model,
							@RequestHeader(value="referer") String referer) {
		
		// 관리자인지 확인
		int result = service.checkAdmin();

		Map<String, Object> statMap = new HashMap<String, Object>();
		
		// 관리자일 때만 && 로그인했을 때
		if(result == 1 && loginMember != null) {

			// 대시보드 통계 조회
			statMap = service.selectStats(); //statMap
		}
		
		model.addAttribute("statMap", statMap);
		
		return "admin/dashboard";
		
	}
	
	
	
	
	// 날짜별 회원가입자 수 + 주문 수 (최근 30일간)
	@GetMapping("/dashboard/signUpGraph")
	@ResponseBody
	public String signUpGraph(@SessionAttribute(value="loginMember") Member loginMember) {
		// 관리자인지 확인
		int result = service.checkAdmin();

		Map<String, Object> graphMap = new HashMap<String, Object>();
		
		// 관리자일 때만 && 로그인했을 때
		if(result == 1 && loginMember != null) {

			// 회원가입자 수, 주문 수 조회
			graphMap = service.selectGraph();
			
		}
		
		return new Gson().toJson(graphMap);
	}

	
	
	
	// 회원 관리 --------------------------------------------------------------------------------
	// 전체 회원 조회 페이지로 이동
	// JSP 
	@GetMapping("/admin/member")
	public String adminMemberPage(@SessionAttribute(value="loginMember") Member loginMember, 
									Model model,
									@RequestParam(value="cp", required=false, defaultValue="1") int cp,
									@RequestParam(value="authFilter", required=false, defaultValue="0") String authFilter,
									@RequestParam(value="statFilter", required=false, defaultValue="0") String statFilter
									) {
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("authFilter", authFilter);
		paramMap.put("statFilter", statFilter);
		
		// 관리자인지 확인 (관리자면 result==1)
		int result = service.checkAdmin();
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		if(result == 1 && loginMember != null) {

			// 전체 회원 정보 조회 + 페이지네이션 + 정렬
			map = service.selectMember(paramMap, cp);
	
		} else {
			System.out.println("관리자만 접근 가능합니다.");
		}
		
		model.addAttribute("map", map);
		
		return "admin/adminMember";
	}
	
	
	
	// 전체 회원 조회 (정렬, 페이지네이션, 검색)
	@GetMapping("/admin/selectMemberList")
	@ResponseBody
	public String selectMember(@SessionAttribute(value="loginMember") Member loginMember, 
								@RequestParam(value="cp", required=false, defaultValue="1") int cp,
								@RequestParam(value="authFilter", required=false, defaultValue="0") String authFilter,
								@RequestParam(value="statFilter", required=false, defaultValue="0") String statFilter,
								@RequestParam(value="keyword", required=false) String keyword) {
		
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("authFilter", authFilter);
		paramMap.put("statFilter", statFilter);
		
		if(keyword != null) {
			paramMap.put("keyword", keyword);
		}
		
		// 관리자인지 확인 (관리자면 result==1)
		int result = service.checkAdmin();
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		if(result == 1 && loginMember != null) {

			// 전체 회원 정보 조회 + 페이지네이션 + 정렬
			map = service.selectMember(paramMap, cp);
	
		} else {
			System.out.println("관리자만 접근 가능합니다.");
		}
		
		
		return new Gson().toJson(map);
	}
	
	
	
	// 회원 상세 조회
	@GetMapping("/admin/selectMemberDetail")
	@ResponseBody
	public String selectMemberDetail(@SessionAttribute(value="loginMember") Member loginMember,
										int hiddenNo) {
		// 관리자인지 확인 (관리자면 result==1)
		int result = service.checkAdmin();
		
		Map<String, Object> map = new HashMap<String, Object>();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
		
		if(result == 1 && loginMember != null) {

			// 전체 회원 정보 조회 + 페이지네이션 + 정렬
			map = service.selectMemberDetail(hiddenNo);
	
		} else {
			System.out.println("관리자만 접근 가능합니다.");
		}
		
		
		return new Gson().toJson(map);
		
	}
	
	
	
	
}
