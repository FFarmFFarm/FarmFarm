package edu.kh.farmfarm.alarm.model.vo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class Alarm {
	
	private int alarmNo;
	private int alarmTypeNo;
	private String alarmTitle;
	private int memberNo;
	private String alarmContent;
	private String alarmDate;
	private String quickLink;
}
