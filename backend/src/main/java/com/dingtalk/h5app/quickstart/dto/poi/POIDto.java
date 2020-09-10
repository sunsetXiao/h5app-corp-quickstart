package com.dingtalk.h5app.quickstart.dto.poi;

import com.dingtalk.h5app.quickstart.model.POI;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;

@Getter
@Setter
@ToString
public class POIDto {
    private Integer id;

    private String province;
    private String provinceCode;
    private String city;
    private String cityCode;
    private String adName;
    private String adCode;
    private String postCode;
    private String snippet;

    private String title;
    private Double latitude;
    private Double longitude;

    public POIDto () {

    }

    public POIDto(POI poi) {
        this.id = poi.getId();
        this.province = poi.getProvince();
        this.provinceCode = poi.getProvinceCode();
        this.city = poi.getCity();
        this.cityCode = poi.getCityCode();
        this.adName = poi.getAdName();
        this.adCode = poi.getAdCode();
        this.postCode = poi.getPostCode();
        this.snippet = poi.getSnippet();
        this.title = poi.getTitle();
        this.latitude = poi.getLatitude();
        this.longitude = poi.getLongitude();
    }
}
