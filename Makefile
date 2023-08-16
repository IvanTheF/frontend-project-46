install:
	npm ci

help:
	node bin/gendiff -h

publish:
	npm publish --dry-run

lint:
	npx eslint .

gendiff:
	node bin/gendiff.js files/file1.json files/file2.json

test:
	npx jest

test-coverage:
	npm test -- --coverage --coverageProvider=v8
