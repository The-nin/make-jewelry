echo "Building app..."
npm run build
echo "Deploy files to server..."
scp -r dist/* root@159.223.64.244:/var/www/html/
echo "Done!"