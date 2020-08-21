package com.dingtalk.h5app.quickstart.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class FilterInput {
    private String field;
    private String value;
}
