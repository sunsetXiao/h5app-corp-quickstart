package com.dingtalk.h5app.quickstart.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Table(name = "poi")
@Setter
@Getter
@Entity
public class POI {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;

    private String province;
    private String provinceCode;
    private String city;
    private String cityCode;
    private String adName;
    private String adCode;
    private String postCode;
    private String snippet;

    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private Double latitude;
    @Column(nullable = false)
    private Double longitude;

    //     province: 'xxx', // POI所在省会，可能为空
    //         provinceCode: 'xxx', // POI所在省会编码，可能为空
    //     city: 'xxx', // POI所在城市，可能为空
    //     cityCode: 'xxx', // POI所在城市编码，可能为空
    //     adName: 'xxx', // POI所在区名称，可能为空
    //     adCode: 'xxx', // POI所在区编码，可能为空
    //     distance: 'xxx', // POI与设备位置的距离
    //     postCode: 'xxx', // POI的邮编，可能为空
    //     snippet: 'xxx', // POI的街道地址，可能为空
    //     title: 'xxx', // POI的名称
    //     latitude: 39.903578, // POI的纬度
    //     longitude: 116.473565, // POI的经度
}
