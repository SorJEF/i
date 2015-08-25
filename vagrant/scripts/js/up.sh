echo "starting js application"
cd /project
cd $1
echo "npm install ..." 
npm install
echo "bower install ..." 
bower install --config.interactive=false

echo "run grunt serve in screen, to restore type 'screen -r app'" 
screen -S app -d -m grunt serve

