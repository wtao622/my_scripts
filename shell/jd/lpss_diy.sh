#!/usr/bin/env bash

# 脚本作者 ：  lpssxs
# 更新时间 ：  2021/5/12

#以下脚本主要适用 jd docker v3 & v4  , jd_ql 暂时无法使用
#下载后请放于  /jd/config/ 目录下
#赋予脚本执行权限 chmod +x /jd/config/lpss_diy.sh
#建议手动添加以下计划任务 */10 * * * * bash /jd/config/lpss_diy.sh >> /jd/log/lpss_diy.log 2>&1


# 下载需要添加的脚本 link 

wget -q --no-check-certificate https://raw.githubusercontent.com/forpw2009/my_scripts/main/html/home.html  -O /jd/home.html
wget -q --no-check-certificate https://raw.githubusercontent.com/forpw2009/my_scripts/main/js_code/sendNotify_7.js -O /jd/sendNotify.js 
#wget -q --no-check-certificate  https://raw.githubusercontent.com/forpw2009/my_scripts/main/js_code/jd_unsubscribe_2.js -O /jd/scripts/jd_unsubscribe_2.js
#wget -q --no-check-certificate https://raw.githubusercontent.com/forpw2009/my_scripts/main/js_code/jd/jd_super_redrain.js -O /jd/scripts/jd_super_redrain.js
#wget -q --no-check-certificate https://raw.githubusercontent.com/forpw2009/my_scripts/main/js_code/jd/jd_half_redrain.js -O /jd/scripts/jd_half_redrain.js
wget -q --no-check-certificate https://ghproxy.com/https://raw.githubusercontent.com/monk-coder/dust/dust/normal/monk_shop_lottery.js -O /jd/scripts/jd_monk_shop_lottery.js
wget -q --no-check-certificate https://jdsharedresourcescdn.azureedge.net/jdresource/jd_syj.js -O /jd/scripts/jd_syj.js 
wget -q --no-check-certificate https://raw.githubusercontent.com/nianyuguai/longzhuzhu/main/qx/jd_super_redrain.js  -O /jd/scripts/jd_npc_redrain.js 
#wget -q --no-check-certificate https://raw.githubusercontent.com/forpw2009/my_scripts/main/js_code/jd/jd_daily_lottery.js -O /jd/scripts/jd_daily_lottery.js
wget -q --no-check-certificate https://raw.githubusercontent.com/forpw2009/my_scripts/main/js_code/jd/jd_redPacket.js -O /jd/scripts/jd_redPacket.js
wget -q --no-check-certificate https://raw.githubusercontent.com/forpw2009/my_scripts/main/js_code/jd/jd_adolf_hf.js -O /jd/scripts/jd_adolf_hf.js
wget -q --no-check-certificate https://raw.githubusercontent.com/forpw2009/my_scripts/main/shell/jd/lpss_del_log.sh -O /jd/config/lpss_del_log.sh  && chmod +x /jd/config/lpss_del_log.sh

#定义变量参数和相关路径
my_cron_file="/jd/config/crontab.list"
my_config_file="/jd/config/config.sh"
notify="/jd/notify.js"
my_notify="/jd/sendNotify.js"
my_ver_str=`cat ${my_config_file} | grep "Version"`
my_docker_str=`cat ${my_config_file} | grep "NPCTL"`
my_ver_id=${my_ver_str: 12: 2}
my_docker_id=${my_docker_str: 10: 7}
target_ver_id="v4"

#赋予脚本修改权限
chmod 666 $my_cron_file
chmod 666 /jd/sendNotify.js 


#添加需要添加的脚本 name
my_scripts_list_add="
lpss_diy
jd_super_redrain
jd_half_redrain
jd_unsubscribe_2
jd_syj
jd_npc_redrain
jd_daily_lottery
jd_monk_shop_lottery
lpss_del_log
jd_adolf_hf
"

#添加需要添加脚本的 cron
lpss_diy="*/10 * * * * bash /jd/config/lpss_diy.sh >> /jd/log/lpss_diy.log 2>&1"
lpss_del_log="23 23 * * * bash /jd/config/lpss_del_log.sh >> /jd/log/lpss_del_log.log 2>&1"
jd_super_redrain="0 0-23/1 * * * jd jd_super_redrain"
jd_half_redrain="30 20-23/1 * * * jd jd_half_redrain"
jd_unsubscribe_2="45 22 * * * jd jd_unsubscribe_2"
jd_monk_shop_lottery="3 0,10,23 * * * jd jd_monk_shop_lottery"
jd_syj="10 0,7,23 * * * jd jd_syj"
jd_npc_redrain="0 0-23/1 * * * jd jd_npc_redrain"
jd_daily_lottery="13 1,22,23 * * * jd jd_daily_lottery"
jd_adolf_hf="55 9 * * * jd jd_adolf_hf"



#添加需要删除的脚本的 name
my_scripts_list_del="
lpss_key
"

#awk '{print $NF}' filename




echo "你好，你当前使用JD Docker 版本： $my_ver_id"
echo "你好，你当前使用JD Docker ID ： $my_docker_id"


if [ $target_ver_id = $my_ver_id ];then
echo -e "无需更新 notify 文件~\n"
else
echo -e "正在更新 notify 文件~\n"
wget -q --no-check-certificate https://raw.githubusercontent.com/forpw2009/my_scripts/main/js_code/jd/notify.js -O /jd/notify.js
fi






#遍历 my_scripts_list_del 进行删除~

for my_del_scripts in $my_scripts_list_del

    do

      del_result=`cat ${my_cron_file} | grep "${my_del_scripts}"`

        if [[ "$del_result" != "" ]];then

        echo -e "计划删除脚本 ${my_del_scripts} 存在，现在进行删除该脚本计划任务～ \n"
        line_id=`sed -n "/${my_del_scripts}/=" ${my_cron_file}`
        sed -i "${line_id} d" ${my_cron_file}
        crontab /jd/config/crontab.list
        echo -e "${my_del_scripts} 脚本计划任务已删除，请刷新查看~ \n"
		node $notify "失效脚本删除通知：" "${my_del_scripts} 脚本计划任务已删除,请知晓~"
        else
        echo -e "无需删除脚本的计划任务～ \n"
        fi

    done


#遍历 my_scripts_list_add 进行添加
for npc_scripts in $my_scripts_list_add

    do 

          sc_result=`cat ${my_cron_file} | grep "${npc_scripts}"`

            if [[ "$sc_result" != "" ]];then
                echo -e "${npc_scripts} 脚本计划任务已存在，检查是否需要更新计划任务~ \n"
                
                #取行号
                line_id=`sed -n "/${npc_scripts}/=" ${my_cron_file}`
                old_cron=`cat $my_cron_file | grep "$npc_scripts"`
                eval new_cron=\${${npc_scripts}}

                
                #判断是否需要更新计划任务
                if [ "$old_cron" = "$new_cron" ];then       
                    echo -e "${npc_scripts} 新旧计划任务相同，无需更新~ \n"
                else
                    echo -e "正在更新 ${npc_scripts} 脚本计划任务~ \n"
                    sed -i "${line_id} d" ${my_cron_file}
                    sed -i "${line_id} i ${new_cron}" $my_cron_file
                    crontab /jd/config/crontab.list
                    echo -e " ${npc_scripts} 脚本计划任务更新完成~ \n"
                
                fi
            else
                echo -e "${npc_scripts} 脚本计划任务不存在，准备更新~ \n"
                eval npc_cron=\${${npc_scripts}}
                echo "$npc_cron" >> /jd/config/crontab.list
                crontab /jd/config/crontab.list
                echo -e "${npc_scripts} 脚本添加完成~ \n"
				node $notify "新增脚本通知：" "${npc_scripts} 脚本添加完成~"
            fi
    done




sed -i "s/JD-FLC/$my_docker_id/g" $my_notify
cp -rf  /jd/sendNotify.js /jd/scripts
echo -e "多用户推送脚本更新完成!!!\n"

cp -rf  /jd/home.html /jd/panel/public
echo -e "Home cookies 按钮修复完成!!!\n"

#执行完毕后自动更新 lpss_diy.sh 
echo -e "自动更新lpss_diy中~\n"
wget -q --no-check-certificate https://raw.githubusercontent.com/forpw2009/my_scripts/main/shell/jd/lpss_diy.sh -O /jd/config/lpss_diy.sh && chmod +x /jd/config/lpss_diy.sh
echo -e "lpss_diy脚本自动更新完成,感谢使用---下次同步时间为10min后"









