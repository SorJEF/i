#!/bin/sh
echo "Update workflow"
cd /project

echo "Building workflow project"
mvn install -DskipTests -B

echo "Shutdown Tomcat for safer deploy"
echo "May throw java.net.ConnectException: Connection refused if Tomcat isn't yet running - it's ok, just ignore it. Will fix later."
$TOMCAT_HOME/bin/shutdown.sh

echo "Copy WAR to webapps dir"
TOMCAT_WEBAPPS_DIR=$TOMCAT_HOME/webapps
cp /project/$1 $TOMCAT_WEBAPPS_DIR

echo "Start Tomcat"
$TOMCAT_HOME/bin/startup.sh
