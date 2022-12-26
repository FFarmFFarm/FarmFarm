package edu.kh.farmfarm.mypage.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.mypage.model.vo.Comment;

public interface MyPageService {

	
	
	/** 주문 내역 조회
	 * @param loginMember
	 * @return
	 */
	Map<String, Object> selectOrderList(Member loginMember, int cp);
	
	
	/** 작성 후기 조회
	 * @param loginMember
	 * @param cp
	 * @return
	 */
	Map<String, Object> selectReviewList(Member loginMember, int cp);
	
	
	/** 작성 게시글 목록 조회
	 * @param memberNo
	 * @param cp
	 * @return
	 */
	Map<String, Object> selectBoardList(Map<String, Object> paramMap, int cp);
	
	
	
	/** 작성 댓글 목록 조회
	 * @param memberNo
	 * @param cp
	 * @return
	 */
	Map<String, Object> selectCommentList(int memberNo, int cp);


	/** 찜 목록 조회
	 * @param memberNo
	 * @param cp
	 * @return
	 */
	Map<String, Object> selectWishList(int memberNo, int cp);


	/** 마이페이지 배경 사진 변경
	 * @param webPath
	 * @param filePath
	 * @param mypageImg
	 * @param loginMember
	 * @return
	 */
	int updateBgImg(String webPath,
			String filePath, MultipartFile mypageImg,
			Member loginMember) throws Exception;


	/** 주문 목록 구매 확정
	 * @param orderNo
	 * @return
	 */
	int orderConfirm(int orderNo);






	
	

}
