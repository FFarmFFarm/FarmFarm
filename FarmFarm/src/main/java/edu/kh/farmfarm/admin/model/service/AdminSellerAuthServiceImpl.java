package edu.kh.farmfarm.admin.model.service;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import edu.kh.farmfarm.admin.model.dao.AdminSellerAuthDAO;
import edu.kh.farmfarm.admin.model.vo.Admin;
import edu.kh.farmfarm.common.Pagination;
import edu.kh.farmfarm.common.Util;
import edu.kh.farmfarm.seller.model.vo.Seller;

@Service
public class AdminSellerAuthServiceImpl implements AdminSellerAuthService{
	
	@Autowired
	private AdminSellerAuthDAO dao;

	
	// 판매자 인증 조회
	@Override
	public Map<String, Object> selectSeller(Map<String, Object> paramMap, int cp) {
		
		/* 페이지네이션 */
		// 1. 전체 개수 가져오기
		int sellerListCount = dao.sellerListCount(paramMap);
		
		// 2. 가져온 개수와 현재 페이지를 이용하여 페이지네이션 객체 발생
		Pagination pagination = new Pagination(sellerListCount, cp, 10);
		
		// 3. 페이지네이션 객체를 생성해 목록 불러오기
		// 전체 판매자(인증대기포함) 조회 (정렬 포함)
		List<Admin> sellerList = dao.selectSeller(paramMap, pagination);
		
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("sellerListCount", sellerListCount);
		map.put("sellerList", sellerList);
		map.put("pagination", pagination);
		
		return map;
		
	}
	
	
	// 인증 신청서 조회
	@Override
	public Admin selectAuthPaper(int memberNo) {
		
		Admin authPaper = dao.selectAuthPaper(memberNo);
		
		return authPaper;
	}
	
	
	// 판매자 인증 승인
	@Override
	public int sellerApprove(int memberNo) {
		
		// 회원 권한을 판매자로 변경
		int result = dao.sellerApprove(memberNo);
		
		if(result > 0) {
			// 판매자 인증 처리 일자 수정
			result = dao.updateAuthDate(memberNo);
		}
		return result;
	}
	
	
	
	
	// 판매자 인증 보류
	@Override
	public int sellerDeny(int memberNo, String denyReason) {
		
		// 회원 권한을 인증 보류로 변경
		int result = dao.sellerDeny(memberNo, denyReason);
		
		if(result > 0) {
			
			// 판매자 인증 처리 일자 수정
			result = dao.updateAuthDate(memberNo);
		}
		
		return result;
	}
	
	
	
	// 판매자 인증 보류 사유 가져오기
	@Override
	public String selectDenyReason(int memberNo) {
		return dao.selectDenyReason(memberNo);
	}
	
	
	
	// 판매자 인증 사진 업데이트
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int updateSellerImage(int memberNo, String webPath, String folderPath, 
								MultipartFile farmImg) throws IOException {
		
		// 이미지 삽입
		String rename = null;
		Seller farmImage = new Seller();
		
		int result = 0;
		
		// 업로드된 파일이 있다면
		if(farmImg.getSize() > 0) {
			
			// 원본 파일명을 변경된 파일명으로 변경
			rename = Util.fileRename(farmImg.getOriginalFilename()); 
			
			farmImage.setMemberNo(memberNo);
			farmImage.setFarmImg(rename);
			
			result = dao.updateSellerImage(farmImage);
			
			if(result > 0) {
				// 실제 파일로 변환
				farmImg.transferTo(new File(folderPath + rename));
			}
			
		}
		
		return result;
	}
	
}
