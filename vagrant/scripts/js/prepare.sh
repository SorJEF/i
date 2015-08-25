echo "Preparing Node.js Environment"

if ! dpkg --list nodejs | egrep -q ^ii; 
then
    echo "add node js PPA  ..."
    curl -sL https://deb.nodesource.com/setup | sudo bash -      
fi

apt-get install -y nodejs g++ screen

echo "updating npm"
npm install npm -g
npm --version
echo "updating npm global modules"
npm update -g
echo "npm installing bower"
npm install -g bower
echo "npm installing grunt"
npm install -g grunt-cli
echo "npm installing yo"
npm install -g yo
echo "npm installing node-inspector"
npm install -g node-inspector --unsafe-perm

echo "copy dev ssl certificate/key to /sybase/cert/ folder"
mkdir -p /sybase/cert/
cp /project/vagrant/cert/dev_ssl.crt /sybase/cert/server.crt
cp /project/vagrant/cert/dev_ssl.key /sybase/cert/server.key

echo "creating local config for the application"
cp /project/vagrant/config/$1.env.js /project/$1/server/config/local.env.js
