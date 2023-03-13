package edu.kh.farmfarm.postDetail.controller;

import java.net.http.HttpRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttribute;

import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.postDetail.model.service.PostDetailService;
import edu.kh.farmfarm.postDetail.model.vo.Post;
import edu.kh.farmfarm.productDetail.model.vo.Product;

@RequestMapping("/posts")
@Controller
public class PostDetailController {
	
	@Autowired
	private PostDetailService service;
	
	/** 판매글로 이동
	 * @param loginMember
	 * @param postNo
	 * @param model
	 * @param req
	 * @param resp
	 * @return
	 * @throws ParseException
	 */
	@GetMapping("/{postNo}")
	public String post(
		@SessionAttribute(name = "loginMember", required = false) Member loginMember,
		@PathVariable("postNo") int postNo,
		Model model,
		HttpServletRequest req, HttpServletResponse resp) throws ParseException {
	
		
	//	파라미터 담을 객체 생성
		Post post = service.selectPost(postNo);

		
		if(post != null) {
			
			Cookie[] cookies = req.getCookies();
			
			Cookie c = null;
			
			if(cookies != null) {
				for(Cookie  temp : cookies) {
					if(temp.getName().equals("readPostNo")) {
						c = temp;
					}
				}
				
			}
			
			int result = 0;
			
			if( c == null) {
				result = service.updateViewCount(postNo);
				
				c = new Cookie("readPostNo", "|" + postNo + "|");
				
			} else {
				
				
				if(c.getValue().indexOf("|" + postNo + "|") == -1) {
					
					result = service.updateViewCount(postNo);
					
					c.setValue(c.getValue() + "|" + postNo + "|");
					
				}
			}
			
			if(result>0) {
				post.setPostView(post.getPostView() + 1);
				
				c.setPath("/");
				
				
				Date a = new Date();
				
				Calendar cal = Calendar.getInstance();
				
				cal.add(cal.DATE, 1);
				
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
				Date temp = new Date(cal.getTimeInMillis());
				
				Date b = sdf.parse(sdf.format(temp));
				
				Long diff = b.getTime() - a.getTime();
				
				c.setMaxAge((int)(diff/1000));
				
				resp.addCookie(c);
				
			}
			
		}
		
		//	모델에 저장
		model.addAttribute("post", post);
		
		
		return "postDetail/postDetail";
	}

}
