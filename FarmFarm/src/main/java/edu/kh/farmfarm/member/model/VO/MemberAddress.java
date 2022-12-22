package edu.kh.farmfarm.member.model.VO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MemberAddress {
	private int addressNo;
	private String memberAddress;
	private String defaultFl;
	private int memberNo;
}
