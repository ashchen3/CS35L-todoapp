To reset all changes to the ElephantSQL db and re-seed the db with the data in ./database/seeders, run

```
npx sequelize-cli db:migrate:undo:all
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

Remember to `npm install` all dependencies in the backend directory first. 