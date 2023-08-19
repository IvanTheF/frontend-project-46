install:
	npm ci

help:
	node bin/gendiff -h

publish:
	npm publish --dry-run

lint:
	npx eslint .

gendiff:
	node bin/gendiff.js __fixtures__/file1.json __fixtures__/file2.json

test:
	npx jest

test-coverage:
	npm test -- --coverage --coverageProvider=v8
