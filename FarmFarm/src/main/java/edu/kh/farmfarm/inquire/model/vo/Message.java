package edu.kh.farmfarm.inquire.model.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Message {

    private int messageNo;
    private int inquireNo;
    private String messageContent;
    private String readFl;
    private int sendMemberNo;
    private String messageDelFl;
    private int roomNo;
    private String messageTime;
    private String imgFl;
}
