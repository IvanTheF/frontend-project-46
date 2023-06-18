install:
	npm ci
help:
	node bin/gendiff -h
publish:
	npm publish --dry-run
lint:
	npx eslint .
