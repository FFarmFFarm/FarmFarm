package edu.kh.farmfarm.mypage.model.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;

import edu.kh.farmfarm.board.model.vo.Board;
import edu.kh.farmfarm.common.Util;
import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.mypage.model.dao.MyPageDAO;
import edu.kh.farmfarm.mypage.model.vo.Comment;
import edu.kh.farmfarm.mypage.model.vo.CommentPagination;
import edu.kh.farmfarm.mypage.model.vo.Order;
import edu.kh.farmfarm.mypage.model.vo.OrderPagination;
import edu.kh.farmfarm.mypage.model.vo.Wish;
import edu.kh.farmfarm.productDetail.model.vo.Review;
import edu.kh.farmfarm.productDetail.model.vo.ReviewImg;

@Service
public class MyPageServiceImpl implements MyPageService {
	
	@Autowired
	private MyPageDAO dao;
	
	@Autowired
	private BCryptPasswordEncoder bcrypt;
	
	
	/** 주문 내역 조회
	 *
	 */
	@Override
	public Map<String, Object> selectOrderList(Member loginMember, int cp) {
		
		int orderCount = dao.orderCount(loginMember);
		
		OrderPagination pagination = new OrderPagination(orderCount, cp);
		
		List<Order> orderList = dao.selectOrderList(loginMember, pagination);
		 
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("pagination", pagination);
		map.put("orderList", orderList);
		map.put("orderCount", orderCount);
		
		return map;
	}

	
	
	/** 작성 후기 조회
	 *
	 */
	@Override
	public Map<String, Object> selectReviewList(Member loginMember, int cp) {
		
		int reviewCount = dao.reviewCount(loginMember);
		
		OrderPagination pagination = new OrderPagination(reviewCount, cp);
		
		List<Review> reviewList = dao.selectReviewList(loginMember, pagination);
		 
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("pagination", pagination);
		map.put("reviewList", reviewList);
		map.put("reviewCount", reviewCount);
		
		return map;
	}
	
	
	
	/** 작성 게시글 목록 조회
	 *
	 */
	@Override
	public Map<String, Object> selectBoardList(Map<String, Object> paramMap, int cp) {
		
		
		int boardCount = dao.boardCount((int)paramMap.get("memberNo"));
		
		CommentPagination pagination = new CommentPagination(boardCount, cp);
		
		List<Board> boardList = dao.selectBoardList(paramMap, pagination);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("pagination", pagination);
		map.put("boardList", boardList);
		map.put("boardCount", boardCount);
		
		return map;
	}
	
	
	
	
	/** 작성 댓글 목록 조회
	 *
	 */
	@Override
	public Map<String, Object> selectCommentList(int memberNo, int cp) {
		
		
		int commentCount = dao.commentCount(memberNo);
		
		CommentPagination pagination = new CommentPagination(commentCount, cp);
		
		List<Comment> commentList = dao.selectCommentList(memberNo, pagination);
		 
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("pagination", pagination);
		map.put("commentList", commentList);
		
		return map;
	}
	
	
	
	/** 찜목록 조회
	 *
	 */
	@Override
	public Map<String, Object> selectWishList(int memberNo, int cp) {
		
		int wishCount = dao.wishCount(memberNo);
		
		OrderPagination pagination = new OrderPagination(wishCount, cp);
		
		List<Wish> wishList = dao.selectWishList(memberNo, pagination);
		 
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("pagination", pagination);
		map.put("wishList", wishList);
		map.put("wishCount", wishCount);
		
		return map;
	}
	
	
	/** 마이페이지 배경 이미지 변경
	 * @throws Exception 
	 *
	 */
	@Override
	public int updateBgImg(String webPath, String filePath, 
			MultipartFile mypageImg, Member loginMember) throws Exception {
		
		
		String temp = loginMember.getMypageImg();
		
		String rename = null;
		
		if(mypageImg.getSize() == 0) {
			loginMember.setMypageImg(null);
		} else {
			
			rename = Util.fileRename(mypageImg.getOriginalFilename());
			
			loginMember.setMypageImg(webPath + rename);
			
		}
		
		int result = dao.updateBgImg(loginMember);
		
		if(result > 0) {
			
			if(rename != null) {
				
				mypageImg.transferTo(new File(filePath+rename));
				
			}
			
		} else {
			loginMember.setMypageImg(temp);
			
			throw new Exception("파일 업로드 실패");
		}
		
		return result;
	}
	
	
	/** 기본이미지로 변경
	 *
	 */
	@Override
	public int defaultBgImg(Member loginMember) {
		return dao.defaultBgImg(loginMember);
	}
	
	/** 주문 목록 구매 확정
	 *
	 */
	@Override
	public int orderConfirm(int orderNo) {
		return dao.orderConfirm(orderNo);
	}
	
	
	/** 리뷰 작성
	 *
	 */
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int writeReview(String webPath, String filePath, 
			Review review, 
			List<MultipartFile> imageList) throws IOException {
		
		review.setReviewContent(Util.XSSHandling(review.getReviewContent()));
		
		review.setReviewContent(Util.newLineHandling(review.getReviewContent()));
		
		int reviewNo = dao.writeReview(review);
		
		if(reviewNo > 0) {
//			imageList: 실제 파일이 담겨있는 리스트
//			boardImageList: DB에 삽입할 이미지 정보만 담겨있는 리스트
//			reNameList: 변경된 파일명만 담겨있는 리스트
			
			List<ReviewImg> reviewImgList = new ArrayList<ReviewImg>();
			List<String> renameList = new ArrayList<String>();
			
			for(int i=0; i<imageList.size(); i++) {
				
				if(imageList.get(i).getSize() > 0) {
					
					ReviewImg img = new ReviewImg();
					
					String rename = Util.fileRename(imageList.get(i).getOriginalFilename());
					renameList.add(rename);
					
					img.setReviewImgPath(webPath + rename); 
					
					img.setReviewImgOrder(i);
					
					img.setReviewNo(review.getReviewNo());
					
					reviewImgList.add(img);
					
				}
				
			}
			
			if(!reviewImgList.isEmpty()) {
				
				int result = dao.insertReviewImgList(reviewImgList);
				
				if(result == reviewImgList.size()) {
					
					for(int i=0; i<reviewImgList.size(); i++) {
						
						int index = reviewImgList.get(i).getReviewImgOrder();
						
						imageList.get(index).transferTo(new File(filePath+renameList.get(i)));
						
					}
					
				}
				
			}
			
		}
		
		return reviewNo;
	}
	
	
	@Override
	public int deleteWish(Map<String, Object> map) {
		return dao.deleteWish(map);
	}


	/** 마이페이지 프로필수정_이미지  
	 * @return
	 * @throws IOException 
	 * @throws IllegalStateException 
	 */
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int updateImage(String webPath, String folderPath, Member loginMember, MultipartFile farmfarm) throws Exception {
		
		String temp = loginMember.getProfileImg();
		
		String rename = null;
		
		if(farmfarm.getSize() == 0) {
			loginMember.setProfileImg(null);
		} else {
			
			rename = Util.fileRename(farmfarm.getOriginalFilename());
			
			loginMember.setProfileImg(webPath + rename);
			
		}
		
		int result = dao.updateImg(loginMember);
		
		if(result > 0) {
			
			if(rename != null) {
				
				farmfarm.transferTo(new File(folderPath+rename));
				
			}
			
		} else {
			loginMember.setProfileImg(temp);
			
			throw new Exception("파일 업로드 실패");
		}
		
		return result;
	}


	/** 마이페이지 프로필수정_정보   
	 * @return
	 */
	@Override
	public int updateProfile(Member inputMember, String[] memberAddress) {
		
		int memberNickname = dao.updateMember(inputMember);
		
		int result = 0;
		
		if(memberNickname > 0) {
			if(!memberAddress.equals(",,")) {
				String address = String.join(",,", memberAddress);
				inputMember.setMemberAddress(address);
				String add = inputMember.getMemberAddress();
				int memberNo = inputMember.getMemberNo();
								
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("memberAddress", add);
				map.put("memberNo", memberNo);
				result = dao.updateAddress(map);
			}
		}
		
		return result;
	}


	/** 마이페이지 비밀번호 변경  
	 * @return
	 */
	@Override
	public int updatePw(Map<String, Object> map) {
		int memberNo = (int)map.get("memberNo");
		
		String encPw = dao.selectEncPw(memberNo);
		
		if(bcrypt.matches((String)map.get("currentPw"), encPw)) {
			String newPw = bcrypt.encode((String)map.get("newPw"));
			map.put("newPw", newPw);
			int result = dao.updatePw(map);
			return result;
		}
		
		return 0;
	}


	/** 마이페이지 회원 탈퇴 
	 * @return
	 */
	@Override
	public int secession(String memberPw, int memberNo, int authority) {
		// 비밀번호 조회
		String encPw = dao.selectEncPw(memberNo);
		
		int result = 0;
		if(bcrypt.matches(memberPw, encPw)) {
			if(authority == 1) {
				String condition = "WHERE MEMBER_NO=" + memberNo;
				result = dao.updateSoldout(condition);
			}
		}
		return dao.secession(memberNo);
	}
	
	/** 주문 하나 조회
	 *
	 */
	@Override
	public Order selectOrder(int orderNo) {
		return dao.selectOrder(orderNo);
	}
	
	
	/** 배경 이미지 변경명 조회
	 *
	 */
	@Override
	public List<String> selectBgImageList() {
		return dao.selectBgImageList();
	}
	
	/** 프로필 이미지 변경명 조회
	 *
	 */
	@Override
	public List<String> selectProfileImageList() {
		return dao.selectProfileImageList();
	}
	
	/** 리뷰 이미지 변경명 조회
	 *
	 */
	@Override
	public List<String> selectReviewImageList() {
		return dao.selectReviewImageList();
	}


	/** 멤버 정보 조회
	 * @param memberNo
	 * @return memberInfo
	 */
	@Override
	public Member selectMemberInfo(int memberNo) {
		return dao.selectMemberInfo(memberNo);
	}

}
