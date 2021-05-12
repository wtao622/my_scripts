#!/usr/bin/env bash

# 脚本作者 ：  lpssxs
# 更新时间 ：  2021/5/13

#更新日至:
# - 5/11 : 完成自动添加脚本和计划任务
# - 5/12 : 增加自动删除失效脚本功能
# - 5/13 : 增加jd_try试用脚本模式 

#以下脚本主要适用 jd docker v3 & v4  , jd_ql 暂时无法使用
#下载后请放于  /jd/config/ 目录下
#赋予脚本执行权限 chmod +x /jd/config/lpss_diy.sh
#建议手动添加以下计划任务 */10 * * * * bash /jd/config/lpss_diy.sh >> /jd/log/lpss_diy.log 2>&1


# 下载需要添加的脚本 link 

#wget -q --no-check-certificate https://raw.githubusercontent.com/forpw2009/my_scripts/main/html/home.html  -O /jd/home.html
#wget -q --no-check-certificate https://raw.githubusercontent.com/forpw2009/my_scripts/main/js_code/sendNotify_7.js -O /jd/sendNotify.js 
wget -q --no-check-certificate  https://raw.githubusercontent.com/forpw2009/my_scripts/main/js_code/jd_unsubscribe_2.js -O /jd/scripts/jd_unsubscribe_2.js
wget -q --no-check-certificate https://raw.githubusercontent.com/forpw2009/my_scripts/main/js_code/jd/jd_super_redrain.js -O /jd/scripts/jd_super_redrain.js
wget -q --no-check-certificate https://raw.githubusercontent.com/forpw2009/my_scripts/main/js_code/jd/jd_half_redrain.js -O /jd/scripts/jd_half_redrain.js
wget -q --no-check-certificate https://raw.githubusercontent.com/monk-coder/dust/dust/car/adolf_ETIP.js -O /jd/scripts/jd_adolf_ETIP.js
wget -q --no-check-certificate https://jdsharedresourcescdn.azureedge.net/jdresource/jd_syj.js -O /jd/scripts/jd_syj.js 
wget -q --no-check-certificate https://raw.githubusercontent.com/nianyuguai/longzhuzhu/main/qx/jd_super_redrain.js  -O /jd/scripts/jd_npc_redrain.js 
wget -q --no-check-certificate https://raw.githubusercontent.com/forpw2009/my_scripts/main/js_code/jd/jd_daily_lottery.js -O /jd/scripts/jd_daily_lottery.js 
wget -q --no-check-certificate https://raw.githubusercontent.com/forpw2009/my_scripts/main/js_code/jd/jd_try.js -O /jd/scripts/jd_try.js 

wget -q --no-check-certificate https://raw.githubusercontent.com/forpw2009/my_scripts/main/shell/jd/jd_try.sh -O /jd/config/jd_ck.sh

#赋予脚本修改权限
my_sendNotify_path="/jd/scripts/sendNotify.js"
my_cron_file="/jd/config/crontab.list"
chmod 666 $my_cron_file

#添加需要添加的脚本 name
my_scripts_list_add="
lpss_diy
jd_try
jd_ck
"

#添加需要添加脚本的 cron
lpss_diy="*/10 * * * * bash /jd/config/lpss_diy_test.sh >> /jd/log/lpss_diy_test.log 2>&1"
jd_super_redrain="0 0-23/1 * * * jd jd_super_redrain"
jd_half_redrain="30 20-23/1 * * * jd jd_half_redrain"
jd_unsubscribe_2="45 22 * * * jd jd_unsubscribe_2"
jd_adolf_ETIP="15 8 9-31 5 * jd jd_adolf_ETIP"
jd_syj="10 0,7,23 * * * jd jd_syj"
jd_npc_redrain="0 0-23/1 * * * jd jd_npc_redrain"
jd_daily_lottery="13 1,22,23 * * * jd jd_daily_lottery"
jd_try="11 0 * * * jd jd_try"
jd_ck="8 0 * * * bash /jd/config/jd_ck.sh >> /jd/log/jd_ck.log 2>&1"


#添加需要删除的脚本的 name
my_scripts_list_del="
jd_super_redrain_2
jd_syj_2
"

#awk '{print $NF}' filename

#多个JD项目区分flag

my_jd_docker_name="JD-FLC"
echo "目标容器 flag 是 ：$my_jd_docker_name"

now_jd_docker_name=`cat ${my_sendNotify_path} | grep "${my_jd_docker_name}"`
echo "当前容器 flag 是 ：$now_jd_docker_name"

rework_result=`echo ${now_jd_docker_name} | grep "${my_jd_docker_name}"`



#遍历 my_scripts_list_del 进行删除~

for my_del_scripts in $my_scripts_list_del

    do

      del_result=`cat ${my_cron_file} | grep "${my_del_scripts}"`

        if [[ "$del_result" != "" ]];then

        echo -e "计划删除脚本 ${my_del_scripts} 存在，现在进行删除该脚本计划任务～ \n"
        line_id=`sed -n "/${my_del_scripts}/=" ${my_cron_file}`
        sed -i "${line_id} d" ${my_cron_file}
        crontab /jd/config/crontab.list
        echo -e "${my_del_scripts} 脚本计划任务已删除，请刷新查看～ \n"
        else
        echo -e "无需删除脚本的计划任务～ \n"
        fi

    done


#遍历 my_scripts_list_add 进行添加
for npc_scripts in $my_scripts_list_add

    do 

          sc_result=`cat ${my_cron_file} | grep "${npc_scripts}"`

            if [[ "$sc_result" != "" ]];then
                echo -e "${npc_scripts} 脚本计划任务已存在，检查是否需要更新计划任务～ \n"
                
                #取行号
                line_id=`sed -n "/${npc_scripts}/=" ${my_cron_file}`
                old_cron=`cat $my_cron_file | grep "$npc_scripts"`
                eval new_cron=\${${npc_scripts}}

                
                #判断是否需要更新计划任务
                if [ "$old_cron" = "$new_cron" ];then       
                    echo -e "${npc_scripts} 新旧计划任务相同，无需更新～ \n"
                else
                    echo -e "正在更新 ${npc_scripts} 脚本计划任务 ～ \n"
                    sed -i "${line_id} d" ${my_cron_file}
                    sed -i "${line_id} i ${new_cron}" $my_cron_file
                    crontab /jd/config/crontab.list
                    echo -e " ${npc_scripts} 脚本计划任务更新完成 ～ \n"
                
                fi
            else
                echo -e "${npc_scripts} 脚本计划任务不存在，准备更新～ \n"
                eval npc_cron=\${${npc_scripts}}
                echo "$npc_cron" >> /jd/config/crontab.list
                crontab /jd/config/crontab.list
                echo -e "${npc_scripts} 脚本添加完成～ \n"
            fi
    done





cp -rf  /jd/sendNotify.js /jd/scripts
echo -e "多用户推送脚本更新完成!!!\n"

cp -rf  /jd/home.html /jd/panel/public
echo -e "Home cookies 按钮修复完成!!!\n"

#执行完毕后自动更新 lpss_diy.sh 
echo -e "自动更新 lpss_diy_test 中～～～ \n"
wget -q --no-check-certificate https://raw.githubusercontent.com/forpw2009/my_scripts/main/shell/jd/lpss_diy_test.sh -O /jd/config/lpss_diy_test.sh && chmod +x /jd/config/lpss_diy_test.sh
echo -e "lpss_diy_test 测试版脚本自动更新完成，感谢使用 (下次更新时间为10min后) ～ \n"







