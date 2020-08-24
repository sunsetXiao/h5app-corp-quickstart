package com.dingtalk.h5app.quickstart.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class IdListInput {
    private Integer id;
    private List<Integer> idList;
}
