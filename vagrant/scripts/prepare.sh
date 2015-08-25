#!/bin/sh

echo "Initial machine preparation"

echo "Update apt-get repository indices"
apt-get update

echo "installing git"
apt-get install -y git

echo "Initial Prepartion Completed"
