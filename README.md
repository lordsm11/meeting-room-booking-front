npm run-script build
docker build -t "lordsm11/front:1.0.5" .
docker run -p 3002:3000 lordsm11/front:1.0.1
docker push "lordsm11/front:1.0.1"
npm run-script build && docker build -t "lordsm11/front:1.0.20" . && docker push "lordsm11/front:1.0.20"