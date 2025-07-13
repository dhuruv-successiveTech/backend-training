## Backend Training
This repository contains step to install Node.Js on Linux system
Node.js is a powerful, open-source JavaScript runtime built on Chrome's V8 engine that allows you to run JavaScript code outside the browser, typically on the server.
It’s widely used to build fast, scalable backend applications and APIs thanks to its event-driven, non-blocking I/O model.



## 1.Run the following commands
bash
sudo apt update

sudo apt install curl

## 2.Add NodeSource Repository for Node.js LTS

curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -


## 3.Install Node.js and npm
   sudo apt install nodejs

# 4. Verify Installation
    node -v
    npm -v



# Postman Installation Guide

This guide provides step-by-step instructions for installing and setting up the latest stable version of **Postman** on a Linux system.

## Prerequisites

- A Linux-based operating system (e.g., Ubuntu)
- Administrative (sudo) privileges
- Internet connection

---

## Steps to Install Postman

### 1. Open a Terminal

Launch your terminal application.

### 2. Add the Postman Repository

sudo sh -c 'echo "deb https://dl.pstmn.io/download/latest/linux64" > /etc/apt/sources.list.d/postman.list'

### 3. Import the Postman GPG Key

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 379CE192D401AB61

### 4. Update the Package List

sudo apt-get update

### 5. Install Postman

sudo apt-get install postman
