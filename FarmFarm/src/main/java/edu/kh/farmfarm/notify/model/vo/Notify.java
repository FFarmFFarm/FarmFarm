package edu.kh.farmfarm.notify.model.vo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class Notify {
	
	private int notifyNo;
	private int notifyTypeNo;
	private String notifyTitle;
	private int memberNo;
	private String notifyContent;
	private String notifyDate;
	private String quickLink;
	private String notifyStatus;
}
