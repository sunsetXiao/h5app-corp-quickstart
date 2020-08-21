package com.dingtalk.h5app.quickstart.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.domain.Sort;

@Getter
@Setter
@ToString
public class SortInput {
    private String field;
    private Sort.Direction order;
}
