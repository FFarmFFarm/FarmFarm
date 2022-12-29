package edu.kh.farmfarm.member.model.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.member.model.VO.MemberAddress;
import net.nurigo.java_sdk.exceptions.CoolsmsException;

public interface MemberService {
	
	// 로그인 
	Member login(Member inputMember);

	// 신고 조회 
	String checkReport(int memberNo);

	// 회원가입(구매자) 
	int signUp0(Member inputMember, String[] memberAddress);

	// 회원가입(판매자) 
	int signUp1(Member inputMember, String[] memberAddress, String webPath, String folderPath, MultipartFile farmImg) throws IOException, Exception;

	// 문자 인증 
	String phoneNumberCheck(String to) throws CoolsmsException;




	
}
