docker login -u whale-repository@whale -p Whale123! registry.cn-shanghai.aliyuncs.com
#docker build -f docker/Dockerfile -t registry.cn-shanghai.aliyuncs.com/meetwhale/adam-server:$BUILD_ID .
#docker push registry.cn-shanghai.aliyuncs.com/meetwhale/adam-server:$BUILD_ID

docker build -f Dockerfile -t registry.cn-shanghai.aliyuncs.com/meetwhale/dragonfly:test --no-cache .
docker push registry.cn-shanghai.aliyuncs.com/meetwhale/dragonfly:test
