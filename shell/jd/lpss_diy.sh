#!/usr/bin/env bash

# 脚本作者 ：  lpssxs
# 更新时间 ：  2021/5/10 

#以下脚本主要适用 jd docker v3 & v4  
#下载后请放于  /jd/config/ 目录下
#赋予脚本执行权限 chmod +x /jd/config/lpss_diy.sh
#建议手动添加以下计划任务 */10 * * * * bash /jd/config/lpss_diy.sh >/dev/null 2>&1

# 下载需要添加的脚本 link 

#wget -q --no-check-certificate https://raw.githubusercontent.com/forpw2009/my_scripts/main/js_code/sendNotify_5.js -O /jd/sendNotify.js 
wget -q --no-check-certificate  https://raw.githubusercontent.com/forpw2009/my_scripts/main/js_code/jd_unsubscribe_2.js -O /jd/scripts/jd_unsubscribe_2.js
wget -q --no-check-certificate https://raw.githubusercontent.com/forpw2009/my_scripts/main/js_code/jd/jd_super_redrain.js -O /jd/scripts/jd_super_redrain.js
wget -q --no-check-certificate https://raw.githubusercontent.com/forpw2009/my_scripts/main/js_code/jd/jd_half_redrain.js -O /jd/scripts/jd_half_redrain.js
wget -q --no-check-certificate https://raw.githubusercontent.com/monk-coder/dust/dust/car/adolf_ETIP.js -O /jd/scripts/jd_adolf_ETIP.js


#添加需要添加的脚本 name

my_scripts_list_add="
jd_super_redrain
jd_half_redrain
jd_unsubscribe_2
jd_adolf_ETIP
"

#添加需要添加脚本的 cron
my_cron_list_add=(
"0 0-23/1 * * * jd jd_super_redrain"
"30 20-23/1 * * * jd jd_half_redrain"
"45 22 * * * jd jd_unsubscribe_2"
"15 8 9-31 5 * jd jd_adolf_ETIP"
)


#添加需要删除的脚本的 name
my_scripts_list_del=""

#遍历 my_scripts_list_add 进行添加
for npc_scripts in $my_scripts_list_add

    do 

         sc_result=$(cat /jd/config/crontab.list | grep "${npc_scripts}")

            if [[ "$sc_result" != "" ]];then
                echo -e "${npc_scripts} 脚本计划任务已存在，无需更新～ \n"
            else
                echo -e "${npc_scripts} 脚本计划任务不存在，准备更新～ \n"

                #遍历 my_cron_list 添加对应脚本的 cron 

                for npc_cron in ${my_cron_list_add[@]}
                do
                     cr_result=$(echo $npc_cron | grep "${npc_scripts}")
                        if [[ "$cr_result" != "" ]];then
                            echo -e "${npc_scripts} 脚本计划任务正在添加～ \n"
                            echo "$npc_cron" >> /jd/config/crontab.list
                            crontab /jd/config/crontab.list
                            echo -e "${npc_scripts} 脚本添加完成～ \n"
                        else
                            echo -e "请在 my_cron_list 添加 ${npc_scripts} 脚本的计划任务～ \n"
                        fi 
                done

            fi
    done

    #遍历 my_scripts_list_del 进行删除





cp -rf  /jd/sendNotify.js /jd/scripts
echo -e "多用户推送脚本更新完成!!!\n"

cp -rf  /jd/home.html /jd/panel/public
echo -e "Home cookies 按钮修复完成!!!\n"

#执行完毕后自动更新 lpss_diy.sh 
echo -e "自动更新 lpss_diy.sh 中～～～ \n"
wget -q --no-check-certificate https://raw.githubusercontent.com/forpw2009/my_scripts/main/shell/jd/lpss_diy.sh -O /jd/config/lpss_diy.sh && chmod +x /jd/config/lpss_diy.sh
echo -e "lpss_diy.sh 自动更新完成，感谢使用 (下次更新时间为10min后) ～ \n"





