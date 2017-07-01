package org.igeek.service.impl;

import com.google.common.base.Objects;
import com.google.common.collect.Sets;
import org.igeek.common.ServerResponse;
import org.igeek.dao.*;
import org.igeek.pojo.Quality;
import org.igeek.pojo.QualityCollection;
import org.igeek.pojo.QualityQuestion;
import org.igeek.pojo.User;
import org.igeek.service.IQualityCollectService;
import org.igeek.vo.QualityVo;
import org.igeek.vo.UserVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

/**
 * Created by Gyges on 2017/6/29.
 */
@Service(value = "iQualityCollectService")
public class IQualityCollectServiceImpl implements IQualityCollectService {

    @Autowired
    private UserMapper userMapper;
    @Autowired
    private QualityCollectionMapper collectionMapper;
    @Autowired
    private ProductMapper productMapper;
    @Autowired
    private QualityQuestionMapper qualityQuestionMapper;
    @Autowired
    private QualityMapper qualityMapper;

    @Override
    public ServerResponse<String> addOrUpdateInfo(QualityCollection qualityCollection) {


        return null;
    }


    /**
     * 1 扣系数 还是扣钱(1:扣款问题 2.扣系数问题)
     * 2.更新问题列表
     * 3.选择工种类型
     *
     * @param
     * @return
     */

    @Override
    public ServerResponse<String> addOrUpdateQuestion(Integer qualitys, Double coefficients,Integer q_id,Integer q_type) {
        Quality quality = qualityMapper.selectByPrimaryKey(q_id);
        QualityQuestion qualityQuestion = null;
//        该问题存在的话
        if(!Objects.equal(null,quality)){
            qualityQuestion = new QualityQuestion();
            qualityQuestion.setQuestionName(quality.getTitle());
            qualityQuestion.setQuestionId(q_id);
            qualityQuestion.setCollectType(q_type);

        }
        return null;
    }




    public ServerResponse<Set<UserVo>> searchUserList(String name) {
        Set<UserVo> userVoList = Sets.newHashSet();
        if (name != null) {
            StringBuilder sb = new StringBuilder();
            sb.append("%").append(name).append("%");
            name = sb.toString();
        }
        List<User> userList = userMapper.getUserList(name);
        if (userList.size() > 0) {
            for (User user : userList) {
                UserVo userVo = new UserVo();
                userVo.setUserNameCode(user.getNumstr() + "-" + user.getName());
                userVoList.add(userVo);
            }
            return ServerResponse.createBySuccess(userVoList);
        }
        return ServerResponse.createByErrorMsg("无法获得该姓名列表");
    }



    @Override
    public ServerResponse<Set<UserVo>> searchUserCategoryList(Integer category) {
        Set<UserVo> userVoList = Sets.newHashSet();
        if (category != null) {
            List<User> userList = userMapper.getUserCategoryList(category);
            if (userList.size() > 0) {
                for (User user : userList) {
                    UserVo userVo = new UserVo();
                    userVo.setUserNameCode(user.getNumstr() + "-" + user.getName());
                    userVoList.add(userVo);
                }
                return ServerResponse.createBySuccess("获取工人列表成功", userVoList);
            }
        }
        return ServerResponse.createByErrorMsg("获取工人列表失败");
    }



    public ServerResponse<List<String>> searchProIdList(Integer status) {

// TODO: 2017/6/30 查出产品代号，而且是成型工的.

        return null;
    }


    public ServerResponse<Set<QualityVo>> getQualityCategoryList(Integer status,Integer questionType) {
        List<Quality> qualityList = qualityMapper.selectAllQualityQuestion(status,questionType);
        Set<QualityVo> qualityVoList = Sets.newHashSet();
        if (qualityList.size() > 0) {
            for (Quality quality : qualityList) {
                QualityVo qualityVo = new QualityVo();
                qualityVo.setQualityIdName(quality.getTitle());
                qualityVo.setQuestionType(quality.getQuestionType());
                qualityVo.setQualityId(quality.getId());
                qualityVoList.add(qualityVo);
            }
            return ServerResponse.createBySuccess("获取质量问题列表成功",qualityVoList);
        }
        return ServerResponse.createByErrorMsg("获取质量问题列表失败");
    }


}