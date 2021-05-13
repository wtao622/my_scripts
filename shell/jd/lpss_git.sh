#!/bin/bash

# 脚本作者 ：  lpssxs
# 更新时间 ：  2021/5/13

cd  /root/jd/scripts

git add .

remark=$(date +"%Y-%m-%d %H:%M:%S")
git commit -m "更新时间：${remark}"

git pull origin master
git push origin master

echo "JD Scripts 同步成功~"
