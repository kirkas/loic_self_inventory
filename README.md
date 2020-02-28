# ssh to prod (need key)
ssh root@167.71.47.100

# Setup
cd ./deploy && mup setup

# Setup
cd ./deploy && mup deploy
oldpassword= "3oPi*ZxLYK@CcMm-i@aC"
newpassword= "3oPiZxLYKCcMmiaC"

db.changeUserPassword("root","3oPiZxLYKCcMmiaC")

db.createUser({user:"root", pwd:"3oPiZxLYKCcMmiaC", roles:[{role:"root", db:"admin"}]})

mongo -u "root" -p --authenticationDatabase "admin"


mongodb://http://selfinventory.me/:27017/


mongodb://root:3oPiZxLYKCcMmiaC@selfinventory.me:27017/meteor


server {
    listen 80;
    server_name selfinventory.me;
    access_log /var/log/nginx/app.dev.access.log;
    error_log /var/log/nginx/app.dev.error.log;
        location / {
            proxy_pass http://167.71.47.100:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header X-Forwarded-For $remote_addr;
        }

}


systemctl stop mongodb.service
systemctl disable mongodb.service
rm /etc/systemd/system/mongodb.service
rm /etc/systemd/system/mongodb.service
systemctl daemon-reload
systemctl reset-failed



# redirect www to non-www
server {
    listen 80;
    # to redirect all subdomains use *.yourdomain.com instead of www.yourdomain.com
    server_name www.selfinventory.me/;
    return 301 $scheme://selfinventory.me/$request_uri;
}


server {
    listen 80;
    server_name selfinventory.me;
    access_log /var/log/nginx/app.dev.access.log;
    error_log /var/log/nginx/app.dev.error.log;
        location / {
            proxy_pass http://XXX.XXX.XX.XXX:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header X-Forwarded-For $remote_addr;
        }

}