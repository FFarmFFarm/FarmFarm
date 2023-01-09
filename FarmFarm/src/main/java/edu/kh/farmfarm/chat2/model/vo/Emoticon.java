package edu.kh.farmfarm.chat2.model.vo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class Emoticon {
	
	private int emoticonCategoryNo;
	private String emoticonCategoryName;
	private int emoticonNo;
	private String emoticonName;
}
