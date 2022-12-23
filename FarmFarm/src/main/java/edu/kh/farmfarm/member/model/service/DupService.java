package edu.kh.farmfarm.member.model.service;

public interface DupService {

	int idDupCheck(String memberId);

	int nameDupCheck(String memberName);

	int nicknameDupCheck(String memberNickname);

}
