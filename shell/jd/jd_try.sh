#!/usr/bin/env bash

# 脚本作者 ：  lpssxs
# 更新时间 ：  2021/5/12
# 主要功能 ： 更新 jd_try 项目ck



wget -q --no-check-certificate https://raw.githubusercontent.com/forpw2009/my_scripts/main/shell/list/jd_try_ck.list  -O /jd/jd_try_ck.list

my_ck_file="/jd/jd_try_ck.list"
my_config_file="/jd/config/config.sh"


sed -i '/Cookie/d' $my_config_file

my_ck_list=`cat "$my_ck_file"`


while read line || [[ -n ${line} ]] 

	do
		  echo "正在插入以下内容 ：${line}"
		  sed -i "20i ${line}" $my_config_file
		  
	done < $my_ck_file


echo "jd_try ck 更新成功"

