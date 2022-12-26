package edu.kh.farmfarm.member.model.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

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
import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;

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
	public int signUp1(Member inputMember, String[] memberAddress, String webPath, String folderPath, MultipartFile farmImg) throws Exception {
		String encPw = bcrypt.encode(inputMember.getMemberPw());
		inputMember.setMemberPw(encPw);
		
		// 1. 회원 정보 삽입 
		int memberNo = dao.signUp1(inputMember);
		
		// 이미지 삽입 
		String rename = null;
		Seller farmImage = new Seller();
		
		if(farmImg.getSize() > 0) {
			rename = Util.fileRename(farmImg.getOriginalFilename());
			
			farmImage.setMemberNo(memberNo);
			farmImage.setFarmImg(farmImg.getOriginalFilename());

			int result1 = dao.insertFarmImage(farmImage);
			
			if(result1 > 0) {
				farmImg.transferTo(new File(folderPath + rename));
			}
		}
		
		
		int result = 0;
		
		if(memberNo > 0) {
			// 주소가 작성된 경우
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

	@Override
	public String phoneNumberCheck(String to) throws CoolsmsException {
		String api_key = "NCS5PXEAYWDXYENJ";
		String api_secret = "S7HWXOACBXDYWJZX7R0ZWZI7GBZJAGW6";
		Message coolsms = new Message(api_key, api_secret);
		
		Random rand  = new Random();
	    String numStr = "";
	    for(int i=0; i<4; i++) {
	       String ran = Integer.toString(rand.nextInt(10));
	       numStr+=ran;
	    }
		
		
	    HashMap<String, String> params = new HashMap<String, String>();
	    params.put("to", to);    // 수신전화번호 (ajax로 view 화면에서 받아온 값으로 넘김)
	    params.put("from", "01020901167");    // 발신전화번호. 테스트시에는 발신,수신 둘다 본인 번호로 하면 됨
	    params.put("type", "sms"); 
	    params.put("text", "[팜팜] 본인확인 인증번호는 [" + numStr + "] 입니다.");

	    coolsms.send(params); // 메시지 전송
	        
	    return numStr;
	}




}
