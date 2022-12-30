package edu.kh.farmfarm.report.model.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Report {
	
	private int reportNo;
	private String reportType;
	private int reportMemberNo;
	private int reportTargetNo;
	private String reportReason;
	private String reportDate;
	private String reportPenalty;
	private String processDate;
	private String reportConent;

}
