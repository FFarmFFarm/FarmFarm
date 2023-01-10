package edu.kh.farmfarm.find.controller;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.farmfarm.find.service.FindService;
import edu.kh.farmfarm.member.model.VO.Member;
import net.nurigo.java_sdk.exceptions.CoolsmsException;

@Controller
public class FindController {

	@Autowired
	private FindService service;
	
	/** 
	 * 아이디 찾기 페이지 이동
	 * @return
	 */
	@GetMapping("/findId")
	public String findId() {
		
		return "/member/findId";
	}
	
	/** 
	 * 비밀번호 찾기 페이지 이동
	 * @return
	 */
	@GetMapping("/findPw")
	public String findPw() {
		
		return "/member/findPw";
	}
	
	/** 
	 * 아이디 찾기
	 * @return
	 */
	@PostMapping("/findId")
	public String findId(Member inputMember, Model model,
			@RequestParam (value="select", required = false) int select) {
		inputMember.setAuthority(select);
		
		Member member = service.findId(inputMember);
		
		String path = null;
		
		String signUpDate = null;
		String memberId = null;
		if(member != null) {
			memberId = member.getMemberId();
			signUpDate = member.getSignUpDate();
			model.addAttribute("memberId", memberId);
			model.addAttribute("signUpDate", signUpDate);
			
			path = "/member/findIdSuccess";
			
		} else {
			path = "/member/findIdFail";
		}
		return path;
	}
	
	/** 
	 * 비밀번호 찾기  
	 * @return
	 */
	@PostMapping("/findPw")
	public String findPw(Member inputMember, Model model,
			HttpSession session) {
		Member member = service.findPw(inputMember);
		String path = null;
		if(member != null) {
			path = "/member/findPwSuccess";
			session.setAttribute("member", member);
			
		} else {
			path = "/member/findPwFail";
		}
		return path;
	}
	
	/** 
	 * 비밀번호 변경   
	 * @return
	 */
	@PostMapping("/findPwSuccess")
	public String changePw(
			Model model,
			@RequestParam Map<String, Object> paramMap,
			RedirectAttributes ra,
			HttpSession session
			) {
		Member member = (Member)session.getAttribute("member");
		int memberNo = member.getMemberNo();
		paramMap.put("memberNo", memberNo);
		
		int result = service.changePw(paramMap);
		
		String message = null;
		
		if(result>0) {
			
		}else {
			message = "비밀번호 변경에 실패했습니다.";
		}
		ra.addFlashAttribute("message", message);
		
		return "member/login";
	}
}
