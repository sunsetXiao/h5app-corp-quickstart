package com.dingtalk.h5app.quickstart.dto.progress;

import com.dingtalk.h5app.quickstart.model.Progress;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProgressDto {
    private Integer id;
    private String content;
    private Integer percentage;

    public ProgressDto() {

    }

    public ProgressDto(Progress progress) {
        this.id = progress.getId();
        this.content = progress.getContent();
        this.percentage = progress.getPercentage();
    }
}
