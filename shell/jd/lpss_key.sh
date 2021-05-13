
#!/usr/bin/env bash

# 脚本作者 ：  lpssxs
# 更新时间 ：  2021/5/13
# 脚本功能 ：  更新 JD V4 Key


my_ver_str=`cat config.sh | grep "Version"`

my_ver_id=${my_ver_str: 13: 2}

target_ver_id="v4"

echo "$my_ver_id"

if [ $target_ver_id = $my_ver_id ];then



	wget -q --no-check-certificate https://github.com/forpw2009/my_scripts/raw/main/my_key/my_key.tar.gz -O /jd/my_key.tar.gz

	tar -xzvf /jd/my_key.tar.gz 

	cp -rf /jd/my_key/config /root/.ssh/
	cp -rf /jd/my_key/jd_scripts /root/.ssh/
	cp -rf /jd/my_key/jd_shell  /root/.ssh/
	cp -rf /jd/my_key/known_hosts  /root/.ssh/

	echo "JD V4 Key 已修复 ，请手动执行 jup 命令进行测试 "


else 

	echo "当前JD Docker 项目版本太旧啦，请更新 V4 版本后再执行当前脚本~ "
	
fi 