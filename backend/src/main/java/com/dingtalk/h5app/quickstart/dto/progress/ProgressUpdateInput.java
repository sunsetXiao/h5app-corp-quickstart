package com.dingtalk.h5app.quickstart.dto.progress;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProgressUpdateInput {
    private Integer id;
    private String content;
    private Integer percentage;
}
