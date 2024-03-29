
##############################################################################
#                                                                            #
#                          自动拉取各个作者库内指定脚本
#                   把此diy.sh放入config即可,会自动同步最新脚本
#                    如有好用的脚本或者脚本更新不及时请@qiao112
#                              2021年3月17日10:11
#                                                                            #
##############################################################################

############################## 作者名称 ##############################
author_list="
i-chenzhe
whyour
moposmall
qq34347476
ZCY01
cui521
"
######################################################################

############################## 维护:i-chenzhe ##############################
# 库地址:https://github.com/i-chenzhe/qx
scripts_base_url_1=https://github.com/sngxpro/AutoSyncScript/
my_scripts_list_1="
z_wish.js
z_sister.js
z_super5g.js
z_xmf.js
z_unionPoster.js
z_oneplus.js
z_mother_jump.js
z_marketLottery.js
z_lenovo.js
jd_xmf.js
jd_shakeBean.js
jd_shake.js
jd_getFanslove.js
jd_fanslove.js
jd_entertainment.js

"
#^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

############################## 维护:whyour ##############################
# 库地址:https://github.com/whyour/hundun/tree/master/quanx
scripts_base_url_2=https://ghproxy.com/https://raw.githubusercontent.com/whyour/hundun/master/quanx/
my_scripts_list_2="
jd_zjd_tuan.js
jd_zjd.js

"
#^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

############################## 维护:moposmall ##############################
# 库地址:https://github.com/moposmall/Script/tree/main/Me
scripts_base_url_3=https://ghproxy.com/https://raw.githubusercontent.com/moposmall/Script/main/Me/
my_scripts_list_3="
jx_cfd_exchange.js

"
#^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

############################## 维护:qq34347476 ##############################
# 库地址:https://github.com/qq34347476/js_script
scripts_base_url_4=https://ghproxy.com/https://raw.githubusercontent.com/qq34347476/js_script/master/scripts/
my_scripts_list_4="
format_share_jd_code.js

"
#^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

############################## 维护:ZCY01 ##############################
# 库地址:https://github.com/ZCY01/daily_scripts/tree/main/jd
scripts_base_url_5=https://ghproxy.com/https://raw.githubusercontent.com/ZCY01/daily_scripts/main/jd/
my_scripts_list_5="
jd_priceProtect.js

"
#^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

############################## 维护:cui521 ##############################
# 库地址:https://github.com/Hydrahail-Johnson/diy_scripts
scripts_base_url_6=https://ghproxy.com/https://raw.githubusercontent.com/cui521/jdqd/main/
my_scripts_list_6="
DIY_shopsign.js

"
#^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

############################ 是否强制替换脚本的定时 ############################
# 设为"ture"时强制替换脚本的定时，设为"false"则不替换脚本的定时...
Enablerenew="false"

############################## 随机函数 ##############################
rand(){
    min=$1
    max=$(($2-$min+1))
    num=$(cat /proc/sys/kernel/random/uuid | cksum | awk -F ' ' '{print $1}')
    echo $(($num%$max+$min))
}

############################## 手动删除失效脚本 ##############################
cd $ScriptsDir
# rm -rf qq34347476_getShareCode_format.js

############################## 开始下载脚本 ##############################
index=1
for author in $author_list
do
  echo -e "######################### 开始下载 $author 的脚本 #########################"
  # 下载my_scripts_list中的每个js文件，重命名增加前缀"作者昵称_"，增加后缀".new"
  eval scripts_list=\$my_scripts_list_${index}
  eval url_list=\$scripts_base_url_${index}
  for js in $scripts_list
  do
    eval url=$url_list$js
    eval name=$author"_"$js
    echo $name
    wget -q --no-check-certificate $url -O $name.new

    # 如果上一步下载没问题，才去掉后缀".new"，如果上一步下载有问题，就保留之前正常下载的版本
    if [ $? -eq 0 ]; then
      mv -f $name.new $name
      echo -e "$name 更新成功!!!"
	  croname=`echo "$name"|awk -F\. '{print $1}'`
	  script_date=`cat  $name|grep "http"|awk '{if($1~/^[0-59]/) print $1,$2,$3,$4,$5}'|sort |uniq|head -n 1`
	  [ -z "${script_date}" ] && script_date=`cat  $name|grep -Eo "([0-9]+|\*) ([0-9]+|\*) ([0-9]+|\*) ([0-9]+|\*) ([0-9]+|\*)"|sort |uniq|head -n 1`
	  if [ -z "${script_date}" ]; then
	    cron_min=$(rand 1 59)
	    cron_hour=$(rand 7 9)
      [ $(grep -c "$croname" ${ConfigDir}/crontab.list) -eq 0 ] && sed -i "/hangup/a${cron_min} ${cron_hour} * * * bash jd $croname"  ${ConfigDir}/crontab.list
	  else
	    check_existing_cron=`grep -c "$croname" /jd/config/crontab.list`
	    echo $name "开始添加定时..."
	    if [ "${check_existing_cron}" -eq 0 ]; then
	      sed -i "/hangup/a${script_date} bash jd $croname"  /jd/config/crontab.list
	      echo -e "$name 成功添加定时!!!\n"
	    else
	      if [ "${Enablerenew}" = "true" ]; then
	      	echo -e "检测到"$name"定时已存在开始替换...\n"
	        grep -v "$croname" /jd/config/crontab.list > output.txt
		      mv -f output.txt /jd/config/crontab.list
		      sed -i "/hangup/a${script_date} bash jd $croname"  /jd/config/crontab.list
	        echo -e "替换"$name"定时成功!!!"
	      else
	        echo -e "$name 存在定时,已选择不替换...\n"
	      fi
	    fi
	  fi
    else
      [ -f $name.new ] && rm -f $name.new
      echo -e "$name 脚本失效,已删除脚本...\n"
      croname=`echo "$name"|awk -F\. '{print $1}'`
      check_existing_cron=`grep -c "$croname" /jd/config/crontab.list`
      if [ "${check_existing_cron}" -ne 0 ]; then
        grep -v "$croname" /jd/config/crontab.list > output.txt
        mv -f output.txt /jd/config/crontab.list
        echo -e \b"检测到"$name"残留文件..."
        rm -f ${name:-default}
        echo -e "开始清理"$name"残留文件..."
        cd $LogDir
        rm -rf ${croname:-default}
        echo -e "清理"$name"残留文件完成!!!\n"
        cd $ScriptsDir
      fi
    fi
  done
  index=$[$index+1]
done



    for npc_scripts in $my_scripts_list_del

        do 

            dl_result=$(cat /jd/config/crontab.list | grep "${npc_scripts}")

            if [[ "$dl_result" != "" ]];then
                echo -e "准备删除 ${npc_scripts} 计划任务～ \n"
                grep -v "$npc_scripts" /jd/config/crontab.list > /jd/config/crontab.list
                crontab /jd/config/crontab.list
                echo -e " ${npc_scripts} 脚本计划任务删除完成～ \n"
            else
                echo -e "crontab.list 文件中无该计划任务，无需删除～ \n"
            fi
        done
