cd build

cp ../{.gitignore} ./

cp ../deploy/* ./ -r

cp ../README.md ./

git init

git add -A

git commit -m "deploy"

git push -f git@github.com:Gammaalpha/remark-abbr.git main:prod

cd ..