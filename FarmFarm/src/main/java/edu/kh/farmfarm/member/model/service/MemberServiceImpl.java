package edu.kh.farmfarm.member.model.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.javassist.expr.NewExpr;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import edu.kh.farmfarm.common.Util;
import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.member.model.VO.MemberAddress;
import edu.kh.farmfarm.member.model.dao.MemberDAO;
import edu.kh.farmfarm.seller.model.vo.Seller;

@Service
public class MemberServiceImpl implements MemberService {
	
	@Autowired
	private MemberDAO dao;
	
	@Autowired
	private BCryptPasswordEncoder bcrypt;

	@Override
	public Member login(Member inputMember) {
		Member loginMember = dao.login(inputMember.getMemberId());
		
		if(loginMember != null) {
			if(bcrypt.matches(inputMember.getMemberPw(), loginMember.getMemberPw())) {
				loginMember.setMemberPw(null);
			} else {
				loginMember = null;
			}
		}
		
      System.out.println("입력한 비밀번호 : " + inputMember.getMemberPw());
      System.out.println("암호화 비밀번호 : " + bcrypt.encode(inputMember.getMemberPw()) );
		
		return loginMember;
	}

	// 신고 여부 조회 
	@Override
	public String checkReport(int memberNo) {
		return dao.checkReport(memberNo);
	}

	// 회원가입 (구매자)
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int signUp0(Member inputMember, String[] memberAddress) {
		
		String encPw = bcrypt.encode(inputMember.getMemberPw());
		inputMember.setMemberPw(encPw);
		
		// 1. 회원 정보 삽입 
		int memberNo = dao.signUp0(inputMember);
		
		int result = 0;
		
		if(memberNo > 0) {
			// 주소가 작성 경우
			if(!memberAddress.equals(",,")) {
				inputMember.setMemberAddress(String.join(",,", memberAddress));
				String add = inputMember.getMemberAddress();
				System.out.println(add);
				
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("memberAddress", add);
				map.put("memberNo", memberNo);
				result = dao.insertMemberAddressList(map);
			}
		}
		
		return result;
	}
	

	// 회원가입 (판매자) 
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int signUp1(Member inputMember, String[] memberAddress, String webPath, String folderPath, MultipartFile image) throws IOException {
		String encPw = bcrypt.encode(inputMember.getMemberPw());
		inputMember.setMemberPw(encPw);
		
		// 1. 회원 정보 삽입 
		int memberNo = dao.signUp0(inputMember);
		
		// 이미지 삽입 
		Seller farmImage = new Seller();
		String reName = null;
		
			if(image.getSize() > 0) {
				
				// 파일명 리네임 
				reName = Util.fileRename(image.getOriginalFilename());
				
				farmImage.setFarmImg(webPath + reName);
				farmImage.setMemberNo(memberNo);
				
			}
			
		// 업로드 된 이미지가 있을 경우 
		if(farmImage != null) {
			int img = dao.insertFarmImgList(farmImage);
			image.transferTo(new File(folderPath + reName));
		}
		
		int result = 0;
		
		if(memberNo > 0) {
			// 주소가 작성 경우
			if(!memberAddress.equals(",,")) {
				inputMember.setMemberAddress(String.join(",,", memberAddress));
				String add = inputMember.getMemberAddress();
				System.out.println(add);
				
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("memberAddress", add);
				map.put("memberNo", memberNo);
				result = dao.insertMemberAddressList(map);
			}
		}
		
		return result;
	}

}
