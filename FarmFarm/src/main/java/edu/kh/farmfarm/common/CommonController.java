package edu.kh.farmfarm.common;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.google.gson.Gson;

import edu.kh.farmfarm.member.model.VO.Member;

// 일부 jsp에서 공용으로 사용하기 위해 만든 컨트롤러입니다.
@SessionAttributes("loginMember")
@Controller
public class CommonController {
	
	/** 로그인 여부를 확인하는 메서드입니다.
	 *  세션에서 로그인 회원 정보(loginMember)를 찾아서,
	 *  로그인 회원 정보가 없으면(null)이면 -1을,
	 *  있으면 객체 member를 반환합니다.
	 * @param session
	 * @return
	 */
	@PostMapping("/check/myInfo")
	@ResponseBody
	public String checkLogin(HttpSession session) {
		Member member = new Member();

		int memberNo = -1;
		String memberNickname = "";
		String profileImg = "";
		int authority = 0;
		
		if(session.getAttribute("loginMember") != null) {
			memberNo = ((Member)(session.getAttribute("loginMember"))).getMemberNo();
			memberNickname = ((Member)(session.getAttribute("loginMember"))).getMemberNickname();
			profileImg = ((Member)(session.getAttribute("loginMember"))).getProfileImg();
			authority = ((Member)(session.getAttribute("loginMember"))).getAuthority();
			
			member.setMemberNo(memberNo);
			member.setMemberNickname(memberNickname);
			member.setProfileImg(profileImg);
			member.setAuthority(authority);
		}
		
		return new Gson().toJson(member);
	}
	
	// 단순 로그인 여부 확인용(알림에서 사용중)
	@PostMapping("/check/login")
	@ResponseBody
	public String checkLogin2(HttpSession session) {
		int result = -1;
		
		if(session.getAttribute("loginMember") != null) {
			result = 0;
		}
		
		return new Gson().toJson(result);
	}
	
	// 없는 페이지 접근 시
	@GetMapping("/notfound")
	public String notFound() {
		return "/common/notfound";
	}
}
