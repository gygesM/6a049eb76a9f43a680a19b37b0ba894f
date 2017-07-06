package org.igeek.vo;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * Created by Gyges on 2017/7/2.
 */
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class QualityCollectVo {

    private Integer collectId;//采集id
    private String formWorkerNum;//注浆工工号
    private String formWorkerName;//注浆工姓名
    private Long count;//统计次数


    public QualityCollectVo() {
    }

    public Integer getCollectId() {
        return collectId;
    }

    public void setCollectId(Integer collectId) {
        this.collectId = collectId;
    }

    public String getFormWorkerNum() {
        return formWorkerNum;
    }

    public void setFormWorkerNum(String formWorkerNum) {
        this.formWorkerNum = formWorkerNum;
    }

    public String getFormWorkerName() {
        return formWorkerName;
    }

    public void setFormWorkerName(String formWorkerName) {
        this.formWorkerName = formWorkerName;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }
}