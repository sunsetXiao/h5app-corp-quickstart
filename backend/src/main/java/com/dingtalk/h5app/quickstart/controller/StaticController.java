package com.dingtalk.h5app.quickstart.controller;

import com.dingtalk.h5app.quickstart.domain.ServiceResult;
import com.dingtalk.h5app.quickstart.dto.IdInput;
import com.dingtalk.h5app.quickstart.dto.StaticDto;
import com.dingtalk.h5app.quickstart.model.staicdata.IndustryCategory;
import com.dingtalk.h5app.quickstart.model.staicdata.Province;
import com.dingtalk.h5app.quickstart.repository.staticdata.IndustryCagegoryRepository;
import com.dingtalk.h5app.quickstart.repository.staticdata.ProvinceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/static")
@CrossOrigin("*")
public class StaticController {
    private static final Logger log = LoggerFactory.getLogger(CompanyController.class);

    @Autowired
    private ProvinceRepository provinceRepository;

    @Autowired
    private IndustryCagegoryRepository industryCagegoryRepository;

    @PostMapping(value = "/area")
    public ServiceResult<List<StaticDto>> area() {
        Iterable<Province> provinceList = provinceRepository.findAll();
        List<StaticDto> staticDtoList = StaticDto.staticDtoListProvince(provinceList);
        return ServiceResult.success(staticDtoList);
    }

    @PostMapping(value = "/industry")
    public ServiceResult<List<StaticDto>> industry() {
        Iterable<IndustryCategory> industryCategoryList = industryCagegoryRepository.findAll();
        List<StaticDto> staticDtoList = StaticDto.staticDtoListIndustry(industryCategoryList);
        return ServiceResult.success(staticDtoList);
    }
}
