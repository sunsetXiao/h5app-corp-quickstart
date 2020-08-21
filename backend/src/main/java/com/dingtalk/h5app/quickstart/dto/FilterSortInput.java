package com.dingtalk.h5app.quickstart.dto;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class FilterSortInput {
    private List<FilterInput> filterInputList;
    private SortInput sortInput;
}
