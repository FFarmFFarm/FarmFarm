package edu.kh.farmfarm.inquire.model.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class InquireRoom {

    private int inquireNo;
    private String inquireDate;
    
    private int memberNo;
    private String memberNickname;
    private String profileImg;
    
    private int memberNo2;
    private String memberNickname2;
    private String profileImg2;
    
    private String closedFl;
    
    private String lastSendTime;
    private String lastMessage;
    private int unreadCount;
    private String lastSendImgFl;
    private int messageTimeOrder;
}
