#!/bin/sh -l

apt-get update
apt-get install git curl build-essential -y

curl -O https://dl.google.com/go/go1.14.3.linux-amd64.tar.gz
tar xvf go1.14.3.linux-amd64.tar.gz
chown -R root:root ./go
mv go /usr/local
export GOPATH=$HOME/work
export PATH=$PATH:/usr/local/go/bin:$GOPATH/bin

git clone https://github.com/gohugoio/hugo.git
cd hugo
go install --tags extended
hugo --minify