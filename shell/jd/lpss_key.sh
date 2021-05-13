
#!/usr/bin/env bash

# 脚本作者 ：  lpssxs
# 更新时间 ：  2021/5/13
# 脚本功能 ：  更新 JD V4 Key

wget http://pan.lpssxs.com/backup/my_key.tar.gz -O /jd/my_key.tar.gz

tar -xzvf /jd/my_key.tar.gz 

cp -rf /jd/my_key/config /root/.ssh/
cp -rf /jd/my_key/jd_scripts /root/.ssh/
cp -rf /jd/my_key/jd_shell  /root/.ssh/
cp -rf /jd/my_key/known_hosts  /root/.ssh/

echo "JD V4 Key 已修复 ，请手动执行 jup 命令进行测试 "