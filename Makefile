.PHONY: all clean lint server test

all: lint test server

clean:
	-rm -f package-lock.json
	-rm -r ./node_modules
	-npm cache verify

lint: node_modules/
	npx eslint --fix src/**/*.mjs

server: node_modules/
	npx http-server src/ -o

test: node_modules/
	npx mocha src/**/**.test.js


node_modules/: package.json
	npm install
	touch node_modules/
