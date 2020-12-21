package com.dingtalk.h5app.quickstart.dto.contact;

import com.dingtalk.h5app.quickstart.dto.IdInput;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ContactCreateInput {
    private String address;
    private String name;
    private String mobile;
    private String phone;
    private String position;
    private String image;

    private IdInput company;
}
