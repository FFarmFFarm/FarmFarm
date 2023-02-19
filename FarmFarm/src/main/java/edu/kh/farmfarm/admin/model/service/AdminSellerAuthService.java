package edu.kh.farmfarm.admin.model.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import edu.kh.farmfarm.admin.model.vo.Admin;

public interface AdminSellerAuthService {
	
	
	/** 판매자 인증 조회
	 * @param preSellerFilter
	 * @param cp
	 * @return map
	 */
	Map<String, Object> selectSeller(Map<String, Object> paramMap, int cp);


	/** 판매자 인증 신청서 조회
	 * @param hiddenNo
	 * @return authPaper
	 */
	Admin selectAuthPaper(int hiddenNo);


	/** 판매자 인증 승인
	 * @param hiddenNo
	 * @return result
	 */
	int sellerApprove(int hiddenNo);

	
	
	/** 판매자 인증 보류
	 * @param hiddenNo
	 * @return result
	 */
	int sellerDeny(int hiddenNo, String denyReason);
	
	
	/** 판매자 인증 보류 사유 가져오기
	 * @param memberNo
	 * @return
	 */
	String selectDenyReason(int memberNo);


	/** 판매자 인증 사진 업데이트
	 * @param hiddenNo
	 * @param webPath
	 * @param folderPath
	 * @param updateFarmImg
	 * @return result
	 * @throws IOException 
	 */
	int updateSellerImage(int memberNo, String webPath, String folderPath, MultipartFile farmImg) throws IOException;

}
