install:
	npm install

lint:
	npx eslint --fix .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8