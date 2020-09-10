package com.dingtalk.h5app.quickstart.dto.poi;

import com.dingtalk.h5app.quickstart.model.POI;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class POICreateInput {
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

    public POI toPOI() {
        POI poi = new POI();
        poi.setProvince(this.getProvince());
        poi.setPostCode(this.getPostCode());
        poi.setCity(this.getCity());
        poi.setCityCode(this.getCityCode());
        poi.setAdName(this.getAdName());
        poi.setAdCode(this.getAdCode());
        poi.setPostCode(this.getPostCode());
        poi.setSnippet(this.getSnippet());
        poi.setTitle(this.getTitle());
        poi.setLatitude(this.getLatitude());
        poi.setLongitude(this.getLongitude());

        return poi;
    }
}
