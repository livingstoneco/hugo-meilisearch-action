#!/bin/sh -l

sudo apt update
sudo apt install git

curl -O https://dl.google.com/go/go1.14.3.linux-amd64.tar.gz
tar xvf go1.14.3.linux-amd64.tar.gz
sudo chown -R root:root ./go
sudo mv go /usr/local
export GOPATH=$HOME/work
export PATH=$PATH:/usr/local/go/bin:$GOPATH/bin

git clone https://github.com/gohugoio/hugo.git
cd hugo
go install --tags extended