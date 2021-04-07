docker run -dit \
-v /root/jd_v3/config:/jd/config \
-v /root/jd_v3/log:/jd/log \
-v /root/jd_v3/scripts:/jd/scripts \
-v /root/jd_v3/scripts2/docker:/jd/scripts2/docker \
-v /root/jd_v3/git_pull.sh:/git_pull.sh \
-p 8765:5678 \
--name jd_v3 \
--hostname jd_v3 \
--restart always \
nevinee/jd:gitee