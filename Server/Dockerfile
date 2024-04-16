# Stage 1: Build Stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS dotnet-build
WORKDIR /src
COPY ./ /src
RUN dotnet restore "ReactApp1.Server.csproj" 
RUN dotnet build "ReactApp1.Server.csproj" -c Release -o /app/build

# Stage 2: Publish Stage
FROM dotnet-build AS dotnet-publish
RUN dotnet publish "ReactApp1.Server.csproj" -c Release -o /app/publish

# Stage 3: Run Stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final

# Download and install packages 
RUN apt-get update && apt-get install -y procps net-tools
RUN apt-get update && apt-get install -y wget

# Download and install the Microsoft package repository configuration
RUN wget https://packages.microsoft.com/config/debian/12/packages-microsoft-prod.deb -O packages-microsoft-prod.deb \
    && dpkg -i packages-microsoft-prod.deb \
    && rm packages-microsoft-prod.deb
RUN apt-get update && apt-get install -y aspnetcore-runtime-6.0

WORKDIR /app
COPY --from=dotnet-publish /app/publish .
COPY --from=dotnet-build /src/Scripts ./Scripts

ENTRYPOINT [ "dotnet" , "ReactApp1.Server.dll" ]
