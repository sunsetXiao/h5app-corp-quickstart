package com.dingtalk.h5app.quickstart.dto;

import com.dingtalk.h5app.quickstart.model.staicdata.City;
import com.dingtalk.h5app.quickstart.model.staicdata.Industry;
import com.dingtalk.h5app.quickstart.model.staicdata.IndustryCategory;
import com.dingtalk.h5app.quickstart.model.staicdata.Province;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
public class StaticDto {
    private Integer value;
    private String label;

    private List<StaticDto> children;

    public StaticDto() {

    }

    static public List<StaticDto> staticDtoListProvince(Iterable<Province> provinceList) {
        List<StaticDto> list = new ArrayList<>();
        for (Province province: provinceList) {
            StaticDto staticDto = new StaticDto();
            staticDto.setValue(province.getId());
            staticDto.setLabel(province.getName());

            List<StaticDto> children = new ArrayList<>();

            for (City city: province.getCities()) {
                StaticDto staticDtoCity = new StaticDto();
                staticDtoCity.setValue(city.getId());
                staticDtoCity.setLabel(city.getName());
                staticDtoCity.setChildren(new ArrayList<>());
                children.add(staticDtoCity);
            }
            staticDto.setChildren(children);
            list.add(staticDto);
        }
        return list;
    }

    static public List<StaticDto> staticDtoListIndustry(Iterable<IndustryCategory> categoryList) {
        List<StaticDto> list = new ArrayList<>();
        for (IndustryCategory category: categoryList) {
            StaticDto staticDto = new StaticDto();
            staticDto.setValue(category.getId());
            staticDto.setLabel(category.getName());

            List<StaticDto> children = new ArrayList<>();

            for (Industry industry: category.getIndustryList()) {
                StaticDto staticDtoIndustry = new StaticDto();
                staticDtoIndustry.setValue(industry.getId());
                staticDtoIndustry.setLabel(industry.getName());
                staticDtoIndustry.setChildren(new ArrayList<>());
                children.add(staticDtoIndustry);
            }
            staticDto.setChildren(children);
            list.add(staticDto);
        }

        return list;
    }
}
