package org.igeek.service;

import com.github.pagehelper.PageInfo;
import org.igeek.common.ServerResponse;
import org.igeek.pojo.Quality;
import org.igeek.vo.UserVo;

import java.util.Set;

/**
 * Created by Gyges on 2017/6/28.
 */
public interface IQualityService {

    public ServerResponse<String> updateOrAddQuality(Quality quality);

    public ServerResponse<PageInfo> getQualityInfoList(int pageNum, int pageSize,Integer status,
                                                       Integer userType,Integer orgId);

    public ServerResponse<String> updateQualityStatus(Integer qualityId, Integer status,Integer orgId);

    public ServerResponse<Set<UserVo>> getUserList(Integer status);



}
