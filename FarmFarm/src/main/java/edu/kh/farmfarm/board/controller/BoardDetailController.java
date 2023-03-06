package edu.kh.farmfarm.board.controller;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.farmfarm.board.model.service.BoardDetailService;
import edu.kh.farmfarm.board.model.vo.Board;
import edu.kh.farmfarm.common.Util;
import edu.kh.farmfarm.member.model.VO.Member;
import oracle.net.aso.c;

@Controller
public class BoardDetailController {
	
	@Autowired
	private BoardDetailService serivce;
	
	// 게시글 상세보기
	@GetMapping("/board/{boardTypeNo}/{boardNo}")
	public String boardDetailPage(
			@PathVariable("boardTypeNo") int boardTypeNo,
			@PathVariable("boardNo") int boardNo,
			Model model,
			@SessionAttribute(value="loginMember", required = false) Member loginMember,
			HttpServletRequest req, HttpServletResponse resp) throws ParseException {
		
		Board board = serivce.boardDetail(boardNo);
		
		// 로그인멤버가 좋아요 눌렀는지 확인
		if(board != null) {
			
			Map<String, Object> likeMap = new HashMap<String, Object>();
			likeMap.put("boardNo2", boardNo);
			likeMap.put("memberNo2", loginMember.getMemberNo());
			
			int likeResult = serivce.checkLike(likeMap);
			
			if(likeResult>0) {
				model.addAttribute("likeCheck", "like");
			}
			
			// 조회수 증가 (하루에 조회수 1번만 올라감)
			
			// 쿠키를 얻어옵니다
			Cookie[] cookies = req.getCookies();
			
			// 쿠키에 viewBoardNo가 있는지 확인합니다
			Cookie c = null;
			
			if(cookies != null) {
				for(Cookie temp : cookies) {
					if(temp.getName().equals(("viewBoardNo"))){
						c = temp;
					}
				}
			}
			
			int result = 0;
			
			// 쿠키에 viewBoardNo가 없으면 조회수 증가시켜주기
			if(c == null) {
				
				result = serivce.updateBoardView(boardNo);
				c = new Cookie("viewBoardNo", "|"+boardNo+"|");
				
			}else { // 쿠키에는 viewBoardNo가 있으나 해당 게시글을 처음 보는거면 쿠키 추가추가 해주는코드
				
				// 쿠키에 저장된 값 중 해당 게시글이 있는지 확인 - 없음
				if(c.getValue().indexOf("|"+boardNo+"|")==-1) {
					
					// 조회수 증가 시켜주고
					result = serivce.updateBoardView(boardNo);
					// 쿠키에 더해준다
					c.setValue(c.getValue()+"|"+boardNo+"|");
				}
				
			}
			
			if(result>0) { // 조회수 증가에 성공시 Board에도 넣기
				board.setBoardView(board.getBoardView()+1);
				
				// 하루에 한번만 조회수가 증가되도록 시간을 설정해봅시다
				
				// c의 모든 경로에 설정을 해줄겁니다
				c.setPath("/");
				
				// 현재 시간
				Date now = new Date();
				// 기준 시간 : 1970년 1월 1일 09시 0분 0초인데
				// new Date(ms) : 기준 시간 + ms 만큼 지난 시간이래
				
				Calendar cal = Calendar.getInstance();
				cal.add(cal.DATE, 1); // 날짜에 1을 추가
				
				// simpleDateFormat을 이용해서 cal의 시간들을 0:0:0 으로 바꿉니다
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
				Date temp = new Date( cal.getTimeInMillis() );
				
				Date now2 = sdf.parse(sdf.format(temp)); // 하루 지난 날짜
				// 날짜 형식을 String을 Date로 변환
				
				// 날짜 끼리는 빼기가 안됨.
				long diff = now2.getTime() - now.getTime();
				
				c.setMaxAge((int)(diff/1000));
				resp.addCookie(c);
				
			}
		}
		
		model.addAttribute("board", board);
		
		return "board/boardDetail";
	}
	
	
	// 게시글 좋아요
	@GetMapping("/boardLikeInsert")
	@ResponseBody
	public int boardLikeInsert(
			@RequestParam Map<String, Object> likeMap) {
		return serivce.boardLikeInsert(likeMap);
	}
	
	
	// 게시글 좋아요 취소
	@GetMapping("/boardLikeDelete")
	@ResponseBody
	public int boardLikeDelete(
			@RequestParam Map<String, Object> likeMap) {
		return serivce.boardLikeDelete(likeMap);
	}

	
	// 게시글 삭제 - 수정 전 코드
//	@GetMapping("/board/{boardTypeNo}/{boardNo}/delete")
//	public String boardDelete(
//			@PathVariable("boardTypeNo") int boardTypeNo,
//			@PathVariable("boardNo") int boardNo,
//			RedirectAttributes ra,
//			@RequestHeader("referer") String referer) {
//		
//		int result = serivce.boardDelete(boardNo);
//		
//		String message = null;
//		String path = null;
//		
//		// 삭제 성공!
//		if(result>0) {
//			message = "게시글을 삭제했습니다.";
//			path = "/board/"+boardTypeNo;
//			
//		}else {
//			message = "삭제 실패...";
//			path = referer;
//		}
//		
//		ra.addFlashAttribute("message", message);
//		
//		return "redirect:"+path;
//	}
	
	// 게시글 삭제 - 수정 후 코드
	@DeleteMapping("/board/{boardTypeNo}/{boardNo}")
	@ResponseBody
	public int boardDelete(
			@PathVariable("boardNo") int boardNo) {
		
		int result = serivce.boardDelete(boardNo);
		
		return result;
	}
		
	
	
	// 게시글 수정하기 페이지 이동 - 수정 전
//	@GetMapping("/board/{boardTypeNo}/{boardNo}/update")
//	public String boardUpdatePage(
//			@PathVariable("boardTypeNo") int boardTypeNo,
//			@PathVariable("boardNo") int boardNo,
//			Model model) {
//		
//		Board board = serivce.boardDetail(boardNo);
//		
//		// 개행문자 처리
//		board.setBoardContent(Util.newLineClear(board.getBoardContent()));
//		
//		model.addAttribute("board", board);
//		
//		return "board/boardUpdate";
//	}
	
	// 게시글 수정하기 페이지 이동 - 수정 후
	@GetMapping("/board/{boardTypeNo}/{boardNo}/update")
	public String boardUpdatePage(
			@PathVariable("boardTypeNo") int boardTypeNo,
			@PathVariable("boardNo") int boardNo,
			@SessionAttribute(value="loginMember", required = false) Member loginMember,
			Model model) {
		
		Board board = serivce.boardDetail(boardNo);
		String path = null;
		
		int loginNo = loginMember.getMemberNo();
		int boMemNo = board.getMemberNo();
		
		if(loginNo == boMemNo) {
			// 개행문자 처리
			board.setBoardContent(Util.newLineClear(board.getBoardContent()));
			
			model.addAttribute("board", board);
			path = "board/boardUpdate";
		}else {
			path = "common/error";
		}
		
		return path;
	}
	
	
	// 게시글 수정합니다
	@PostMapping("/board/{boardTypeNo}/{boardNo}/update")
	public String boardUpdate(
			@PathVariable("boardTypeNo") int boardTypeNo,
			@PathVariable("boardNo") int boardNo,
			Board board,
			@RequestParam(value="cp", required = false, defaultValue="1") int cp,
			@RequestParam(value="deleteImgList", required = false) String deleteImgList,
			@RequestParam(value="imgs", required = false) List<MultipartFile> imgList,
			@RequestHeader("referer") String referer, // 수정 실패 시 이전 요청 주소 요청
			HttpSession session, // 서버 파일 저장 경로 얻기
			RedirectAttributes ra // 메세지 전달용
			) throws IOException {
		
		board.setBoardNo(boardNo);
		
		String webPath = "/resources/images/board/";
		String folderPath = session.getServletContext().getRealPath(webPath);
		
		int result = serivce.updateBoard(board, deleteImgList, imgList, webPath, folderPath);
		
		String message = null;
		String path = null;
		
		if(result>0) {
			path = "/board/" + boardTypeNo + "/" + boardNo + "?cp=" + cp;
			message = "게시글이 수정되었습니다.";
		}else {
			path = referer;
			message = "게시글 수정에 실패했습니다....";
		}
		
		ra.addFlashAttribute("message", message);
		
		return "redirect:"+path;
	}

	
}
