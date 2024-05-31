# OPC UA Server

Web aplication for managing OPC UA servers, with easy to use setup with docker-compose file.

## Description

This project is a web application designed for managing OPC UA servers, providing users with the capability to start and stop the service of the OPC UA Server. It enables users to interact with OPC UA servers conveniently through a user-friendly web interface. Additionally, the application leverages AAS (Asset Administration Shell) as a digital representation of physical assets, facilitating seamless integration and management of assets within the system.

## Getting Started

### Requirement

#### For Usage

* Docker

#### For Development

* Docker
* .NET 8 with ASP.NET Core 
* .NET 6 with ASP.NET Core (used for the OPC UA servers )
* Node
* React.js

### Installing

Before running the application locally make sure you have installed all requirements from the section before.

1. ``` git clone  <repository_url>```

### Executing program

To start up the application run the docker compose command to run the docker containers which are neccesary for the application, after the successfull start of all container access the ```localhost:5173``` for the UI

```bash
cd Infrastructure
docker compose up -d
```

## Authors

Contributors names and contact info

Peter Likavec  

