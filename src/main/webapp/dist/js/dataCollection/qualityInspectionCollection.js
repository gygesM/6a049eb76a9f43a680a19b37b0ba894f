function loadqualityInspectionCollectionAdditionPage(workerId,workerCode,count) {
    $("#container").load("pages/dataCollection/qualityInspectionCollection/addition.html", null, function() {
        qualityInspectionCollectionAddMenu(workerId,workerCode,count);
        initQualityCollectForm(workerId,workerCode)
    })
}

function updateQualityInspectionCollectionAdditionPage(workerId,workerCode,count) {
    $("#container").load("pages/dataCollection/qualityInspectionCollection/addition.html", null, function() {
        updateQualityInspectionCollectionAddMenu(workerId,workerCode,count);
        initQualityCollectForm(workerId,workerCode);
        updateCollection(workerId);
    })
}

function qualityInspectionCollectionAddMenu(workerId,workerCode,count){
    var submenu = document.getElementById("submenu").children;
    $('#saveBtn').click(function(){
        $("#form_box").mask("稍等，正在保存数据...");
        var collectId = getCollectId(workerId,workerCode);
        submitQualityCollectionQuestion1(collectId);
        submitQualityCollectionQuestion2(collectId);
        submitQualityCollectionQuestion3(collectId);
        submitQualityCollectionQuestion4(collectId);
        submitQualityCollectionQuestion5(collectId);
        addOrUpdateUserInfo(workerId);
        return updateCollectCount(workerId,count,collectId);
        // updateCollection();
        // setTimeout('$("#form_box").mask("数据保存完成.");',2000);
        // setTimeout(' $("#container").load("pages/dataCollection/qualityInspectionCollection/index.html", null, function() {console.log("窑炉信息页面添加");})',3000);
    });
    $('.returnBtn').click(function () {
        var submenu = document.getElementById("submenu").children;
        submenu[0].click();
    });
    $('#saveAddNew').click(function(){
        loadKilnInfoAdditionPage();
    });
};

function updateQualityInspectionCollectionAddMenu(workerId,workerCode,count){
    var submenu = document.getElementById("submenu").children;
    $('#saveBtn').click(function(){
        $("#form_box").mask("稍等，正在保存数据...");
        var collectId = getCollectId(workerId,workerCode);
        submitQualityCollectionQuestion1(collectId);
        submitQualityCollectionQuestion2(collectId);
        submitQualityCollectionQuestion3(collectId);
        submitQualityCollectionQuestion4(collectId);
        submitQualityCollectionQuestion5(collectId);
        addOrUpdateUserInfo(workerId);
        return updateCollectCount(workerId,count,collectId);
        // updateCollection();
        // setTimeout('$("#form_box").mask("数据保存完成.");',2000);
        // setTimeout(' $("#container").load("pages/dataCollection/qualityInspectionCollection/index.html", null, function() {console.log("窑炉信息页面添加");})',3000);
    });
    $('.returnBtn').click(function () {
        var submenu = document.getElementById("submenu").children;
        submenu[0].click();
    });
    $('#saveAddNew').click(function(){
        loadKilnInfoAdditionPage();
    });
};



function getQualityCollectInfo(workerCode,workerId) {
    var workerId;
    var workerCode = $("#qualityWorkerCode").val();
    if(workerCode==="") {
        workerCode="empty";
    }
    $.ajax({
        type:"GET",
        url: "/quality/collect/get_product_code",
        dataType:"json",
        data:{workerCode:workerCode,workerId:workerId},
        success: function (data) {
            $("#qualityCollectTableRow").html("");
            console.log(data);
            var tableRow = data.data;
            $.each(tableRow , function (index, optiondata) {
                var count = 0;
                count =optiondata.count;
                var tableHtml = "<tr>"
                    +"<td>"+optiondata.workerCode+"</td>"
                    +"<td>"+optiondata.workerName+"</td>"
                    +"<td><span class='btn btn-default ldelBtn'>"+count+"次</span></td>"
                    +"<td><a class='btn btn-default ldelBtn' onclick='loadqualityInspectionCollectionAdditionPage(&quot;"+optiondata.workerCode+"&quot,&quot;"+optiondata.workerId+"&quot,&quot;"+count +"&quot;)'>添加数据</a>"
                    +"<a class='btn btn-default btn-default2' onclick='updateQualityInspectionCollectionAdditionPage(&quot;"+optiondata.workerCode+"&quot,&quot;"+optiondata.workerId+"&quot,&quot;"+count +"&quot;)'>查看修改</a></td></tr>";
                $("#qualityCollectTableRow").append(tableHtml);
            });
        }
    })
}

function initQualityCollectForm(workerId,workerCode) {
    var returnData=[];
    $.ajax({
        type:"GET",
        url: "/quality/collect/get_product_code",
        dataType:"json",
        data:{workerCode:workerCode,workerId:workerId},
        success: function (data) {
            returnData = data.data;
            console.log("initQualityCollectForm");
            console.log(data);
            $.each(data.data, function(index, optiondata) {
                $("#collectWorkerName").val(optiondata.workerName);
                $("#productNameSel").append('<option value="'+optiondata.productId+'">' + optiondata.productDetail + '</option>')
            });
        }
    })
    workerId = returnData.workerId;
    collectKilnNameSel();
    collectLevelNameSel();
    get_quality_category_questionType1();
    get_quality_category_questionType2();
    get_quality_category_questionType3();
    get_quality_category_questionType4();
    get_quality_category_questionType5();

    // submitQualityCollectionQuestion1();
}

function collectKilnNameSel() {
    $.ajax({
        type:"GET",
        url: "/quality/collect/get_kilnName_list",
        dataType:"json",
        async: false,
        success: function (data) {
            $("#kilinNameSel").attr("disabled", false);
            $.each(data.data, function(index, optiondata) {
                $("#kilinNameSel").append('<option value=' + optiondata.id + '>' + optiondata.kilnName + '</option>')
            });
        }
    })
}

function collectLevelNameSel() {
    $.ajax({
        type:"GET",
        url: "/quality/collect/get_rank_title",
        dataType:"json",
        async: false,
        success: function (data) {
            $("#levelNameSel").attr("disabled", false);
            console.log(data);
            $.each(data.data, function(index, optiondata) {
                $("#levelNameSel").append('<option value="'+optiondata.rankId+'">' + optiondata.rankIdName + '</option>')
            });
        }
    })
}





//问题详情
function get_quality_category_questionType1() {
    var questionCollectType = 1;
    $.ajax({
        type:"GET",
        url: "/quality/collect/get_quality_category",
        dataType:"json",
        async: false,
        data:{questionCollectType:questionCollectType},
        success: function (data) {
            $("#questionType1").html("");
            $.each(data.data, function(index, optiondata) {
                var coefxHtml = '';
                if(optiondata.collectType===1) {
                    coefxHtml = '<td class="coefficient-1">'
                        +'</td>';
                } else if(optiondata.collectType===2) {
                    coefxHtml = '<td class="coefficient-2">'
                        +'<input type="text" class="form-control">'
                        +'</td>';
                } else {
                    coefxHtml = '<td class="coefficient-1">'
                        +'</td>';
                }
                var questionHtml ='<tr>'
                    +'<td id="questionType1-'+optiondata.qualityId+'-'+optiondata.workerId+'">'+optiondata.qualityIdName+'</td>'
                    +'<td>'
                    +'<input type="text" class="form-control">'
                    +'</td>'
                    +coefxHtml
                    +'</tr>';
                $("#questionType1").append(questionHtml);
            });
        }
    })
}

function get_quality_category_questionType2() {
    var questionCollectType = 2;
    $.ajax({
        type:"GET",
        url: "/quality/collect/get_quality_category",
        dataType:"json",
        async: false,
        data:{questionCollectType:questionCollectType},
        success: function (data) {
            $("#questionType2").html("");
            $.each(data.data, function(index, optiondata) {
                var coefxHtml = '';
                if(optiondata.collectType===1) {
                    coefxHtml = '<td class="coefficient-1">'
                        +'</td>';
                } else if(optiondata.collectType===2) {
                    coefxHtml = '<td class="coefficient-2">'
                        +'<input type="text" class="form-control">'
                        +'</td>';
                } else {
                    coefxHtml = '<td class="coefficient-1">'
                        +'</td>';
                }
                var questionHtml ='<tr>'
                    +'<td id="questionType1-'+optiondata.qualityId+'-'+optiondata.workerId+'">'+optiondata.qualityIdName+'</td>'
                    +'<td>'
                    +'<input type="text" class="form-control">'
                    +'</td>'
                    +coefxHtml
                    +'</tr>';
                $("#questionType2").append(questionHtml);
            });
        }
    })
    var workerSel = get_user_category(2);
    $.each(workerSel, function(index, optiondata) {
        $("#collectQuestionWorkerSel2").append('<option>' + optiondata.userNameCode + '</option>')
    });
}

function get_quality_category_questionType3() {
    var questionCollectType = 3;
    $.ajax({
        type:"GET",
        url: "/quality/collect/get_quality_category",
        dataType:"json",
        async: false,
        data:{questionCollectType:questionCollectType},
        success: function (data) {
            console.log("get_quality_category_questionType3");
            console.log(data);
            $("#questionType3").html("");
            $.each(data.data, function(index, optiondata) {
                var coefxHtml = '';
                if(optiondata.collectType===1) {
                    coefxHtml = '<td class="coefficient-1">'
                        +'</td>';
                } else if(optiondata.collectType===2) {
                    coefxHtml = '<td class="coefficient-2">'
                        +'<input type="text" class="form-control">'
                        +'</td>';
                }else{
                    coefxHtml = '<td class="coefficient-1">'
                        +'</td>';
                }
                var questionHtml ='<tr>'
                    +'<td id="questionType3-'+optiondata.qualityId+'-'+optiondata.workerId+'">'+optiondata.qualityIdName+'</td>'
                    +'<td>'
                    +'<input type="text" class="form-control">'
                    +'</td>'
                    +coefxHtml
                    +'</tr>';
                $("#questionType3").append(questionHtml);
            });
        }
    })
    var workerSel = get_user_category(3);
    $.each(workerSel, function(index, optiondata) {
        $("#collectQuestionWorkerSel3").append('<option>' + optiondata.userNameCode + '</option>')
    });
}

function get_quality_category_questionType4() {
    var questionCollectType = 4;
    $.ajax({
        type:"GET",
        url: "/quality/collect/get_quality_category",
        dataType:"json",
        async: false,
        data:{questionCollectType:questionCollectType},
        success: function (data) {
            $("#questionType4").html("");
            $.each(data.data, function(index, optiondata) {
                var coefxHtml = '';
                if(optiondata.collectType===1) {
                    coefxHtml = '<td class="coefficient-1">'
                        +'</td>';
                } else if(optiondata.collectType===2) {
                    coefxHtml = '<td class="coefficient-2">'
                        +'<input type="text" class="form-control">'
                        +'</td>';
                } else {
                    coefxHtml = '<td class="coefficient-1">'
                        +'</td>';
                }
                var questionHtml ='<tr>'
                    +'<td id="questionType4-'+optiondata.qualityId+'-'+optiondata.workerId+'">'+optiondata.qualityIdName+'</td>'
                    +'<td>'
                    +'<input type="text" class="form-control">'
                    +'</td>'
                    +coefxHtml
                    +'</tr>';
                $("#questionType4").append(questionHtml);
            });
        }
    })
    var workerSel = get_user_category(4);
    $.each(workerSel, function(index, optiondata) {
        $("#collectQuestionWorkerSel4").append('<option>' + optiondata.userNameCode + '</option>')
    });
}

function get_quality_category_questionType5() {
    var questionCollectType = 5;
    $.ajax({
        type:"GET",
        url: "/quality/collect/get_quality_category",
        dataType:"json",
        async: false,
        data:{questionCollectType:questionCollectType},
        success: function (data) {
            $("#questionType5").html("");
            $.each(data.data, function(index, optiondata) {
                var coefxHtml = '';
                if(optiondata.collectType===1) {
                    coefxHtml = '<td class="coefficient-1">'
                        +'</td>';
                } else if(optiondata.collectType===2) {
                    coefxHtml = '<td class="coefficient-2">'
                        +'<input type="text" class="form-control">'
                        +'</td>';
                }else {
                    coefxHtml = '<td class="coefficient-1">'
                        +'</td>';
                }
                var questionHtml ='<tr>'
                    +'<td id="questionType5-'+optiondata.qualityId+'-'+optiondata.workerId+'">'+optiondata.qualityIdName+'</td>'
                    +'<td>'
                    +'<input type="text" class="form-control">'
                    +'</td>'
                    +coefxHtml
                    +'</tr>';
                $("#questionType5").append(questionHtml);
            });
        }
    })
    var workerSel = get_user_category(4);
    $.each(workerSel, function(index, optiondata) {
        $("#collectQuestionWorkerSel4").append('<option>' + optiondata.userNameCode + '</option>')
    });
}


//提交
function submitQualityCollectionQuestion1(collectId) {
    var qeustionType = $("#questionType1 > tr");
    // console.log(qeustionType);
    for(var i = 0; i < qeustionType.length; i++) {
        var infoTh = $(qeustionType[i].children[0]).attr("id").split("-");
        //需要输入的信息
        var questionType = 1;
        var userId =  infoTh[2];
        var collectType = $(qeustionType[i].children[2]).attr("class").split("-")[1];
        var questionId = infoTh[1];
        var questionName = $(qeustionType[i].children[0]).text();
        var quantity = $(qeustionType[i].children[1].children).val();
        var coefficient = $(qeustionType[i].children[2].children).val();
        $.ajax({
            type:"GET",
            url: "/quality/collect/addOrUpdate_question",
            dataType:"json",
            async: false,
            data:{collectId:collectId,questionType:questionType,userId:userId,collectType:collectType,questionId:questionId,questionName:questionName,quantity:quantity,coefficient:coefficient},
            success:function (data) {
                console.log(data.msg);
            }
        })
    }
}

function submitQualityCollectionQuestion2(collectId) {
    var qeustionType = $("#questionType2 > tr");
    // console.log(qeustionType);
    for(var i = 0; i < qeustionType.length; i++) {
        var infoTh = $(qeustionType[i].children[0]).attr("id").split("-");
        //需要输入的信息
        var questionType = 2;
        var userId =  infoTh[2];
        var collectType = $(qeustionType[i].children[2]).attr("class").split("-")[1];
        var questionId = infoTh[1];
        var questionName = $(qeustionType[i].children[0]).text();
        var quantity = $(qeustionType[i].children[1].children).val();
        var coefficient = $(qeustionType[i].children[2].children).val();
        var workName = $('#collectQuestionWorkerSel2').children('option:selected').text();
        $.ajax({
            type:"GET",
            url: "/quality/collect/addOrUpdate_question",
            dataType:"json",
            async: false,
            data:{collectId:collectId,workName:workName,questionType:questionType,userId:userId,collectType:collectType,questionId:questionId,questionName:questionName,quantity:quantity,coefficient:coefficient},
            success:function (data) {
                console.log(data.msg);
            }
        })
    }
}

function submitQualityCollectionQuestion3(collectId) {
    var qeustionType = $("#questionType3 > tr");
    // console.log(qeustionType);
    for(var i = 0; i < qeustionType.length; i++) {
        var infoTh = $(qeustionType[i].children[0]).attr("id").split("-");
        //需要输入的信息
        var questionType = 3;
        var userId =  infoTh[2];
        var collectType = $(qeustionType[i].children[2]).attr("class").split("-")[1];
        var questionId = infoTh[1];
        var questionName = $(qeustionType[i].children[0]).text();
        var quantity = $(qeustionType[i].children[1].children).val();
        var coefficient = $(qeustionType[i].children[2].children).val();
        var workName = $('#collectQuestionWorkerSel3').children('option:selected').text();
        $.ajax({
            type:"GET",
            url: "/quality/collect/addOrUpdate_question",
            dataType:"json",
            async: false,
            data:{collectId:collectId,workName:workName,questionType:questionType,userId:userId,collectType:collectType,questionId:questionId,questionName:questionName,quantity:quantity,coefficient:coefficient},
            success:function (data) {
                console.log(data.msg);
            }
        })
    }
}

function submitQualityCollectionQuestion4(collectId) {
    var qeustionType = $("#questionType4 > tr");
    // console.log(qeustionType);
    for(var i = 0; i < qeustionType.length; i++) {
        var infoTh = $(qeustionType[i].children[0]).attr("id").split("-");
        //需要输入的信息
        var questionType = 4;
        var userId =  infoTh[2];
        var collectType = $(qeustionType[i].children[2]).attr("class").split("-")[1];
        var questionId = infoTh[1];
        var questionName = $(qeustionType[i].children[0]).text();
        var quantity = $(qeustionType[i].children[1].children).val();
        var coefficient = $(qeustionType[i].children[2].children).val();
        var workName = $('#collectQuestionWorkerSel4').children('option:selected').text();
        $.ajax({
            type:"GET",
            url: "/quality/collect/addOrUpdate_question",
            dataType:"json",
            async: false,
            data:{collectId:collectId,workName:workName,questionType:questionType,userId:userId,collectType:collectType,questionId:questionId,questionName:questionName,quantity:quantity,coefficient:coefficient},
            success:function (data) {
                console.log(data.msg);
            }
        })
    }
}

function submitQualityCollectionQuestion5(collectId) {
    var qeustionType = $("#questionType5 > tr");
    // console.log(qeustionType);
    for(var i = 0; i < qeustionType.length; i++) {
        var infoTh = $(qeustionType[i].children[0]).attr("id").split("-");
        //需要输入的信息
        var questionType = 5;
        var userId =  infoTh[2];
        var collectType = $(qeustionType[i].children[2]).attr("class").split("-")[1];
        var questionId = infoTh[1];
        var questionName = $(qeustionType[i].children[0]).text();
        var quantity = $(qeustionType[i].children[1].children).val();
        var coefficient = $(qeustionType[i].children[2].children).val();
        var workName = $('#collectQuestionWorkerSel5').children('option:selected').text();
        console.log(workName);
        $.ajax({
            type:"GET",
            url: "/quality/collect/addOrUpdate_question",
            dataType:"json",
            async: false,
            data:{collectId:collectId,workName:workName,questionType:questionType,userId:userId,collectType:collectType,questionId:questionId,questionName:questionName,quantity:quantity,coefficient:coefficient},
            success:function (data) {
                console.log(data.msg);
            }
        })
    }
}

function addOrUpdateUserInfo(userId) {
    var userName = $("#collectWorkerName").val();
    var yaoluId = $('#kilinNameSel').children('option:selected').val();
    var productId=$('#productNameSel').children('option:selected').val();
    var rankId = $('#levelNameSel').children('option:selected').val();
    var quantity = $("#userQuantityInp").val();
    $.ajax({
        type:"GET",
        url: "/quality/collect/addOrUpdate",
        dataType:"json",
        async: false,
        data:{userId:userId,yaoluId:yaoluId,productId:productId,rankId:rankId,quantity:quantity},
        success:function (data) {
            console.log(data);
        }
    })
    
}


function updateCollectCount(workerId,count,collectId) {
    console.log("count:"+count);
    $.ajax({
        type:"GET",
        url: "/quality/collect/update_collect_count",
        dataType:"json",
        async: false,
        data:{workerId:workerId,count:count,collectId:collectId},
        success:function () {
            setTimeout('$("#form_box").mask("数据保存完成.");',1000);
            setTimeout(' $("#container").load("pages/dataCollection/qualityInspectionCollection/index.html", null, function() {getQualityCollectInfo();})',1001);
        }
    })
}

//获取Collect
function getCollectId(workerId,workerCode) {

    var rData = [];
    $.ajax({
        type:"GET",
        url: "/quality/collect/get_quality_collect_info",
        dataType:"json",
        async: false,
        data:{workerCode:workerCode,workerId:workerId},
        success:function (data) {
            rData = data.data;
            console.log(data);
        }
    })
    return rData.collectId;
}


//员工信息
function get_user_category(category) {
    var rData = [];
    $.ajax({
        type:"GET",
        url: "/quality/collect/get_user_category",
        dataType:"json",
        async: false,
        data:{category:category},
        success: function (data) {
            rData = data.data;
        }
    })
    return rData;
}

function updateCollection(workerId) {
    console.log("updateCollection");
    console.log(typeof (workerId));
    $.ajax({
        type:"GET",
        url: "/quality/collect/get_quality_collect_detail",
        dataType:"json",
        async: false,
        data:{workerId:workerId},
        success: function (data) {
            console.log(data);
        }
    })
}

