package com.dingtalk.h5app.quickstart.dto.progress;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProgressCreateInput {
    private String content;
    private Integer percentage;
    private Integer company_id;
}
