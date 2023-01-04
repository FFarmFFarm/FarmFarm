package edu.kh.farmfarm.member.model.VO;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MemberAddress {
	private int addressNo;
	private String memberAddress;
	private String memberAddress2;
	private String defaultFl;
	private int memberNo;
	private String memberName;
	private String to;
	
	List<MemberAddress> addressList;
}
