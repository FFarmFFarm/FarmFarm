package edu.kh.farmfarm.mypage.model.service;

import java.util.List;
import java.util.Map;

import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.mypage.model.vo.Comment;

public interface MyPageService {

	
	
	/** 주문 내역 조회
	 * @param loginMember
	 * @return
	 */
	Map<String, Object> selectOrderList(Member loginMember);
	
	
	/** 작성 댓글 목록 조회
	 * @param memberNo
	 * @param cp
	 * @return
	 */
	Map<String, Object> selectOrderList(Member loginMember, int cp);



	
	

}
