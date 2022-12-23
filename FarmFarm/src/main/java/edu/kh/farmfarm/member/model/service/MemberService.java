package edu.kh.farmfarm.member.model.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.member.model.VO.MemberAddress;

public interface MemberService {
	
	Member login(Member inputMember);

	String checkReport(int memberNo);

//	int signUp(Member inputMember);

	int signUp0(Member inputMember, String[] memberAddress);

	int signUp1(Member inputMember, String[] memberAddress, String webPath, String folderPath, MultipartFile image);



	
}
