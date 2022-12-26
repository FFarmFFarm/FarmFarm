package edu.kh.farmfarm.member.model.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.member.model.VO.MemberAddress;
import net.nurigo.java_sdk.exceptions.CoolsmsException;

public interface MemberService {
	
	Member login(Member inputMember);

	String checkReport(int memberNo);

//	int signUp(Member inputMember);

	int signUp0(Member inputMember, String[] memberAddress);

	int signUp1(Member inputMember, String[] memberAddress, String webPath, String folderPath, MultipartFile farmImg) throws IOException, Exception;

	String phoneNumberCheck(String to) throws CoolsmsException;




	
}
