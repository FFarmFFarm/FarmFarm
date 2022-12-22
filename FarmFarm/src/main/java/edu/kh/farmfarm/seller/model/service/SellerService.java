package edu.kh.farmfarm.seller.model.service;

import java.util.Map;

import edu.kh.farmfarm.member.model.VO.Member;

public interface SellerService {

	
	/** 판매자 기본정보 조회
	 * @param memberNo
	 * @return memberInfo
	 */
	Member selectMemberInfo(int memberNo);

	
	/** 판매글 리스트 조회
	 * @param cp
	 * @return map
	 */
	Map<String, Object> selectPostList(int cp, int memberNo);

}
