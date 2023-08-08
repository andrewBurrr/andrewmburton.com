echo "Switching to branch main"
git checkout main

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -r build/* coffeehouse:/var/www/andrewmburton.com/

echo "Done!"